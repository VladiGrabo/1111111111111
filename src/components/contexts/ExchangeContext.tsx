import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  getDocs,
  Firestore
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface ExchangeContextType {
  maxLimit: number;
  reservations: ExchangeReservation[];
  addReservation: (reservation: Omit<ExchangeReservation, 'id' | 'createdAt'>) => Promise<void>;
  updateReservation: (id: string, reservation: Partial<ExchangeReservation>) => Promise<void>;
  deleteReservation: (id: string) => Promise<void>;
}

const ExchangeContext = createContext<ExchangeContextType | null>(null);

const INITIAL_MAX_LIMIT = 780000;

export function ExchangeProvider({ children }: { children: React.ReactNode }) {
  const { user, isOnline } = useAuth();
  const [maxLimit, setMaxLimit] = useState<number>(INITIAL_MAX_LIMIT);
  const [reservations, setReservations] = useState<ExchangeReservation[]>([]);
  const [allReservations, setAllReservations] = useState<ExchangeReservation[]>([]);

  useEffect(() => {
    if (!user) {
      setReservations([]);
      setAllReservations([]);
      return;
    }

    const reservationsRef = collection(db, 'exchange_reservations');
    let q;

    if (user.role === 'admin') {
      q = query(reservationsRef, orderBy('createdAt', 'desc'));
    } else {
      q = query(
        reservationsRef,
        where('userId', '==', user.id),
        orderBy('createdAt', 'desc')
      );
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newReservations = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ExchangeReservation[];

        if (user.role === 'admin') {
          setAllReservations(newReservations);
          const totalReserved = newReservations
            .filter(res => res.status === 'pending')
            .reduce((sum, res) => sum + res.fromAmount, 0);
          setMaxLimit(INITIAL_MAX_LIMIT - totalReserved);
        }
        
        setReservations(newReservations);
      },
      (error) => {
        console.error('Error fetching reservations:', error);
        if (!isOnline) {
          toast.error('Нет подключения к сети. Данные могут быть неактуальны');
        }
      }
    );

    return () => unsubscribe();
  }, [user, isOnline]);

  const addReservation = async (newReservation: Omit<ExchangeReservation, 'id' | 'createdAt'>) => {
    if (!user) throw new Error('Not authenticated');
    if (!isOnline) throw new Error('Нет подключения к сети');

    if (newReservation.fromAmount > maxLimit) {
      throw new Error(`Максимальная доступная сумма: ${maxLimit} USDT`);
    }

    try {
      const reservationData = {
        ...newReservation,
        userId: user.id,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'exchange_reservations'), reservationData);
      toast.success('Бронирование успешно создано');
    } catch (error) {
      console.error('Error adding reservation:', error);
      throw new Error('Ошибка при создании бронирования');
    }
  };

  const updateReservation = async (id: string, updates: Partial<ExchangeReservation>) => {
    if (!user) throw new Error('Not authenticated');
    if (!isOnline) throw new Error('Нет подключения к сети');

    try {
      const reservationRef = doc(db, 'exchange_reservations', id);
      await updateDoc(reservationRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      toast.success('Бронирование обновлено');
    } catch (error) {
      console.error('Error updating reservation:', error);
      throw new Error('Ошибка при обновлении бронирования');
    }
  };

  const deleteReservation = async (id: string) => {
    if (!user) throw new Error('Not authenticated');
    if (!isOnline) throw new Error('Нет подключения к сети');

    try {
      const reservationRef = doc(db, 'exchange_reservations', id);
      await deleteDoc(reservationRef);
      toast.success('Бронирование удалено');
    } catch (error) {
      console.error('Error deleting reservation:', error);
      throw new Error('Ошибка при удалении бронирования');
    }
  };

  return (
    <ExchangeContext.Provider value={{
      maxLimit,
      reservations,
      addReservation,
      updateReservation,
      deleteReservation
    }}>
      {children}
    </ExchangeContext.Provider>
  );
}

export function useExchange() {
  const context = useContext(ExchangeContext);
  if (!context) {
    throw new Error('useExchange must be used within an ExchangeProvider');
  }
  return context;
}