import {
  Button,
  InlineGrid,
  Layout,
  LegacyCard,
  Page,
  Tabs,
  Text,
} from "@shopify/polaris";
import React, { useCallback } from "react";
import { tabs } from "~/utils/tabs";

const CampaingsPage = () => {
  const [selected, setSelected] = React.useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    []
  );

  const SelectedComponent = tabs[selected].component;

  return (
    <Page>
      <Layout.Section>
        <InlineGrid columns={2}>
          <Text variant="heading3xl" as="h2">
            Campaings
          </Text>
          <Button>Create new</Button>
        </InlineGrid>
      </Layout.Section>
      <Layout.Section>
        <LegacyCard>
          <Tabs onSelect={handleTabChange} selected={selected} tabs={tabs}>
            <LegacyCard.Section>{<SelectedComponent />}</LegacyCard.Section>
          </Tabs>
        </LegacyCard>
      </Layout.Section>
    </Page>
  );
};

export default CampaingsPage;
