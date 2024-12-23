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
        type: "link",
        path: "/commerce-modules/payment/examples",
        title: "Examples",
      },
      {
        type: "sub-category",
        title: "Concepts",
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
        type: "sub-category",
        title: "Guides",
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
        type: "sub-category",
        title: "Payment Providers",
        children: [
          {
            type: "link",
            path: "/commerce-modules/payment/payment-provider/stripe",
            title: "Stripe",
          },
        ],
      },
      {
        type: "sub-category",
        title: "References",
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
