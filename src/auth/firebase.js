import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { getFavourites } from '../store/favouritesSlice';

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

// Here we get access to the project authentication
const auth = getAuth(app);
// Here we get access to the project database
const db = getFirestore(app);

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
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
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

export const logout = () => {
  auth.signOut();
  location.reload();
};

export const getNameOfUser = async (user) => {
  if (user) {
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const name = doc.data().name;
      return name;
    });
  } else {
    return null;
  }
};

export const addFavouriteToFirebase = async (uid, name) => {
  try {
    await addDoc(collection(db, `users/${uid}/favourites`), { name });
  } catch (err) {
    console.error('Error adding favourite to Firebase database: ', err);
  }
};

export const removeFavouriteFromFirebase = async (uid, name) => {
  try {
    if (!name) {
      console.error('Error removing favourite from Firebase database: name parameter is undefined');
      return;
    }
    const q = query(collection(db, `users/${uid}/favourites`), where('name', '==', name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  } catch (err) {
    console.error('Error removing favourite from Firebase database: ', err);
  }
};

export const clearFavouritesFromFirebase = async (uid) => {
  try {
    const q = query(collection(db, `users/${uid}/favourites`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  } catch (err) {
    console.error('Error removing favourites from Firebase database: ', err);
  }
};

export const getFavouritesFromSource = () => async (dispatch) => {
  const user = auth.currentUser;
  if (user) {
    const q = await getDocs(collection(db, `users/${user.uid}/favourites`));
    const favourites = q.docs.map((doc) => doc.data().name);
    dispatch(getFavourites(favourites));
  }
};

export { auth, db, registerWithEmailAndPassword };
