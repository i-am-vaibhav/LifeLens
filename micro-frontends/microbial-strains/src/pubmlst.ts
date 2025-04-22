import axios from 'axios';

const pubmlst = axios.create({
  baseURL: '/api',  // relative to CRA proxy
  timeout: 10000
});

export default pubmlst;
