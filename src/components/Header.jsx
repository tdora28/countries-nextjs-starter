import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth, db, logout } from '../auth/firebase';

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
        <Link to="/countries">
          <Button variant="contained">Countries</Button>
        </Link>
        <Link to="/favourites">
          <Button variant="contained">{name}'s Favourites</Button>
        </Link>
        <Button onClick={logout}>Logout</Button>
      </>
    );
  };

  const linksIfLoggedOut = () => {
    return (
      <>
        <Link to="/register">
          <Button variant="contained">Register</Button>
        </Link>
        <Link to="/login">
          <Button variant="contained">Login</Button>
        </Link>
      </>
    );
  };

  return (
    <Container fluid>
      <Row>
        <Navbar bg="light" variant="light">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Link to="/">
                  <Button variant="contained">Home</Button>
                </Link>
                {user ? linksIfLoggedIn() : linksIfLoggedOut()}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
      {/* {name ? `Welcome, ${name}` : 'Welcome, Guest'} */}
    </Container>
  );
};

export default Header;
