const axios = require('axios');

module.exports = async (email, password) => {
    const result = { data: null, error: null };
  try {
    const response = await axios.post(`https://dtwinplatformconnectiot.azurewebsites.net/login`, {
        email,
        password
    })
    const { data } = response;
    result.data = data;
  } catch (error) {
    result.error = error;
  }
  return result 
};