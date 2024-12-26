/** @type {import('types').RawSidebarItem[]} */
export const currencySidebar = [
  {
    type: "category",
    title: "Currency Module",
    isChildSidebar: true,
    children: [
      {
        type: "link",
        path: "/commerce-modules/currency",
        title: "Overview",
      },
      {
        type: "separator",
      },
      {
        type: "sub-category",
        title: "Concepts",
        initialOpen: false,
        children: [
          {
            type: "link",
            path: "/commerce-modules/currency/links-to-other-modules",
            title: "Link to Modules",
          },
        ],
      },
      {
        type: "category",
        title: "Server Guides",
        autogenerate_tags: "server+currency",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Storefront Guides",
        autogenerate_tags: "storefront+currency",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Admin Guides",
        autogenerate_tags: "admin+currency",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "User Guides",
        autogenerate_tags: "userGuides+currency",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Workflows",
        autogenerate_tags: "workflow+currency",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Steps",
        autogenerate_tags: "step+currency",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "sub-category",
        title: "References",
        initialOpen: false,
        children: [
          {
            type: "link",
            path: "/references/currency",
            title: "Main Service Reference",
            isChildSidebar: true,
            childSidebarTitle: "Currency Module's Main Service Reference",
            children: [
              {
                type: "category",
                title: "Methods",
                autogenerate_path:
                  "/references/currency/ICurrencyModuleService/methods",
              },
            ],
          },
          {
            type: "link",
            path: "/references/currency/models",
            title: "Data Models Reference",
            isChildSidebar: true,
            childSidebarTitle: "Currency Module Data Models Reference",
            children: [
              {
                type: "category",
                title: "Data Models",
                autogenerate_path: "/references/currency_models/variables",
              },
            ],
          },
        ],
      },
    ],
  },
]
