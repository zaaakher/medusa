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
        type: "link",
        path: "/commerce-modules/store/examples",
        title: "Examples",
      },
      {
        type: "sub-category",
        title: "References",
        children: [
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
