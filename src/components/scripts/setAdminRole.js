import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function setAdminRole(userId) {
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

// Replace with your user ID
const userId = 'YOUR_USER_ID';
setAdminRole(userId);