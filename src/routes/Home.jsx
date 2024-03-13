import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

const Home = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center gap-5" style={{ minHeight: 'calc(100vh - 70px)' }}>
      <h1 className="display-1 text-center">Countries of the World</h1>
      <Image src="../src/assets/images/galaxy-map.png" style={{ maxWidth: '1000px', width: '100%' }} />
    </Container>
  );
};

export default Home;
