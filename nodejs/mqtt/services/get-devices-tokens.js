const getToken = require('../interface/get-user-token');
const getDeviceInfo = require('../interface/get-device-info');

const devicesToken = {};


module.exports = async (email, password, clientid) => {
    const result = { data: null, error: null };
    try {
        const { data: getTokenData, error: getTokenError} = await getToken(email, password);
        if (getTokenError) {
            throw new Error(`ERROR get token ${getTokenError}`);
        }
        const { token } = getTokenData;
        
        const { data: deviceInfoData, error: deviceInfoError } = await getDeviceInfo(clientid, token);
        if (deviceInfoError) {
            throw new Error( `ERROR device info ${deviceInfoError}`);
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