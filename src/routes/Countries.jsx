import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFavouritesFromSource } from '../auth/firebase';
import { initializeCountries } from '../store/countriesSlice';
import { addFavourite, removeFavourite } from '../store/favouritesSlice';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Countries = () => {
  const dispatch = useDispatch();

  const countriesList = useSelector((state) => state.countries.countries);
  const favourites = useSelector((state) => state.favourites.favourites);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  useEffect(() => {}, [search]);

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner animation="border" role="status" className="center" variant="info">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Form.Control className="mx-auto mb-5" style={{ width: '20rem' }} type="search" placeholder="Search for countries..." aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
      </Row>
      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {countriesList
          .filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))
          .map((country) => (
            <Col className="mt-5" key={country.name.common}>
              <Card className="h-100" border="info" bg="ligth" text="dark">
                <Card.Header style={{ backgroundColor: '#0dcaf0', color: 'white' }}>
                  {favourites.some((favourite) => favourite === country.name?.common) ? (
                    <FavoriteIcon style={{ display: 'block', marginLeft: 'auto', color: 'white' }} onClick={() => dispatch(removeFavourite(country.name.common))} />
                  ) : (
                    <FavoriteBorderIcon style={{ display: 'block', marginLeft: 'auto' }} onClick={() => dispatch(addFavourite(country.name.common))} />
                  )}
                </Card.Header>

                <Card.Img
                  variant="top"
                  src={country.flags.svg}
                  style={{
                    objectFit: 'cover',
                    minHeight: '200px',
                    maxHeight: '200px',
                  }}
                />

                <Card.Body className="d-flex flex-column">
                  <Card.Title>{country.name.common}</Card.Title>
                  <Card.Subtitle className="mb-5 text-muted">{country.name.official}</Card.Subtitle>
                  <ListGroup variant="flush" className="flex-grow-1 justify-content-end">
                    <ListGroup.Item>
                      <i className="bi bi-translate me-2"></i>
                      {Object.values(country.languages ?? {}).join(', ')}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-cash-coin me-2"></i>
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(', ')}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-people me-2"></i>
                      {country.population.toLocaleString()}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>

                <Link to={`/countries/${country.name.common}`} state={{ country: country }}>
                  <Button className="w-100" variant="info">
                    Read More
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Countries;
