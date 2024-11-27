import { TriangleDownMini, XMarkMini } from "@medusajs/icons"
import {
  Badge,
  Button,
  CurrencyInput,
  Heading,
  IconButton,
  Text,
} from "@medusajs/ui"
import * as Accordion from "@radix-ui/react-accordion"
import { ReactNode, useState } from "react"
import { Divider } from "../../../../../components/common/divider"

const RULE_ITEM_PREFIX = "rule-item"

const getRuleValue = (index: number) => `${RULE_ITEM_PREFIX}-${index}`

export const PriceRuleForm = () => {
  return (
    <div className="flex w-full flex-col gap-y-6">
      <div>
        <Heading>Conditional Prices for [Cell Name]</Heading>
        <Text size="small" className="text-ui-fg-subtle">
          Set custom prices for this shipping option based on the cart total.
        </Text>
      </div>
      <PriceRuleList>
        {Array.from({ length: 3 }).map((_, index) => (
          <PriceRuleItem key={index} index={index} />
        ))}
      </PriceRuleList>
      <div className="flex items-center justify-end">
        <Button variant="secondary" size="small">
          Add price
        </Button>
      </div>
    </div>
  )
}

interface PriceRuleListProps {
  children?: ReactNode
}

const PriceRuleList = ({ children }: PriceRuleListProps) => {
  return (
    <Accordion.Root
      type="multiple"
      defaultValue={[getRuleValue(0)]}
      className="flex flex-col gap-y-3"
    >
      {children}
    </Accordion.Root>
  )
}

interface PriceRuleItemProps {
  index: number
}

const PriceRuleItem = ({ index }: PriceRuleItemProps) => {
  const [numbers, setNumbers] = useState<{
    price: number | undefined | null
    min: number | undefined | null
    max: number | undefined | null
  }>({
    price: 0,
    min: 0,
    max: 0,
  })

  return (
    <Accordion.Item
      value={getRuleValue(index)}
      className="bg-ui-bg-component shadow-elevation-card-rest rounded-lg"
    >
      <Accordion.Trigger className="flex w-full items-center justify-between p-3">
        <div>
          <Text size="small" weight="plus">
            $ 0.00
          </Text>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="text-ui-fg-subtle flex items-center gap-x-1.5">
            <Text size="small">If</Text>
            <Badge size="2xsmall">Cart total</Badge>
            <Text size="small">is above</Text>
            <Badge size="2xsmall">$ 100.00</Badge>
          </div>
          <IconButton
            size="small"
            variant="transparent"
            className="text-ui-fg-muted hover:text-ui-fg-subtle focus-visible:text-ui-fg-subtle"
            onClick={(e) => e.stopPropagation()}
          >
            <XMarkMini />
          </IconButton>
          <IconButton
            size="small"
            variant="transparent"
            className="text-ui-fg-muted hover:text-ui-fg-subtle focus-visible:text-ui-fg-subtle"
          >
            <TriangleDownMini />
          </IconButton>
        </div>
      </Accordion.Trigger>
      <Accordion.Content className="text-ui-fg-subtle">
        <Divider variant="dashed" />
        <div className="grid grid-cols-2 items-center gap-x-2 p-3">
          <Text size="small" weight="plus">
            Shipping option price
          </Text>
          <CurrencyInput
            symbol="$"
            code="USD"
            value={numbers.price || undefined}
            onValueChange={(_value, _name, values) =>
              setNumbers({ ...numbers, price: values?.float })
            }
          />
        </div>
        <Divider variant="dashed" />
        <div className="grid grid-cols-2 items-center gap-x-2 p-3">
          <Text size="small" weight="plus">
            Minimum cart total
          </Text>
          <CurrencyInput
            symbol="$"
            code="USD"
            value={numbers.min || undefined}
            onValueChange={(_value, _name, values) =>
              setNumbers({ ...numbers, min: values?.float })
            }
          />
        </div>
        <Divider variant="dashed" />
        <div className="grid grid-cols-2 items-center gap-x-2 p-3">
          <Text size="small" weight="plus">
            Maximum cart total
          </Text>
          <CurrencyInput
            symbol="$"
            code="USD"
            value={numbers.max || undefined}
            onValueChange={(_value, _name, values) =>
              setNumbers({ ...numbers, max: values?.float })
            }
          />
        </div>
      </Accordion.Content>
    </Accordion.Item>
  )
}
