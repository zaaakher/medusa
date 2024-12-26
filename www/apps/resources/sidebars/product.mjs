/** @type {import('types').RawSidebarItem[]} */
export const productSidebar = [
  {
    type: "category",
    title: "Product Module",
    isChildSidebar: true,
    children: [
      {
        type: "link",
        path: "/commerce-modules/product",
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
            path: "/commerce-modules/product/links-to-other-modules",
            title: "Links to Other Modules",
          },
        ],
      },
      {
        type: "category",
        title: "Server Guides",
        autogenerate_tags: "server+product",
        initialOpen: false,
        autogenerate_as_ref: true,
        children: [
          {
            type: "link",
            path: "/commerce-modules/product/extend",
            title: "Extend Module",
          },
          {
            type: "link",
            path: "/commerce-modules/product/guides/price",
            title: "Get Variant Prices",
          },
          {
            type: "link",
            path: "/commerce-modules/product/guides/price-with-taxes",
            title: "Get Variant Price with Taxes",
          },
        ],
      },
      {
        type: "category",
        title: "Storefront Guides",
        autogenerate_tags: "storefront+product",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Admin Guides",
        autogenerate_tags: "admin+product",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "User Guides",
        autogenerate_tags: "userGuides+product",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Workflows",
        autogenerate_tags: "workflow+product",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Steps",
        autogenerate_tags: "step+product",
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
            path: "/commerce-modules/product/events",
            title: "Events Reference",
          },
          {
            type: "link",
            path: "/commerce-modules/product/admin-widget-zones",
            title: "Admin Widget Zones",
          },
          {
            type: "link",
            path: "/references/product",
            title: "Main Service Reference",
            isChildSidebar: true,
            childSidebarTitle: "Product Module's Main Service Reference",
            children: [
              {
                type: "category",
                title: "Methods",
                autogenerate_path:
                  "/references/product/IProductModuleService/methods",
              },
            ],
          },
          {
            type: "link",
            path: "/references/product/models",
            title: "Data Models Reference",
            isChildSidebar: true,
            childSidebarTitle: "Product Module Data Models Reference",
            children: [
              {
                type: "category",
                title: "Data Models",
                hasTitleStyling: true,
                autogenerate_path: "/references/product_models/variables",
              },
            ],
          },
        ],
      },
    ],
  },
]
