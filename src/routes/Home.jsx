import { useAuthState } from 'react-firebase-hooks/auth';
import { getNameOfUser } from '../auth/firebase';
import { auth, db } from '../auth/firebase';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Home = () => {
  const [user] = useAuthState(auth);

  const [name, setName] = useState();

  useEffect(() => {
    const getUserData = async () => {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const name = doc.data().name;
        setName(name);
      });
    };

    if (user) {
      getUserData();
    }
  }, [user]);

  return (
    <div>
      <h1>Home</h1>
      <h2>{user ? `Welcome, ${name}` : 'Welcome, Guest'}</h2>
    </div>
  );
};

export default Home;
