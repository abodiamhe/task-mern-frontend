import axios from 'axios';

const API_URL = 'https://taskmernbackend-aboby3n7.b4a.run/api/users';

//Sending API call to register a new user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    //Saving user data to localStorage
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//API call to login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//Removing current user from local storage when user logout
const logout = () => localStorage.removeItem('user');

const authService = { register, login, logout };
export default authService;
