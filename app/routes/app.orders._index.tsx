import { useEffect, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";

import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Form,
  FormLayout,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";

interface Form {
  id?: string;
  title: string;
  price: string;
  quantity: number;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const data = {
    ...Object.fromEntries(await request.formData())
  } as unknown as Form;
  const order = new admin.rest.resources.Order({ session: session });
  order.currency = "COP"
  order.email = "kennetholivas1@gmail.com";
  order.name = "Kenneth Olivas";
  order.customer = {
    fisrt_name: "Kenneth",
    last_name: "Olivas",
  }
  order.line_items = [
    {
      "title": data.title,
      "price": data.price,
      "quantity": data.quantity,
      "tax_lines": [
        {
          "price": 0,
          "rate": 0,
          "title": "State tax"
        }
      ]
    }
  ]

  order.transactions = [
    {
      "kind": "sale",
      "status": "success",
      "amount": data.price
    }
  ];

  await order.save({
    update: true,
  });

  return json({
    order: order,
  });

};

export default function Index() {
  const [form, setForm] = useState<Form>({
    price: "",
    quantity: 1,
    title: "",
    id: "",
  });
  const nav = useNavigation();
  const submit = useSubmit();
  const actionData = useActionData<typeof action>();
  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const orderId = actionData?.order.id
  useEffect(() => {
    if (orderId) {
      shopify.toast.show("Order created");
    }
  }, [orderId]);

  async function selectProduct() {
    const products = await window.shopify.resourcePicker({
      type: "product",
      action: "select", // customized action verb, either 'select' or 'add',
    });

    if (products) {
      const { id, title, variants } = products[0];
      setForm({
        id: id,
        title: title,
        price: variants[0].price ?? "",
        quantity: 1
      });
    }
  }

  const handleSave = () => {
    const data = {
      ...form
    };
    submit(data, { method: "post" });
  }

  return (
    <Page>
      <ui-title-bar title="Customers" />
      <BlockStack gap="100">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Order From
                  </Text>
                </BlockStack>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Text>
                  <Form onSubmit={(e) => {
                    e.preventDefault();
                    handleSave()
                  }}>
                    <BlockStack gap="600">
                      <FormLayout>
                        <Button onClick={selectProduct}>
                          Select a Product
                        </Button>
                        <Text as="span" variant="bodyMd">
                          {form.title}
                        </Text>
                        <Text as="span" variant="bodyMd">
                          {form.price}
                        </Text>
                      </FormLayout>
                      <Button loading={isLoading} submit>
                        Generate a Order
                      </Button>
                    </BlockStack>
                  </Form>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
