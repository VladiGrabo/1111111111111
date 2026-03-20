import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

async function setAdminRole(userId: string) {
  try {
    const profileRef = doc(db, 'profiles', userId);
    await updateDoc(profileRef, {
      role: 'admin',
      updatedAt: new Date().toISOString()
    });
    console.log('Successfully set admin role');
  } catch (error) {
    console.error('Error setting admin role:', error);
  }
}

// Замените YOUR_USER_ID на ваш реальный user_id
setAdminRole('YOUR_USER_ID');