import { Form } from "@remix-run/react";
import {
  Button,
  Frame,
  Layout,
  Modal,
  Page,
  TextField,
} from "@shopify/polaris";
import React from "react";
type Props = {};
const CreateCanpaingForm = (props: Props) => {
  const [activate, setActivate] = React.useState(false);

  const handleChange = React.useCallback(
    () => setActivate(!activate),
    [activate]
  );

  const activator = <Button onClick={handleChange}>Open</Button>;

  const [value, setValue] = React.useState("");
  const handleChangeText = React.useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  return (
    <Page>
      <Frame>
        <Modal
          activator={activator}
          open={activate}
          onClose={handleChange}
          title={"Create a new Email Campaing"}
          primaryAction={{
            content: "Send",
            onAction: () => {},
          }}
          secondaryActions={[
            {
              content: "Finish Later",
              onAction: () => {},
            },
          ]}
        ></Modal>
        <Modal.Section>
          <Form>
            <Layout.Section>
              <TextField
                label="Title"
                value={value}
                onChange={handleChangeText}
                autoComplete="off"
              />
              <TextField
                label="Title"
                value={value}
                onChange={handleChangeText}
                autoComplete="off"
              />
              <TextField
                label="Title"
                value={value}
                onChange={handleChangeText}
                autoComplete="off"
              />
              <TextField
                label="Title"
                value={value}
                onChange={handleChangeText}
                autoComplete="off"
              />
              <TextField
                label="Title"
                value={value}
                onChange={handleChangeText}
                autoComplete="off"
              />
            </Layout.Section>
          </Form>
        </Modal.Section>
      </Frame>
    </Page>
  );
};

export default CreateCanpaingForm;
