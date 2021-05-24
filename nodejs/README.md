# idp iothub nodejs connection example

This example shows how to connect to the idp iot using nodejs.

For the MQTT connections. The example uses the [following](https://github.com/mqttjs/MQTT.js#readme) package.

Go to the *nodejs* and run the folowing command to install the packages.

```zsh
npm install
```

For the MQTT client connection we are setting the following properties:

```js
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
```

Each device connection has his own token. Once we have the token, we must update the client connection options before initialize the connection.

```js
options.password = data[deviceId];
const client = mqtt.connect('mqtts://idpiot-iothub.azure-devices.net:8883', options)
```

the user name for the MQTT conncetion is always as follows:

```
idpiot-iothub.azure-devices.net/${deviceId}/api-version=2018-06-30
```

## Set credentials

Rename the *.envsample* to *.env*.

Change the environment variables with your username, password, client id and device id.

```
# Credential
USER_NAME=
PASSWORD=

#Your client id and the device id
#that you want to connect.
CLIENTID=
DEVICEID=
```

## Get user token

First, you must authenticate and get your user token. The */interface/get-user-token.js* example emulates the following request with the provided credentials:

```zsh
curl -X 'POST' \
  'https://dtwinplatformconnectiot.azurewebsites.net/login' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "${your-email}",
  "password": "${your-password}"
}'
```

```js
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
```

This example returns a json object as follows:

```json
{
  "data": {
    "token": "your-token"
  },
  "error": null
}
```

## Get devices info

To get the information to connect to each one of your devices you need to make the following request

```zsh
curl -X 'GET' \
  'https://dtwinplatformconnectiot.azurewebsites.net/api/v1/devices?clientid=${your-clientID}' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer ${your-token}'
```

The */interface/get-device-info.js* makes this request in nodejs for you:

```js
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
    return result 
};
```

This example returns a json object as follows:

```json
{
  "data": [
    {
      "id": 1,
      "name": "device name",
      "tag": "deviceId",
      "code": null,
      "bimId": null,
      "sourceHub": "source-hub.url.net",
      "sourceHubKey": "device-key",
      "token": "device-token",
      "registeredDate": "2021-05-06T13:45:50.817867"
    },
    {
      "id": 2,
      "name": "device name",
      "tag": "deviceId",
      "code": null,
      "bimId": null,
      "sourceHub": "source-hub.url.net",
      "sourceHubKey": "device-key",
      "token": "device-token",
      "registeredDate": "2021-05-06T13:56:55.623866"
    }
  ],
  "error": null
}
```
## Send data





## Receive data

![alt text](https://github.com/JoBaAl/idp-iothub-connection-examples/blob/main/img/receive-data.png).

You just need to set the *connectionString* on the *receiver* node to receive data from the iot hub. 





