# idp iothub nodejs connection example

This example shows how to connect to the idp iot using nodejs. 

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

Run the folowing command to install the packages.

```zsh
npm install
```

## Get user token

![alt text](https://github.com/JoBaAl/idp-iothub-connection-examples/blob/main/img/user-authentication.png).

Once you have inserted your credentials, you must authenticate and get your token. The *user authentication* example makes the following request with the provided credentials:

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

This example stores the response token in the global variables as you can see in the *Set token* node. To test it trigger the *inject* node.

## Get user token

![alt text](https://github.com/JoBaAl/idp-iothub-connection-examples/blob/main/img/device-info.png).

To get the information to connect to each one of your devices you need to make the following request

```zsh
curl -X 'GET' \
  'https://dtwinplatformconnectiot.azurewebsites.net/api/v1/devices?clientid=${your-clientID}' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer ${your-token}'
```

The provided example makes this request in node-red for you and stores the result in the global variables. To test it trigger the *inject* node.


## Send data

![alt text](https://github.com/JoBaAl/idp-iothub-connection-examples/blob/main/img/send-data.png).

In this example, you can see how to send data to the iot hub as is shown in the function node with the following javascript lines. Set the *Hostname: idpiot-iothub.azure-devices.net* in the *Azure IoT Hub* node 

```js
const devicesToken = global.get('devicesToken');
const deviceId = '11TEM01_00';

const data = {
    timestamp: new Date(),
    deviceId,
    value: 24.5
}

msg.payload.timestamp = new Date();
msg.payload = {
    deviceId,
    'key': devicesToken[deviceId],
    'protocol':'mqtt',
    data
}

return msg;
```

## Receive data

![alt text](https://github.com/JoBaAl/idp-iothub-connection-examples/blob/main/img/receive-data.png).

You just need to set the *connectionString* on the *receiver* node to receive data from the iot hub. 





