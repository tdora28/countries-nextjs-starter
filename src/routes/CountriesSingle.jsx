import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

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
        <Spinner animation="border" role="status" className="center" variant="info"></Spinner>
        <span className="visually-hidden">Loading...</span>
      </Col>
    );
  }

  return (
    <Container>
      <Row>
        <Stack direction="horizontal" gap={4}>
          <Image src={country.flags.svg} style={{ width: '80px' }} />
          <h2 className="display-1">{country.name.common}</h2>
        </Stack>

        <Image thumbnail src={`https://source.unsplash.com/featured/1600x900?${country.capital}`} fluid />

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

        {!error && weather && (
          <Card>
            <Card.Body>
              <Container>
                <Row>
                  <Col xs={9}>
                    <p className="display-6">{country.capital}</p>
                    <p>
                      <strong>{Math.round(weather.main.temp)}°C</strong> &ndash; {weather.weather[0].description}
                    </p>
                  </Col>
                  <Col xs={3} className="d-flex justify-content-end">
                    <Image src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} fluid />
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        )}
      </Row>
      <Row>
        <Col>
          <Button variant="light" onClick={() => navigate('/countries')}>
            Back to Countries
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
