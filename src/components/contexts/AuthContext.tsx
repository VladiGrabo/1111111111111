import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword as firebaseUpdatePassword,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'client' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
  isOnline: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const profileRef = doc(collection(db, 'profiles'), firebaseUser.uid);
          const profileDoc = await getDoc(profileRef);
          
          if (profileDoc.exists()) {
            const profileData = profileDoc.data();
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: profileData.name || '',
              phone: profileData.phone || '',
              role: profileData.role || 'client'
            });
          } else {
            // Create profile if it doesn't exist
            const defaultProfileData = {
              name: firebaseUser.displayName || '',
              email: firebaseUser.email || '',
              phone: '',
              role: 'client',
              createdAt: new Date().toISOString()
            };
            
            await setDoc(profileRef, defaultProfileData);
            setUser({
              id: firebaseUser.uid,
              ...defaultProfileData
            });
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
        if (!isOnline) {
          toast.error('Нет подключения к сети. Данные могут быть неактуальны');
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [isOnline]);

  const register = async (name: string, email: string, phone: string, password: string) => {
    if (!isOnline) {
      throw new Error('Для регистрации необходимо подключение к сети');
    }

    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      const profileData = {
        name,
        email,
        phone,
        role: 'client',
        createdAt: new Date().toISOString()
      };

      const profileRef = doc(collection(db, 'profiles'), firebaseUser.uid);
      await setDoc(profileRef, profileData);
      
      setUser({
        id: firebaseUser.uid,
        ...profileData
      });

      toast.success('Регистрация успешна!');
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Этот email уже используется');
      } else {
        throw new Error('Ошибка регистрации. Попробуйте позже');
      }
    }
  };

  const login = async (email: string, password: string) => {
    if (!isOnline) {
      throw new Error('Для входа необходимо подключение к сети');
    }

    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if user is admin
      const profileRef = doc(collection(db, 'profiles'), firebaseUser.uid);
      const profileDoc = await getDoc(profileRef);
      
      if (profileDoc.exists() && profileDoc.data().role === 'admin') {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          ...profileDoc.data()
        });
      }
      
      toast.success('Вход выполнен успешно!');
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        throw new Error('Неверный email или пароль');
      } else {
        throw new Error('Ошибка входа. Попробуйте позже');
      }
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) throw new Error('Not authenticated');
    if (!isOnline) throw new Error('Для обновления профиля необходимо подключение к сети');

    try {
      const profileRef = doc(collection(db, 'profiles'), user.id);
      await updateDoc(profileRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });

      setUser(prev => prev ? { ...prev, ...data } : null);
      toast.success('Профиль обновлен');
    } catch (error) {
      console.error('Update profile error:', error);
      throw new Error('Ошибка обновления профиля');
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    if (!isOnline) {
      throw new Error('Для изменения пароля необходимо подключение к сети');
    }

    const firebaseUser = auth.currentUser;
    if (!firebaseUser) throw new Error('Not authenticated');
    
    try {
      await firebaseUpdatePassword(firebaseUser, newPassword);
      toast.success('Пароль успешно изменен');
    } catch (error: any) {
      console.error('Update password error:', error);
      if (error.code === 'auth/requires-recent-login') {
        throw new Error('Необходимо повторно войти в систему');
      } else {
        throw new Error('Ошибка изменения пароля');
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('Выход выполнен успешно');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Ошибка при выходе');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      updatePassword,
      isAuthenticated: !!user,
      isOnline,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}