# idp iothub node-red connection example

This example shows how to connect to the idp iot using node-red. 

## Install iothub node-red nodes

First of all, we need to install the necessary node-red nodes to connect to the iot hub.

Go to the node-red menu on the top right corner and click on *Manage palette*

![alt text](https://github.com/JoBaAl/idp-iothub-connection-examples/blob/main/img/img-manage-palette.png)

On the new menu, click on the *install* tab and type *node-red-contrib-azure-iot-hub*. Finally, click *install* and the new node will be installed automatically.

![alt text](https://github.com/JoBaAl/idp-iothub-connection-examples/blob/main/img/install-node-red-iothub-node.png)

Once the installation is finished type *iot* on the top left corner and you will see the installed nodes.

![alt text](https://github.com/JoBaAl/idp-iothub-connection-examples/blob/main/img/iothub-nodes.png)

## Import example configutation

Go to the node-red menu on the top right corner and click on *Import*

![alt text](https://github.com/JoBaAl/idp-iothub-connection-examples/blob/main/img/import-node-red-configuration.png)

Copy and paste the [following](https://github.com/JoBaAl/idp-iothub-connection-examples/blob/main/node-red/example.json) json and click on *import*.

## User authentication

![alt text](https://github.com/JoBaAl/idp-iothub-connection-examples/blob/main/img/set-credentials.png)

The first part of the configuration is *user authentication*. Double click on the node *Set you credentials and client ID* and insert your username, password and client id.

The credential will be inserted on the global variables on node-red start. You can insert it manually by triggering *on Start*.

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

In this example you can see how to send data to the iot hub as is shown in the function node with the following javascript lines.

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



