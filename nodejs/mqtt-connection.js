require("dotenv").config();
const mqtt = require('mqtt')
const getDevicesTokens = require('./get-devices-tokens');

const email = process.env["USER_NAME"] || "";
const password = process.env["PASSWORD"] || "";
const clientId = process.env["CLIENTID"] || "";
const deviceId = process.env["DEVICEID"] || "";

const deviceUserName = `idpiot-iothub.azure-devices.net/${deviceId}/api-version=2018-06-30`
const topicPublish = `devices/${deviceId}/messages/events/`;
const topicReceive = `devices/${deviceId}/messages/devicebound/#`

const options = {
  keepalive: 10,
  clientId: deviceId,
  protocolId: 'MQTT',
  clean: false,
  protocolVersion: 4,
  reconnectPeriod: 20000,
  connectTimeout: 30 * 1000,
  username: deviceUserName,
  rejectUnauthorized: false,
};

(async () => {
    const { data, error } = await getDevicesTokens(email, password, clientId);
    console.log('DEVICES TOKENS: ', data);

    options.password = data[deviceId];
    const client = mqtt.connect('mqtts://idpiot-iothub.azure-devices.net:8883', options)

    client.subscribe(topicReceive)

    client.on('message', function (topic, message) {
      console.log('MESSAGE: ', message)
    });

    client.on('connect', function () {
      console.log('CLIENT CONNECTED')
    });

    client.publish(topicPublish, 'Current time is: ' + new Date());
})();
