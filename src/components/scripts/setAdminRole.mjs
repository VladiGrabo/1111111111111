import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAifaq8_zRn90yE1dYGoxwZBc6J1Cinfo4",
  authDomain: "vladislavsite-2d703.firebaseapp.com",
  projectId: "vladislavsite-2d703",
  storageBucket: "vladislavsite-2d703.appspot.com",
  messagingSenderId: "811317332757",
  appId: "1:811317332757:web:a448dcc20f47860f83371c",
  measurementId: "G-JS4XGEWD24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function setAdminRole(userId) {
  if (!userId) {
    console.error('Please provide a user ID');
    process.exit(1);
  }

  try {
    const profileRef = doc(db, 'profiles', userId);
    await updateDoc(profileRef, {
      role: 'admin',
      updatedAt: new Date().toISOString()
    });
    console.log('Successfully set admin role for user:', userId);
    process.exit(0);
  } catch (error) {
    console.error('Error setting admin role:', error);
    process.exit(1);
  }
}

// Get user ID from command line argument
const userId = 'KsusQqDHIOfN4PNxEfY27mhR2Y33';
setAdminRole(userId);