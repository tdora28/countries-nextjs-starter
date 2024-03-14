import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Root() {
  return (
    <div className="d-flex flex-column justify-content-between" style={{ minHeight: '100vh' }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
