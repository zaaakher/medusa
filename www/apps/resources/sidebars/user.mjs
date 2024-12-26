/** @type {import('types').RawSidebarItem[]} */
export const userSidebar = [
  {
    type: "category",
    title: "User Module",
    isChildSidebar: true,
    children: [
      {
        type: "link",
        path: "/commerce-modules/user",
        title: "Overview",
      },
      {
        type: "link",
        path: "/commerce-modules/user/module-options",
        title: "Module Options",
      },
      {
        type: "separator",
      },
      {
        type: "category",
        title: "Server Guides",
        autogenerate_tags: "server+user",
        initialOpen: false,
        autogenerate_as_ref: true,
        children: [
          {
            type: "link",
            path: "/commerce-modules/user/user-creation-flows",
            title: "User Creation Flows",
          },
        ],
      },
      {
        type: "category",
        title: "Storefront Guides",
        autogenerate_tags: "storefront+user",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Admin Guides",
        autogenerate_tags: "admin+user",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "User Guides",
        autogenerate_tags: "userGuides+user",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Workflows",
        autogenerate_tags: "workflow+user",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Steps",
        autogenerate_tags: "step+user",
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
            path: "/commerce-modules/user/events",
            title: "Events Reference",
          },
          {
            type: "link",
            path: "/commerce-modules/user/admin-widget-zones",
            title: "Admin Widget Zones",
          },
          {
            type: "link",
            path: "/references/user",
            title: "Main Service Reference",
            isChildSidebar: true,
            childSidebarTitle: "User Module's Main Service Reference",
            children: [
              {
                type: "category",
                title: "Methods",
                autogenerate_path:
                  "/references/user/IUserModuleService/methods",
              },
            ],
          },
          {
            type: "link",
            path: "/references/user/models",
            title: "Data Models Reference",
            isChildSidebar: true,
            childSidebarTitle: "User Module Data Models Reference",
            children: [
              {
                type: "category",
                title: "Data Models",
                hasTitleStyling: true,
                autogenerate_path: "/references/user_models/variables",
              },
            ],
          },
        ],
      },
    ],
  },
]
