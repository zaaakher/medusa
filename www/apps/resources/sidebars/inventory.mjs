/** @type {import('types').RawSidebarItem[]} */
export const inventorySidebar = [
  {
    type: "category",
    title: "Inventory Module",
    isChildSidebar: true,
    children: [
      {
        type: "link",
        path: "/commerce-modules/inventory",
        title: "Overview",
      },
      {
        type: "link",
        path: "/commerce-modules/inventory/examples",
        title: "Examples",
      },
      {
        type: "sub-category",
        title: "Concepts",
        children: [
          {
            type: "link",
            path: "/commerce-modules/inventory/concepts",
            title: "Inventory Concepts",
          },
          {
            type: "link",
            path: "/commerce-modules/inventory/inventory-in-flows",
            title: "Inventory in Flows",
          },
          {
            type: "link",
            path: "/commerce-modules/inventory/links-to-other-modules",
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
            path: "/references/inventory-next",
            title: "Main Service Reference",
            isChildSidebar: true,
            childSidebarTitle: "Inventory Module's Main Service Reference",
            children: [
              {
                type: "category",
                title: "Methods",
                autogenerate_path:
                  "/references/inventory_next/IInventoryService/methods",
              },
            ],
          },
          {
            type: "link",
            path: "/references/inventory-next/models",
            title: "Data Models Reference",
            isChildSidebar: true,
            childSidebarTitle: "Inventory Module Data Models Reference",
            children: [
              {
                type: "category",
                title: "Data Models",
                autogenerate_path:
                  "/references/inventory_next_models/variables",
              },
            ],
          },
        ],
      },
    ],
  },
]
