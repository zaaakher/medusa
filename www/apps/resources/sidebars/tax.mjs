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
        type: "link",
        path: "/commerce-modules/tax/examples",
        title: "Examples",
      },
      {
        type: "sub-category",
        title: "Concepts",
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
        type: "sub-category",
        title: "Guides",
        children: [
          {
            type: "link",
            path: "/references/tax/provider",
            title: "Tax Provider Reference",
          },
        ],
      },
      {
        type: "sub-category",
        title: "References",
        children: [
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
