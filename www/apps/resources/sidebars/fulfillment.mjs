/** @type {import('types').RawSidebarItem[]} */
export const fulfillmentSidebar = [
  {
    type: "category",
    title: "Fulfillment Module",
    isChildSidebar: true,
    children: [
      {
        type: "link",
        path: "/commerce-modules/fulfillment",
        title: "Overview",
      },
      {
        type: "link",
        path: "/commerce-modules/fulfillment/module-options",
        title: "Module Options",
      },
      {
        type: "sub-category",
        title: "Concepts",
        children: [
          {
            type: "link",
            path: "/commerce-modules/fulfillment/concepts",
            title: "Fulfillment Concepts",
          },
          {
            type: "link",
            path: "/commerce-modules/fulfillment/fulfillment-provider",
            title: "Fulfillment Provider",
          },
          {
            type: "link",
            path: "/commerce-modules/fulfillment/shipping-option",
            title: "Shipping Option",
          },
          {
            type: "link",
            path: "/commerce-modules/fulfillment/item-fulfillment",
            title: "Item Fulfillment",
          },
          {
            type: "link",
            path: "/commerce-modules/fulfillment/links-to-other-modules",
            title: "Links to Other Modules",
          },
        ],
      },
      {
        type: "sub-category",
        title: "Guides",
        children: [
          {
            type: "link",
            path: "/references/fulfillment/provider",
            title: "Create Fulfillment Provider Module",
          },
          {
            type: "link",
            path: "/integrations/guides/shipstation",
            title: "Integrate ShipStation",
          },
        ],
      },
      {
        type: "sub-category",
        title: "References",
        children: [
          {
            type: "link",
            path: "/references/fulfillment",
            title: "Main Service Reference",
            isChildSidebar: true,
            childSidebarTitle: "Fulfillment Module's Main Service Reference",
            children: [
              {
                type: "category",
                title: "Methods",
                autogenerate_path:
                  "/references/fulfillment/IFulfillmentModuleService/methods",
              },
            ],
          },
          {
            type: "link",
            path: "/references/fulfillment/models",
            title: "Data Models Reference",
            isChildSidebar: true,
            childSidebarTitle: "Fulfillment Module Data Models Reference",
            children: [
              {
                type: "category",
                title: "Data Models",
                hasTitleStyling: true,
                autogenerate_path: "/references/fulfillment_models/variables",
              },
            ],
          },
        ],
      },
    ],
  },
]
