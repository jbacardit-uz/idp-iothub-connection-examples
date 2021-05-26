---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-event-hubs
urlFragment: event-hubs-javascript
---

# Azure Event Hubs client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Event Hubs in some common scenarios.

| **File Name**                                                             | **Description**                                                                                                                                                                         |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [receiveEvents.js][receiveevents]                                         | demonstrates how to use the EventHubConsumerClient to process events from all partitions of a consumer group in an Event Hubs instance.                                                 |
| [generateToken.js][generatetoken]                                         | demonstrates how to use the token generation without azure sdk                                                                                                                          |

**Note**: `EventHubConsumerClient` supports checkpointing using the `@azure/eventhubs-checkpointstore-blob` and `@azure/storage-blob` packages. For an example that demonstrates how to use this functionality, see the [receiveEventsUsingCheckpointStore][checkpointing] sample in the `@azure/eventhubs-checkpointstore-blob` repository.

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

You need [an Azure subscription][freesub] and [an Azure Event Hub resource][azhubacct] to run these sample programs. The IOT Hub sample additionally requires an [IOT Hub resource][aziothub]. Samples retrieve credentials to access the event hub from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser requires some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `.envsample`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `.envsample` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node receiveEvents.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[receiveevents]: https://github.com/JoBaAl/idp-iot-hub/blob/main/example/receiveEvents.js
[generatetoken]: https://github.com/JoBaAl/idp-iot-hub/blob/main/example/generateToken.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/event-hubs
[checkpointing]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/eventhubs-checkpointstore-blob/samples/javascript/receiveEventsUsingCheckpointStore.js
[azhubacct]: https://docs.microsoft.com/azure/event-hubs/event-hubs-node-get-started-send
[aziothub]: https://docs.microsoft.com/azure/iot-hub/iot-hub-node-node-module-twin-getstarted
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html