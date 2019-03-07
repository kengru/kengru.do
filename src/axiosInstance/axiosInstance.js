import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kengru-do.firebaseio.com'
});

export default instance;