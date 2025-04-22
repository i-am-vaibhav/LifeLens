import axios from 'axios';
require('./setupProxy.js');

const pubmlst = axios.create({
  baseURL: '/api',    // relative to CRA proxy
  timeout: 10000,  // optional: fail slow requests
});

export default pubmlst;
