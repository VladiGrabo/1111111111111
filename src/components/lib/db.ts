import { collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

// Initialize collections
const reservationsCollection = collection(db, 'exchange_reservations');
const profilesCollection = collection(db, 'profiles');
const financialPlansCollection = collection(db, 'financial_plans');

export async function createReservation(data: {
  userId: string;
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  rate: number;
  date: string;
  status: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  bankName: string;
}) {
  try {
    const docRef = await addDoc(reservationsCollection, {
      ...data,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
}

export async function getReservationsByUserId(userId: string) {
  try {
    const q = query(
      reservationsCollection,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting reservations:', error);
    throw error;
  }
}

export async function updateReservation(id: string, userId: string, data: Partial<{
  fromAmount: number;
  toAmount: number;
  rate: number;
  date: string;
  status: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  bankName: string;
}>) {
  try {
    const reservationRef = doc(reservationsCollection, id);
    await updateDoc(reservationRef, {
      ...data,
      userId,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating reservation:', error);
    throw error;
  }
}

export async function deleteReservation(id: string, userId: string) {
  try {
    const reservationRef = doc(reservationsCollection, id);
    await deleteDoc(reservationRef);
  } catch (error) {
    console.error('Error deleting reservation:', error);
    throw error;
  }
}

export default {
  createReservation,
  getReservationsByUserId,
  updateReservation,
  deleteReservation
};