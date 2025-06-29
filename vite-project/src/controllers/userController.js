import axios from "axios";

export const getName = async (email) => {
  return axios.get(`http://localhost:5000/get-name?email=${email}`);
};