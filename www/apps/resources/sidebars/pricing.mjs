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
        type: "separator",
      },
      {
        type: "category",
        title: "Concepts",
        initialOpen: false,
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
        type: "category",
        title: "Server Guides",
        autogenerate_tags: "server+pricing",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Storefront Guides",
        autogenerate_tags: "storefront+pricing",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Admin Guides",
        autogenerate_tags: "admin+pricing",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "User Guides",
        autogenerate_tags: "userGuides+pricing",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Workflows",
        autogenerate_tags: "workflow+pricing",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Steps",
        autogenerate_tags: "step+pricing",
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
            path: "/commerce-modules/pricing/admin-widget-zones",
            title: "Admin Widget Zones",
          },
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
