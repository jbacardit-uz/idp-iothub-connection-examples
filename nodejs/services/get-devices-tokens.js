const getToken = require('./get-user-token');
const deviceInfo = require('./device-info');

const devicesToken = {};


module.exports = async (email, password, clientid) => {
    const result = { data: null, error: null };
    try {
        const { data: getTokenData, error: getTokenError} = await getToken(email, password);
        if (getTokenError) {
            throw new Error(getTokenError);
        }
        const { token } = getTokenData;
        
        const { data: deviceInfoData, error: deviceInfoError } = await deviceInfo(clientid, token);
        if (deviceInfoError) {
            throw new Error(deviceInfoError);
        }
        deviceInfoData.forEach(device => {
            const { tag, token } = device;
            devicesToken[tag] = token;
        });
        result.data = devicesToken;

    } catch (error) {
        result.error = error;
    }
    return result;
}