/** @type {import('types').RawSidebarItem[]} */
export const salesChannelSidebar = [
  {
    type: "category",
    title: "Sales Channel Module",
    isChildSidebar: true,
    children: [
      {
        type: "link",
        path: "/commerce-modules/sales-channel",
        title: "Overview",
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
            path: "/commerce-modules/sales-channel/publishable-api-keys",
            title: "Publishable API Keys",
          },
          {
            type: "link",
            path: "/commerce-modules/sales-channel/links-to-other-modules",
            title: "Links to Modules",
          },
        ],
      },
      {
        type: "category",
        title: "Server Guides",
        autogenerate_tags: "server+salesChannel",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Storefront Guides",
        autogenerate_tags: "storefront+salesChannel",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Admin Guides",
        autogenerate_tags: "admin+salesChannel",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "User Guides",
        autogenerate_tags: "userGuides+salesChannel",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Workflows",
        autogenerate_tags: "workflow+salesChannel",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Steps",
        autogenerate_tags: "step+salesChannel",
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
            path: "/commerce-modules/sales-channel/events",
            title: "Events Reference",
          },
          {
            type: "link",
            path: "/commerce-modules/sales-channel/admin-widget-zones",
            title: "Admin Widget Zones",
          },
          {
            type: "link",
            path: "/references/sales-channel",
            title: "Main Service Reference",
            isChildSidebar: true,
            childSidebarTitle: "Sales Channel Module's Main Service Reference",
            children: [
              {
                type: "category",
                title: "Methods",
                autogenerate_path:
                  "/references/sales_channel/ISalesChannelModuleService/methods",
              },
            ],
          },
          {
            type: "link",
            path: "/references/sales-channel/models",
            title: "Data Models Reference",
            isChildSidebar: true,
            childSidebarTitle: "Sales Channel Module Data Models Reference",
            children: [
              {
                type: "category",
                title: "Data Models",
                autogenerate_path: "/references/sales_channel_models/variables",
              },
            ],
          },
        ],
      },
    ],
  },
]
