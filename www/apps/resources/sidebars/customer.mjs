/** @type {import('types').RawSidebarItem[]} */
export const customerSidebar = [
  {
    type: "category",
    title: "Customer Module",
    isChildSidebar: true,
    children: [
      {
        type: "link",
        path: "/commerce-modules/customer",
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
            path: "/commerce-modules/customer/customer-accounts",
            title: "Customer Accounts",
          },
          {
            type: "link",
            path: "/commerce-modules/customer/links-to-other-modules",
            title: "Link to Modules",
          },
        ],
      },
      {
        type: "category",
        title: "Server Guides",
        autogenerate_tags: "server+customer",
        initialOpen: false,
        autogenerate_as_ref: true,
        children: [
          {
            type: "link",
            path: "/commerce-modules/customer/extend",
            title: "Extend Module",
          },
        ],
      },
      {
        type: "category",
        title: "Storefront Guides",
        autogenerate_tags: "storefront+customer",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Admin Guides",
        autogenerate_tags: "admin+customer",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "User Guides",
        autogenerate_tags: "userGuides+customer",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Workflows",
        autogenerate_tags: "workflow+customer",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Steps",
        autogenerate_tags: "step+customer",
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
            path: "/commerce-modules/customer/events",
            title: "Events Reference",
          },
          {
            type: "link",
            path: "/commerce-modules/customer/admin-widget-zones",
            title: "Admin Widget Zones",
          },
          {
            type: "link",
            path: "/references/customer",
            title: "Main Service Reference",
            isChildSidebar: true,
            childSidebarTitle: "Customer Module's Main Service Reference",
            children: [
              {
                type: "category",
                title: "Methods",
                autogenerate_path:
                  "/references/customer/ICustomerModuleService/methods",
              },
            ],
          },
          {
            type: "link",
            path: "/references/customer/models",
            title: "Data Models Reference",
            isChildSidebar: true,
            childSidebarTitle: "Customer Module Data Models Reference",
            children: [
              {
                type: "category",
                title: "Data Models",
                autogenerate_path: "/references/customer_models/variables",
              },
            ],
          },
        ],
      },
    ],
  },
]
