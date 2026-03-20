import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

// Initialize Auth with persistence
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch(console.error);

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };