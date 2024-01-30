import type { ActionFunction } from "@remix-run/node";
import React from "react";
import { authenticate } from "~/shopify.server";

type Props = {};

export const action: ActionFunction = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const { shop, accessToken } = session;
  console.log(shop, accessToken);
  const webhook = new admin.rest.resources.Webhook({ session: session });
  
  if (webhook) {
    console.log("Webhook fired", webhook);
    webhook.address = "pubsub://projectName:topicName";
    webhook.topic = "orders/create";
    webhook.format = "json";

    console.log("--------Webhook created---------", webhook);
    await webhook.save();
  }

  return null;
};

// Call endpoint when a new product is created

const AutomationPage = (props: Props) => {
  return (
    <div>
      <h1>Automations</h1>
    </div>
  );
};

export default AutomationPage;
