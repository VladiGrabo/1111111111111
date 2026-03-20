import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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
const auth = getAuth(app);

async function updateRole() {
  try {
    // Sign in as admin
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      'admin@grabowski.finance', 
      'Admin123!'
    );

    const user = userCredential.user;
    if (!user) {
      throw new Error('Failed to get user');
    }

    // Update profile
    const profileRef = doc(db, 'profiles', user.uid);
    const profileSnap = await getDoc(profileRef);
    
    if (!profileSnap.exists()) {
      // Create new admin profile
      await setDoc(profileRef, {
        user_id: user.uid,
        name: 'Admin User',
        email: user.email,
        phone: '',
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

    // Verify update
    const updatedSnap = await getDoc(profileRef);
    if (updatedSnap.exists() && updatedSnap.data().role === 'admin') {
      console.log('Successfully verified admin role update');
      console.log('\nAdmin credentials:');
      console.log('Email: admin@grabowski.finance');
      console.log('Password: Admin123!');
      process.exit(0);
    } else {
      throw new Error('Failed to verify admin role update');
    }

  } catch (error) {
    console.error('Error updating role:', error);
    process.exit(1);
  }
}

updateRole();