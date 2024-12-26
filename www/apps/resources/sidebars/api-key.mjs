/** @type {import('types').RawSidebarItem[]} */
export const apiKeySidebar = [
  {
    type: "category",
    title: "API Key Module",
    isChildSidebar: true,
    children: [
      {
        type: "link",
        path: "/commerce-modules/api-key",
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
            path: "/commerce-modules/api-key/concepts",
            title: "API Key Concepts",
          },
          {
            type: "link",
            path: "/commerce-modules/api-key/links-to-other-modules",
            title: "Link to Modules",
          },
        ],
      },
      {
        type: "category",
        title: "Storefront Guides",
        initialOpen: false,
        autogenerate_tags: "storefront+apiKey",
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Admin Guides",
        initialOpen: false,
        autogenerate_tags: "admin+apiKey",
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "User Guides",
        initialOpen: false,
        autogenerate_tags: "userGuide+apiKey",
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Workflows",
        initialOpen: false,
        autogenerate_tags: "workflow+apiKey",
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Steps",
        initialOpen: false,
        autogenerate_tags: "step+apiKey",
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "References",
        initialOpen: false,
        children: [
          {
            type: "link",
            path: "/commerce-modules/api-key/admin-widget-zones",
            title: "Admin Widget Zones",
          },
          {
            type: "link",
            path: "/references/api-key",
            title: "Main Service Reference",
            isChildSidebar: true,
            childSidebarTitle: "API Key Module's Main Service Reference",
            children: [
              {
                type: "category",
                title: "Methods",
                hasTitleStyling: true,
                autogenerate_path:
                  "/references/api_key/IApiKeyModuleService/methods",
              },
            ],
          },
          {
            type: "link",
            path: "/references/api-key/models",
            title: "Data Models Reference",
            isChildSidebar: true,
            childSidebarTitle: "API Key Module Data Models Reference",
            children: [
              {
                type: "category",
                title: "Data Models",
                hasTitleStyling: true,
                autogenerate_path: "/references/api_key_models/variables",
              },
            ],
          },
        ],
      },
    ],
  },
]
