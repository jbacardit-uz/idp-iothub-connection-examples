const axios = require('axios');

module.exports = async (clientid, token) => {
    const result = { data: null, error: null };
    const headers = { Authorization: `Bearer ${token}` };
    try {
        const response = await axios.get(`https://dtwinplatformconnectiot.azurewebsites.net/api/v1/devices?clientid=${clientid}`, { headers })
        const { data } = response;
        result.data = data;
    } catch (error) {
        result.error = error;
    }
    console.log(result);
    return result 
};