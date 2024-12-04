import {
  createStep,
  createWorkflow,
  StepResponse,
  when,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"

const step1 = createStep(
  {
    name: "step1",
    async: true,
  },
  async (_, context) => {
    console.log("wf-when step 1")
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return new StepResponse({ result: "step1" })
  }
)
const step2 = createStep("step2", async (input: string, context) => {
  console.log("wf-when step 2")
  return new StepResponse({ result: input })
})
const step3 = createStep(
  "step3",
  async (input: string | undefined, context) => {
    console.log("wf-when step 3")
    return new StepResponse({ result: input ?? "default response" })
  }
)

const subWorkflow = createWorkflow(
  "wf-when-sub",
  function (input: WorkflowData<string>) {
    return new WorkflowResponse(step2(input))
  }
)

createWorkflow("wf-when", function (input: { callSubFlow: boolean }) {
  step1()
  const subWorkflowRes = when({ input }, ({ input }) => {
    return input.callSubFlow
  }).then(() => {
    return subWorkflow.runAsStep({
      input: "hi from outside",
    })
  })

  return new WorkflowResponse(step3(subWorkflowRes!.result))
})
