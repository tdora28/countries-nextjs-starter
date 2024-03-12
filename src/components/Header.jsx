import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth, db, logout } from '../auth/firebase';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Flag } from '@mui/icons-material';

const Header = () => {
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

  const linksIfLoggedIn = () => {
    return (
      <>
        <Link to="/countries" className="m-2">
          <Button variant="contained">Countries</Button>
        </Link>

        <Link to="/favourites" className="m-2 ">
          <Button variant="contained">{name}'s Favourites</Button>
        </Link>

        <Button variant="primary" onClick={logout} className="m-2 ">
          Logout
        </Button>
      </>
    );
  };

  const linksIfLoggedOut = () => {
    return (
      <>
        <Link to="/register" className="m-2">
          <Button>Register</Button>
        </Link>
        <Link to="/login" className="m-2">
          <Button variant="secondary">Login</Button>
        </Link>
      </>
    );
  };

  return (
    <Navbar expand="lg" bg="light">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <Button variant="dark">
              <Flag sx={{ color: 'white' }} fontSize="medium" />
            </Button>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto justify-content-end" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">{user ? linksIfLoggedIn() : linksIfLoggedOut()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
