import axios from 'axios';

const countriesAPI = 'https://restcountries.com/v3.1/all';

const getAll = async () => {
  const response = await axios.get(countriesAPI);
  return response.data;
};

// https://restcountries.com/#endpoints-all

export default { getAll };
