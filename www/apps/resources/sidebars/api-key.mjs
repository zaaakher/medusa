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
        type: "link",
        path: "/commerce-modules/api-key/examples",
        title: "Examples",
      },
      {
        type: "sub-category",
        title: "Concepts",
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
        type: "sub-category",
        title: "References",
        children: [
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
