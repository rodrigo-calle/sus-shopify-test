import Test from "~/components/Test";

export const tabs = [
  {
    id: "all-customers",
    content: "All",
    accessibilityLabel: "All customers",
    panelID: "all-customers-content",
    component: Test,
  },
  {
    id: "accepts-marketing",
    content: "Ongoing",
    panelID: "accepts-marketing-content",
    component: Test,
  },
  {
    id: "repeat-customers",
    content: "Repeat customers",
    panelID: "repeat-customers-content",
    component: Test,
  },
  {
    id: "prospects",
    content: "Prospects",
    panelID: "prospects-content",
    component: Test,
  },
];
