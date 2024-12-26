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
        type: "separator",
      },
      {
        type: "category",
        title: "Concepts",
        initialOpen: false,
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
        type: "category",
        title: "Server Guides",
        autogenerate_tags: "server+inventory",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Storefront Guides",
        autogenerate_tags: "storefront+inventory",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Admin Guides",
        autogenerate_tags: "admin+inventory",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "User Guides",
        autogenerate_tags: "userGuides+inventory",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Workflows",
        autogenerate_tags: "workflow+inventory",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Steps",
        autogenerate_tags: "step+inventory",
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
            path: "/commerce-modules/inventory/admin-widget-zones",
            title: "Admin Widget Zones",
          },
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
