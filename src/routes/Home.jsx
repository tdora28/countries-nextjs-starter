import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

const Home = () => {
  return (
    <Container style={{ minHeight: 'calc(100vh - 80px)' }} className="d-flex flex-column align-items-center justify-content-center gap-5">
      <h1 className="display-1 text-center">Countries of the World</h1>
      <Image src="../src/assets/images/galaxy-map.png" fluid />
    </Container>
  );
};

export default Home;
