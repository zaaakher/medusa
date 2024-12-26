/** @type {import('types').RawSidebarItem[]} */
export const storeSidebar = [
  {
    type: "category",
    title: "Store Module",
    isChildSidebar: true,
    children: [
      {
        type: "link",
        path: "/commerce-modules/store",
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
            path: "/commerce-modules/store/links-to-other-modules",
            title: "Link to Modules",
          },
        ],
      },
      {
        type: "category",
        title: "Server Guides",
        autogenerate_tags: "server+store",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Storefront Guides",
        autogenerate_tags: "storefront+store",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Admin Guides",
        autogenerate_tags: "admin+store",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "User Guides",
        autogenerate_tags: "userGuides+store",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Workflows",
        autogenerate_tags: "workflow+store",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Steps",
        autogenerate_tags: "step+store",
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
            path: "/commerce-modules/store/admin-widget-zones",
            title: "Admin Widget Zones",
          },
          {
            type: "link",
            path: "/references/store",
            title: "Main Service Reference",
            isChildSidebar: true,
            childSidebarTitle: "Store Module's Main Service Reference",
            children: [
              {
                type: "category",
                title: "Methods",
                autogenerate_path:
                  "/references/store/IStoreModuleService/methods",
              },
            ],
          },
          {
            type: "link",
            path: "/references/store/models",
            title: "Data Models Reference",
            isChildSidebar: true,
            childSidebarTitle: "Store Module Data Models Reference",
            children: [
              {
                type: "category",
                title: "Data Models",
                autogenerate_path: "/references/store_models/variables",
              },
            ],
          },
        ],
      },
    ],
  },
]
