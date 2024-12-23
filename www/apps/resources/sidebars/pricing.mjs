/** @type {import('types').RawSidebarItem[]} */
export const pricingSidebar = [
  {
    type: "category",
    title: "Pricing Module",
    isChildSidebar: true,
    children: [
      {
        type: "link",
        path: "/commerce-modules/pricing",
        title: "Overview",
      },
      {
        type: "link",
        path: "/commerce-modules/pricing/examples",
        title: "Examples",
      },
      {
        type: "sub-category",
        title: "Concepts",
        children: [
          {
            type: "link",
            path: "/commerce-modules/pricing/concepts",
            title: "Pricing Concepts",
          },
          {
            type: "link",
            path: "/commerce-modules/pricing/price-rules",
            title: "Price Rules",
          },
          {
            type: "link",
            path: "/commerce-modules/pricing/price-calculation",
            title: "Prices Calculation",
          },
          {
            type: "link",
            path: "/commerce-modules/pricing/tax-inclusive-pricing",
            title: "Tax-Inclusive Pricing",
          },
          {
            type: "link",
            path: "/commerce-modules/pricing/links-to-other-modules",
            title: "Links to Other Modules",
          },
        ],
      },
      {
        type: "sub-category",
        title: "References",
        children: [
          {
            type: "link",
            path: "/references/pricing",
            title: "Main Service Reference",
            isChildSidebar: true,
            childSidebarTitle: "Pricing Module's Main Service Reference",
            children: [
              {
                type: "category",
                title: "Methods",
                autogenerate_path:
                  "/references/pricing/IPricingModuleService/methods",
              },
            ],
          },
          {
            type: "link",
            path: "/references/pricing/models",
            title: "Data Models Reference",
            isChildSidebar: true,
            childSidebarTitle: "Pricing Module Data Models Reference",
            children: [
              {
                type: "category",
                title: "Data Models",
                hasTitleStyling: true,
                autogenerate_path: "/references/pricing_models/variables",
              },
            ],
          },
        ],
      },
    ],
  },
]
