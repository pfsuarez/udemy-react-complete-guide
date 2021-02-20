import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-my-buger-eqs-default-rtdb.firebaseio.com/'
});

export default instance;