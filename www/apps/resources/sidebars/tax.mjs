/** @type {import('types').RawSidebarItem[]} */
export const taxSidebar = [
  {
    type: "category",
    title: "Tax Module",
    isChildSidebar: true,
    children: [
      {
        type: "link",
        path: "/commerce-modules/tax",
        title: "Overview",
      },
      {
        type: "link",
        path: "/commerce-modules/tax/module-options",
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
            path: "/commerce-modules/tax/tax-region",
            title: "Tax Region",
          },
          {
            type: "link",
            path: "/commerce-modules/tax/tax-rates-and-rules",
            title: "Tax Rates and Rules",
          },
          {
            type: "link",
            path: "/commerce-modules/tax/tax-calculation-with-provider",
            title: "Tax Calculation and Providers",
          },
        ],
      },
      {
        type: "category",
        title: "Server Guides",
        autogenerate_tags: "server+tax",
        initialOpen: false,
        autogenerate_as_ref: true,
        children: [
          {
            type: "link",
            path: "/references/tax/provider",
            title: "Tax Provider Reference",
          },
        ],
      },
      {
        type: "category",
        title: "Storefront Guides",
        autogenerate_tags: "storefront+tax",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Admin Guides",
        autogenerate_tags: "admin+tax",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "User Guides",
        autogenerate_tags: "userGuides+tax",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Workflows",
        autogenerate_tags: "workflow+tax",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Steps",
        autogenerate_tags: "step+tax",
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
            path: "/commerce-modules/tax/admin-widget-zones",
            title: "Admin Widget Zones",
          },
          {
            type: "link",
            path: "/references/tax",
            title: "Main Service Reference",
            isChildSidebar: true,
            childSidebarTitle: "Tax Module's Main Service Reference",
            children: [
              {
                type: "category",
                title: "Methods",
                autogenerate_path: "/references/tax/ITaxModuleService/methods",
              },
            ],
          },
          {
            type: "link",
            path: "/references/tax/models",
            title: "Data Models Reference",
            isChildSidebar: true,
            childSidebarTitle: "Tax Module Data Models Reference",
            children: [
              {
                type: "category",
                title: "Data Models",
                autogenerate_path: "/references/tax_models/variables",
              },
            ],
          },
        ],
      },
    ],
  },
]
