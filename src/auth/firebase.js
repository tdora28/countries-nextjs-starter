import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: 'countries-react-4a5a8.firebaseapp.com',
  projectId: 'countries-react-4a5a8',
  storageBucket: 'countries-react-4a5a8.appspot.com',
  messagingSenderId: '809167266025',
  appId: '1:809167266025:web:c2f168cf23cb4c40c85078',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Here we get access to the authentication methods
// Auth is a service that allows you to authenticate users using Firebase
const auth = getAuth(app);

// Here we get access to the firestore methods
// Firestore is a NoSQL database to store and sync data for client and server-side development
const db = getFirestore(app);

// Registers a user with an email and password
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    // Gives the user the ability to register with an email and password
    const res = await createUserWithEmailAndPassword(auth, email, password);
    // The newly created user. It's still not saved in the database and empty
    const user = res.user;
    // Adds the user to the database
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    // Gives the user the ability to login with an email and password
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

export const logout = () => {
  signOut(auth);
  console.log('logging out');
};

export { registerWithEmailAndPassword, auth, db };
