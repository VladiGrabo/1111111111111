import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc, collection, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAifaq8_zRn90yE1dYGoxwZBc6J1Cinfo4",
  authDomain: "vladislavsite-2d703.firebaseapp.com",
  projectId: "vladislavsite-2d703",
  storageBucket: "vladislavsite-2d703.appspot.com",
  messagingSenderId: "811317332757",
  appId: "1:811317332757:web:a448dcc20f47860f83371c",
  measurementId: "G-JS4XGEWD24"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userId = 'KsusQqDHIOfN4PNxEfY27mhR2Y33';

async function updateUserToAdmin() {
  try {
    // Get user's profile document
    const profileRef = doc(db, 'profiles', userId);
    const profileSnap = await getDoc(profileRef);
    
    if (!profileSnap.exists()) {
      // Create profile if it doesn't exist
      await setDoc(profileRef, {
        user_id: userId,
        name: 'Admin User',
        role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      console.log('Created new admin profile');
    } else {
      // Update existing profile
      await updateDoc(profileRef, {
        role: 'admin',
        updated_at: new Date().toISOString()
      });
      console.log('Updated existing profile to admin');
    }

    // Verify the update
    const updatedSnap = await getDoc(profileRef);
    if (updatedSnap.exists() && updatedSnap.data().role === 'admin') {
      console.log('Successfully verified admin role update');
    } else {
      console.error('Failed to verify admin role update');
    }

  } catch (error) {
    console.error('Error updating user to admin:', error);
  }
}

updateUserToAdmin();