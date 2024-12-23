/** @type {import('types').RawSidebarItem[]} */
export const promotionSidebar = [
  {
    type: "category",
    title: "Promotion Module",
    isChildSidebar: true,
    children: [
      {
        type: "link",
        path: "/commerce-modules/promotion",
        title: "Overview",
      },
      {
        type: "link",
        path: "/commerce-modules/promotion/examples",
        title: "Examples",
      },
      {
        type: "link",
        path: "/commerce-modules/promotion/extend",
        title: "Extend Module",
      },
      {
        type: "sub-category",
        title: "Concepts",
        children: [
          {
            type: "link",
            path: "/commerce-modules/promotion/concepts",
            title: "Promotion",
          },
          {
            type: "link",
            path: "/commerce-modules/promotion/application-method",
            title: "Application Method",
          },
          {
            type: "link",
            path: "/commerce-modules/promotion/campaign",
            title: "Campaign",
          },
          {
            type: "link",
            path: "/commerce-modules/promotion/actions",
            title: "Promotion Actions",
          },
          {
            type: "link",
            path: "/commerce-modules/promotion/links-to-other-modules",
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
            path: "/references/promotion",
            title: "Main Service Reference",
            isChildSidebar: true,
            childSidebarTitle: "Promotion Module's Main Service Reference",
            children: [
              {
                type: "category",
                title: "Methods",
                hasTitleStyling: true,
                autogenerate_path:
                  "/references/promotion/IPromotionModuleService/methods",
              },
            ],
          },
          {
            type: "link",
            path: "/references/promotion/models",
            title: "Data Models Reference",
            isChildSidebar: true,
            childSidebarTitle: "Promotion Module Data Models Reference",
            children: [
              {
                type: "category",
                title: "Data Models",
                hasTitleStyling: true,
                autogenerate_path: "/references/promotion_models/variables",
              },
            ],
          },
        ],
      },
    ],
  },
]
