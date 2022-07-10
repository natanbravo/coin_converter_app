// https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br/json/',
});

export default api;
