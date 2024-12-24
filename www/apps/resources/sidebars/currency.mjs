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
        type: "link",
        path: "/commerce-modules/currency/examples",
        title: "Examples",
      },
      {
        type: "sub-category",
        title: "Concepts",
        children: [
          {
            type: "link",
            path: "/commerce-modules/currency/links-to-other-modules",
            title: "Link to Modules",
          },
        ],
      },
      {
        type: "sub-category",
        title: "References",
        children: [
          {
            type: "link",
            path: "/references/currency",
            title: "Main Service Reference",
            isChildSidebar: true,
            childSidebarTitle: "Cart Module's Main Service Reference",
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
