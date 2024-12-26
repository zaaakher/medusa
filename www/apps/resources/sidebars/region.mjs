/** @type {import('types').RawSidebarItem[]} */
export const regionSidebar = [
  {
    type: "category",
    title: "Region Module",
    isChildSidebar: true,
    children: [
      {
        type: "link",
        path: "/commerce-modules/region",
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
            path: "/commerce-modules/region/links-to-other-modules",
            title: "Links to Modules",
          },
        ],
      },
      {
        type: "category",
        title: "Server Guides",
        autogenerate_tags: "server+region",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Storefront Guides",
        autogenerate_tags: "storefront+region",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Admin Guides",
        autogenerate_tags: "admin+region",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "User Guides",
        autogenerate_tags: "userGuides+region",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Workflows",
        autogenerate_tags: "workflow+region",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Steps",
        autogenerate_tags: "step+region",
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
            path: "/commerce-modules/region/events",
            title: "Events Reference",
          },
          {
            type: "link",
            path: "/commerce-modules/region/admin-widget-zones",
            title: "Admin Widget Zones",
          },
          {
            type: "link",
            path: "/references/region",
            title: "Main Service Reference",
            isChildSidebar: true,
            childSidebarTitle: "Region Module's Main Service Reference",
            children: [
              {
                type: "category",
                title: "Methods",
                autogenerate_path:
                  "/references/region/IRegionModuleService/methods",
              },
            ],
          },
          {
            type: "link",
            path: "/references/region/models",
            title: "Data Models Reference",
            isChildSidebar: true,
            childSidebarTitle: "Region Module Data Models Reference",
            children: [
              {
                type: "category",
                title: "Data Models",
                autogenerate_path: "/references/region_models/variables",
              },
            ],
          },
        ],
      },
    ],
  },
]
