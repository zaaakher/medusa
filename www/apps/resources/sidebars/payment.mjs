/** @type {import('types').RawSidebarItem[]} */
export const paymentSidebar = [
  {
    type: "category",
    title: "Payment Module",
    isChildSidebar: true,
    children: [
      {
        type: "link",
        path: "/commerce-modules/payment",
        title: "Overview",
      },
      {
        type: "link",
        path: "/commerce-modules/payment/module-options",
        title: "Module Options",
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
            path: "/commerce-modules/payment/payment-collection",
            title: "Payment Collections",
          },
          {
            type: "link",
            path: "/commerce-modules/payment/payment-session",
            title: "Payment Session",
          },
          {
            type: "link",
            path: "/commerce-modules/payment/payment",
            title: "Payment",
          },
          {
            type: "link",
            path: "/commerce-modules/payment/payment-provider",
            title: "Payment Provider Module",
          },
          {
            type: "link",
            path: "/commerce-modules/payment/webhook-events",
            title: "Webhook Events",
          },
          {
            type: "link",
            path: "/commerce-modules/payment/links-to-other-modules",
            title: "Links to Other Modules",
          },
        ],
      },
      {
        type: "category",
        title: "Server Guides",
        autogenerate_tags: "server+payment",
        initialOpen: false,
        autogenerate_as_ref: true,
        children: [
          {
            type: "link",
            path: "/commerce-modules/payment/payment-flow",
            title: "Accept Payment Flow",
          },
          {
            type: "link",
            path: "/references/payment/provider",
            title: "Create Payment Provider",
          },
        ],
      },
      {
        type: "category",
        title: "Storefront Guides",
        autogenerate_tags: "storefront+payment",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Admin Guides",
        autogenerate_tags: "admin+payment",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "User Guides",
        autogenerate_tags: "userGuides+payment",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Workflows",
        autogenerate_tags: "workflow+payment",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Steps",
        autogenerate_tags: "step+payment",
        initialOpen: false,
        autogenerate_as_ref: true,
      },
      {
        type: "category",
        title: "Providers",
        initialOpen: false,
        children: [
          {
            type: "link",
            path: "/commerce-modules/payment/payment-provider/stripe",
            title: "Stripe",
          },
        ],
      },
      {
        type: "category",
        title: "References",
        initialOpen: false,
        children: [
          {
            type: "link",
            path: "/references/payment",
            title: "Main Service Reference",
            isChildSidebar: true,
            childSidebarTitle: "Payment Module's Main Service Reference",
            children: [
              {
                type: "category",
                title: "Methods",
                autogenerate_path:
                  "/references/payment/IPaymentModuleService/methods",
              },
            ],
          },
          {
            type: "link",
            path: "/references/payment/models",
            title: "Data Models Reference",
            isChildSidebar: true,
            childSidebarTitle: "Payment Module Data Models Reference",
            children: [
              {
                type: "category",
                title: "Data Models",
                autogenerate_path: "/references/payment_models/variables",
              },
            ],
          },
        ],
      },
    ],
  },
]
