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
        type: "separator",
      },
      {
        type: "category",
        title: "Concepts",
        initialOpen: false,
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
        type: "category",
        title: "Server Guides",
        autogenerate_tags: "server+fulfillment",
        initialOpen: false,
        autogenerate_as_ref: true,
        children: [
          {
            type: "link",
            path: "/references/fulfillment/provider",
            title: "Create Fulfillment Provider Module",
          },
          {
            type: "ref",
            path: "/integrations/guides/shipstation",
            title: "Integrate ShipStation",
          },
        ],
      },
      {
        type: "category",
        title: "Storefront Guides",
        autogenerate_tags: "storefront+fulfillment",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Admin Guides",
        autogenerate_tags: "admin+fulfillment",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "User Guides",
        autogenerate_tags: "userGuides+fulfillment",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Workflows",
        autogenerate_tags: "workflow+fulfillment",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Steps",
        autogenerate_tags: "step+fulfillment",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "References",
        initialOpen: false,
        children: [
          {
            type: "link",
            path: "/commerce-modules/fulfillment/admin-widget-zones",
            title: "Admin Widget Zones",
          },
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
