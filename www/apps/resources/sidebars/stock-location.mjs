/** @type {import('types').RawSidebarItem[]} */
export const stockLocationSidebar = [
  {
    type: "category",
    title: "Stock Location Module",
    isChildSidebar: true,
    children: [
      {
        type: "link",
        path: "/commerce-modules/stock-location",
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
            path: "/commerce-modules/stock-location/concepts",
            title: "Stock Location Concepts",
          },
          {
            type: "link",
            path: "/commerce-modules/stock-location/links-to-other-modules",
            title: "Links to Modules",
          },
        ],
      },
      {
        type: "category",
        title: "Server Guides",
        autogenerate_tags: "server+stockLocation",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Storefront Guides",
        autogenerate_tags: "storefront+stockLocation",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Admin Guides",
        autogenerate_tags: "admin+stockLocation",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "User Guides",
        autogenerate_tags: "userGuides+stockLocation",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Workflows",
        autogenerate_tags: "workflow+stockLocation",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Steps",
        autogenerate_tags: "step+stockLocation",
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
            path: "/commerce-modules/stock-location/admin-widget-zones",
            title: "Admin Widget Zones",
          },
          {
            type: "link",
            path: "/references/stock-location-next",
            title: "Main Service Reference",
            isChildSidebar: true,
            childSidebarTitle: "Stock Location Module's Main Service Reference",
            children: [
              {
                type: "category",
                title: "Methods",
                autogenerate_path:
                  "/references/stock_location_next/IStockLocationService/methods",
              },
            ],
          },
          {
            type: "link",
            path: "/references/stock-location-next/models",
            title: "Data Models Reference",
            isChildSidebar: true,
            childSidebarTitle: "Stock Location Module Data Models Reference",
            children: [
              {
                type: "category",
                title: "Data Models",
                autogenerate_path:
                  "/references/stock_location_next_models/variables",
              },
            ],
          },
        ],
      },
    ],
  },
]
