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
        type: "link",
        path: "/commerce-modules/stock-location/examples",
        title: "Examples",
      },
      {
        type: "sub-category",
        title: "Concepts",
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
        type: "sub-category",
        title: "References",
        children: [
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
