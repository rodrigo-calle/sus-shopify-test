import { useEffect, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
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
  TextField,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const data = {
    ...Object.fromEntries(await request.formData())
  };

  console.log(data);
  const response = await admin.graphql(
    `#graphql
      mutation populateCustomer($input: CustomerInput!) {
        customerCreate(input: $input) {
          customer {
            id
            firstName
            lastName
            email
          }
        }
      }`,
    {
      variables: {
        input: {
          firstName: data.fistName,
          lastName: data.lastName,
          email: data.email,
        },
      },
    }
  );
  const responseJson = await response.json();

  return json({
    customer: responseJson.data?.customerCreate?.customer,
  });
};

interface Form {
  fistName: string;
  lastName: string;
  email: string;
}

export default function Index() {
  const [form, setForm] = useState<Form>({
    fistName: "",
    lastName: "",
    email: "",
  });
  const nav = useNavigation();
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();
  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const productId = actionData?.customer?.id.replace(
    "gid://shopify/Customer/",
    ""
  );

  useEffect(() => {
    if (productId) {
      shopify.toast.show("Customer created");
    }
  }, [productId]);
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
                    Customer From
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
                        <TextField onChange={(value) => {
                          setForm({
                            ...form,
                            fistName: value
                          })

                        }} value={form.fistName} autoComplete="" label="Fist Name" name="fistName" />
                        <TextField
                          onChange={(value) => {
                            setForm({
                              ...form,
                              lastName: value
                            })
                          }}
                          value={form.lastName} autoComplete="" label="Last Name" name="lastName" />
                        <TextField
                          onChange={(value) => {
                            setForm({
                              ...form,
                              email: value
                            })
                          }}
                          value={form.email} autoComplete="" type="email" label="Email" name="email" />
                      </FormLayout>
                      <Button loading={isLoading} submit>
                        Generate a Customer
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
