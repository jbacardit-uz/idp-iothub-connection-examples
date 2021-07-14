//https://docs.microsoft.com/en-us/javascript/api/overview/azure/event-hubs-readme?view=azure-node-latest#consume-events-from-an-event-hub

const { EventHubConsumerClient, earliestEventPosition } = require("@azure/event-hubs");

async function main() {

  require("dotenv").config();

  const connectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";
  const eventHubName = process.env["EVENTHUB_NAME"] || "";
  const consumerGroup = process.env["CONSUMER_GROUP_NAME"] || "";

  const client = new EventHubConsumerClient(
    consumerGroup,
    connectionString,
    eventHubName
  );
  const partitionIds = await client.getPartitionIds();

  // In this sample, we use the position of earliest available event to start from
  // Other common options to configure would be `maxBatchSize` and `maxWaitTimeInSeconds`
  const subscriptionOptions = {
    startPosition: earliestEventPosition
  };

  const subscription = client.subscribe(
    partitionIds[0],
    {
      processEvents: async (events, context) => {
        for (const event of events) {
            console.log(
              `Received event: '${JSON.stringify(event.body)}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`
            );
          }
      },
      processError: async (err, context) => {
        // error reporting/handling code here
      }
    },
    subscriptionOptions
  );

  // Wait for a few seconds to receive events before closing
  setTimeout(async () => {
    await subscription.close();
    await client.close();
    console.log(`Exiting sample`);
  }, 600 * 1000);
}

main();