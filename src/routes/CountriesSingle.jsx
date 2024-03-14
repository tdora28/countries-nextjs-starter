import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CountryMap from '../components/CountryMap';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state.country;

  const [weather, setWeather] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`)
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
      });
  }, [country.capital]);

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner animation="border" as="output" className="center" variant="info"></Spinner>
        <span className="visually-hidden">Loading...</span>
      </Col>
    );
  }

  return (
    <Container className="d-flex flex-column gap-5 my-5">
      {/* Page title with a flag */}
      <Row>
        <Stack direction="horizontal" gap={4}>
          <Image src={country.flags.svg} style={{ width: '80px' }} />
          <h2 className="display-1">{country.name.common}</h2>
        </Stack>
      </Row>

      <Row xs={1} sm={1} md={2}>
        {/* Random image from the capital city */}
        <Col className="d-flex align-items-stretch">
          <Image style={{ objectFit: 'cover', objectPosition: 'center' }} thumbnail src={`https://source.unsplash.com/featured/1600x900?${country.capital}`} fluid />
        </Col>
        {/* Weather data */}
        <Col className="d-flex flex-column gap-3 justify-content-between">
          {!error && weather && (
            <Card>
              <Card.Body>
                <Container>
                  <Row>
                    <Col>
                      <p className="display-6">{country.capital}</p>
                      <p>
                        <strong>{Math.round(weather.main.temp)}°C</strong> &ndash; {weather.weather[0].description}
                      </p>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <Image src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} fluid />
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          )}
          {/* Some facts about the country */}
          <ListGroup>
            <ListGroup.Item>Capital: {country.capital} </ListGroup.Item>
            <ListGroup.Item>Languages: {Object.values(country.languages ?? {}).join(', ')}</ListGroup.Item>
            <ListGroup.Item>
              Currencies:{' '}
              {Object.values(country.currencies || {})
                .map((currency) => currency.name)
                .join(', ')}
            </ListGroup.Item>
            <ListGroup.Item>Population: {country.population.toLocaleString()}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      {/* Google Maps using latitude and longitude */}
      <Row className="d-block mx-auto" style={{ width: '100%', maxWidth: '800px' }}>
        <CountryMap latitude={country.latlng[0]} longitude={country.latlng[1]} />
      </Row>

      {/* Navigation */}
      <Row>
        <Col className="d-flex justify-content-center">
          <ButtonGroup>
            <Button variant="outline-primary" onClick={() => navigate('/countries')}>
              Back to Countries
            </Button>
            <Button variant="outline-primary" onClick={() => navigate('/favourites')}>
              Back to Favourites
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
