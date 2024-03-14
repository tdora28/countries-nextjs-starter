import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import galaxyMap from '../assets/galaxy-map.png';

const Home = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center gap-5">
      <h1 className="display-1 text-center">Countries of the World</h1>
      <Image src={galaxyMap} style={{ maxWidth: '1000px', width: '100%' }} />
    </Container>
  );
};

export default Home;
