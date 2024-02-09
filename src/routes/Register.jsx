import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from '../auth/firebase';
import { Button } from 'react-bootstrap';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  // useAuthState is a hook that allows you to listen to the authentication state of the user
  // It returns an array with three elements:
  // - user is the user object
  // - loading is a boolean that indicates if the user is being loaded
  // - error is the error object
  const [user, loading, error] = useAuthState(auth);
  // Navigate is a hook that allows you to navigate to a different location
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert('Please enter your name');
    registerWithEmailAndPassword(name, email, password);
  };

  // This hook is used to redirect the user to the countries page if they are already logged in
  useEffect(() => {
    if (loading) return;
    if (user) console.log('user is logged in! ', user);
    if (user) navigate('/countries');
  }, [user, loading]);

  return (
    <div>
      <h1>Register</h1>

      <input type="text" value={name} placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
      <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <Button onClick={register}>Register</Button>
    </div>
  );
};

export default Register;
