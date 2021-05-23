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

The first part of the configuration is the user authentication. Double click on the node ![alt text](https://github.com/JoBaAl/idp-iothub-connection-examples/blob/main/img/node-credentials.png) and insert your username, password and client id.

The credential will be inserted on the global variables on node-red start. Yo can insert it manually by triggering ![alt text](https://github.com/JoBaAl/idp-iothub-connection-examples/blob/main/img/node-on-start.png).

## Get user token

Once you have inserted your credentials, you must authenticate and get your token. The *user authentication* example makes the following request with the credentials provided:

```zsh
curl -X 'POST' \
  'https://dtwinplatformconnectiot.azurewebsites.net/login' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "bacardit.josep@gmail.com",
  "password": "#jhub_2021$IoT"
}'
```



