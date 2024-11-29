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
import React, { ReactNode, useEffect, useRef, useState } from "react"
import {
  Control,
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Divider } from "../../../../../components/common/divider"
import {
  StackedFocusModal,
  useStackedModal,
} from "../../../../../components/modals"
import { castNumber } from "../../../../../lib/cast-number"
import { CurrencyInfo } from "../../../../../lib/data/currencies"
import { getLocaleAmount } from "../../../../../lib/money-amount-helpers"
import { CreateShippingOptionSchemaType } from "../../../location-service-zone-shipping-option-create/components/create-shipping-options-form/schema"
import { CONDITIONAL_PRICES_STACKED_MODAL_ID } from "../../constants"
import {
  ConditionalPriceInfo,
  ConditionalShippingOptionPriceAccessor,
} from "../../types"
import { getCustomShippingOptionPriceFieldName } from "../../utils/get-custom-shipping-option-price-field-info"
import { useShippingOptionPrice } from "../shipping-option-price-provider"

const RULE_ITEM_PREFIX = "rule-item"

const getRuleValue = (index: number) => `${RULE_ITEM_PREFIX}-${index}`

interface PriceRuleFormProps {
  info: ConditionalPriceInfo
}

export const PriceRuleForm = ({ info }: PriceRuleFormProps) => {
  const { t } = useTranslation()
  const { getValues, setValue: setFormValue } =
    useFormContext<CreateShippingOptionSchemaType>()
  const { onCloseConditionalPricesModal } = useShippingOptionPrice()
  const { getIsOpen } = useStackedModal()

  const [value, setValue] = useState<string[]>([getRuleValue(0)])

  const { field, type, currency, name: header } = info

  const name = getCustomShippingOptionPriceFieldName(field, type)
  const snapshot = useRef(getValues(name))

  const tempForm = useForm({
    defaultValues: {
      [name]: snapshot.current,
    },
  })

  const open = getIsOpen(CONDITIONAL_PRICES_STACKED_MODAL_ID)

  useEffect(() => {
    if (open) {
      tempForm.reset({
        [name]: snapshot.current,
      })
    }
  }, [open, name, tempForm])

  const { fields, append, remove } = useFieldArray({
    control: tempForm.control,
    name,
  })

  const handleAdd = () => {
    append({
      amount: "",
      gte: "",
      lte: "",
    })

    setValue([...value, getRuleValue(fields.length)])
  }

  const handleRemove = (index: number) => {
    remove(index)
  }

  const handleSave = () => {
    setFormValue(name, tempForm.getValues(name))
    tempForm.reset()
    onCloseConditionalPricesModal()
  }

  return (
    <StackedFocusModal.Content>
      <StackedFocusModal.Header />
      <StackedFocusModal.Body>
        <div className="flex w-full flex-1 flex-col items-center">
          <div className="flex w-full max-w-[720px] flex-col gap-y-8 px-6 py-16">
            <div className="flex w-full flex-col gap-y-6">
              <div>
                <StackedFocusModal.Title asChild>
                  <Heading>Conditional Prices for {header}</Heading>
                </StackedFocusModal.Title>
                <StackedFocusModal.Description>
                  <Text size="small" className="text-ui-fg-subtle">
                    Set custom prices for this shipping option based on the cart
                    total.
                  </Text>
                </StackedFocusModal.Description>
              </div>
              <PriceRuleList value={value} onValueChange={setValue}>
                {fields.map((field, index) => (
                  <PriceRuleItem
                    key={field.id}
                    index={index}
                    accessor={name}
                    onRemove={handleRemove}
                    currency={currency}
                    control={tempForm.control}
                  />
                ))}
              </PriceRuleList>
              <div className="flex items-center justify-end">
                <Button
                  variant="secondary"
                  size="small"
                  type="button"
                  onClick={handleAdd}
                >
                  Add price
                </Button>
              </div>
            </div>
          </div>
        </div>
      </StackedFocusModal.Body>
      <StackedFocusModal.Footer>
        <div className="flex items-center justify-end gap-2">
          <StackedFocusModal.Close asChild>
            <Button variant="secondary" size="small" type="button">
              {t("actions.cancel")}
            </Button>
          </StackedFocusModal.Close>
          <Button size="small" type="button" onClick={handleSave}>
            {t("actions.save")}
          </Button>
        </div>
      </StackedFocusModal.Footer>
    </StackedFocusModal.Content>
  )
}

interface PriceRuleListProps {
  children?: ReactNode
  value: string[]
  onValueChange: (value: string[]) => void
}

const PriceRuleList = ({
  children,
  value,
  onValueChange,
}: PriceRuleListProps) => {
  return (
    <Accordion.Root
      type="multiple"
      defaultValue={[getRuleValue(0)]}
      value={value}
      onValueChange={onValueChange}
      className="flex flex-col gap-y-3"
    >
      {children}
    </Accordion.Root>
  )
}

interface PriceRuleItemProps {
  index: number
  accessor: ConditionalShippingOptionPriceAccessor
  currency: CurrencyInfo
  onRemove: (index: number) => void
  control: Control<CreateShippingOptionSchemaType>
}

const PriceRuleItem = ({
  index,
  accessor,
  currency,
  onRemove,
  control,
}: PriceRuleItemProps) => {
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onRemove(index)
  }

  return (
    <Accordion.Item
      value={getRuleValue(index)}
      className="bg-ui-bg-component shadow-elevation-card-rest rounded-lg"
    >
      <Accordion.Trigger asChild>
        <div className="flex w-full items-center justify-between p-3">
          <div>
            <AmountDisplay
              accessor={accessor}
              index={index}
              currency={currency}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <ConditionDisplay
              accessor={accessor}
              index={index}
              currency={currency}
            />
            <IconButton
              size="small"
              variant="transparent"
              className="text-ui-fg-muted hover:text-ui-fg-subtle focus-visible:text-ui-fg-subtle"
              onClick={handleRemove}
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
        </div>
      </Accordion.Trigger>
      <Accordion.Content className="text-ui-fg-subtle">
        <Divider variant="dashed" />
        <div className="grid grid-cols-2 items-center gap-x-2 p-3">
          <Text size="small" weight="plus">
            Shipping option price
          </Text>
          <Controller
            control={control}
            name={`${accessor}.${index}.amount`}
            render={({ field: { value, onChange, ...props } }) => {
              return (
                <CurrencyInput
                  symbol={currency.symbol_native}
                  code={currency.code}
                  value={value}
                  onValueChange={(_value, _name, values) =>
                    onChange(values?.float)
                  }
                  {...props}
                />
              )
            }}
          />
        </div>
        <Divider variant="dashed" />
        <div className="grid grid-cols-2 items-center gap-x-2 p-3">
          <Text size="small" weight="plus">
            Minimum cart total
          </Text>
          <Controller
            control={control}
            name={`${accessor}.${index}.gte`}
            render={({ field: { value, onChange, ...props } }) => {
              return (
                <CurrencyInput
                  symbol={currency.symbol_native}
                  code={currency.code}
                  value={value}
                  onValueChange={(_value, _name, values) =>
                    onChange(values?.float)
                  }
                  {...props}
                />
              )
            }}
          />
        </div>
        <Divider variant="dashed" />
        <div className="grid grid-cols-2 items-center gap-x-2 p-3">
          <Text size="small" weight="plus">
            Maximum cart total
          </Text>
          <Controller
            control={control}
            name={`${accessor}.${index}.lte`}
            render={({ field: { value, onChange, ...props } }) => {
              return (
                <CurrencyInput
                  symbol={currency.symbol_native}
                  code={currency.code}
                  value={value}
                  onValueChange={(_value, _name, values) =>
                    onChange(values?.float)
                  }
                  {...props}
                />
              )
            }}
          />
        </div>
      </Accordion.Content>
    </Accordion.Item>
  )
}

const AmountDisplay = ({
  accessor,
  index,
  currency,
}: {
  accessor: ConditionalShippingOptionPriceAccessor
  index: number
  currency: CurrencyInfo
}) => {
  const { control } = useFormContext<CreateShippingOptionSchemaType>()

  const amount = useWatch({
    control,
    name: `${accessor}.${index}.amount`,
  })

  if (amount === "" || amount === undefined) {
    return (
      <Text size="small" weight="plus">
        -
      </Text>
    )
  }

  const castAmount = castNumber(amount)

  return (
    <Text size="small" weight="plus">
      {getLocaleAmount(castAmount, currency.code)}
    </Text>
  )
}

const ConditionDisplay = ({
  accessor,
  index,
  currency,
}: {
  accessor: ConditionalShippingOptionPriceAccessor
  index: number
  currency: CurrencyInfo
}) => {
  const { control } = useFormContext<CreateShippingOptionSchemaType>()

  const gte = useWatch({
    control,
    name: `${accessor}.${index}.gte`,
  })

  const lte = useWatch({
    control,
    name: `${accessor}.${index}.lte`,
  })

  const renderCondition = () => {
    const castGte = gte ? castNumber(gte) : undefined
    const castLte = lte ? castNumber(lte) : undefined

    if (!castGte && !castLte) {
      return null
    }

    if (castGte && !castLte) {
      return (
        <>
          <Text size="small">If</Text>
          <Badge size="2xsmall">Cart total</Badge>
          <Text size="small">≥</Text>
          <Badge size="2xsmall">
            {getLocaleAmount(castGte, currency.code)}
          </Badge>
        </>
      )
    }

    if (!castGte && castLte) {
      return (
        <>
          <Text size="small">If</Text>
          <Badge size="2xsmall">Cart total</Badge>
          <Text size="small">≤</Text>
          <Badge size="2xsmall">
            {getLocaleAmount(castLte, currency.code)}
          </Badge>
        </>
      )
    }

    if (castGte && castLte) {
      return (
        <>
          <Text size="small">If</Text>
          <Badge size="2xsmall">Cart total</Badge>
          <Text size="small">is between</Text>
          <Badge size="2xsmall">
            {getLocaleAmount(castGte, currency.code)}
          </Badge>
          <Text size="small">and</Text>
          <Badge size="2xsmall">
            {getLocaleAmount(castLte, currency.code)}
          </Badge>
        </>
      )
    }

    return null
  }

  return (
    <div className="text-ui-fg-subtle flex items-center gap-x-1.5">
      {renderCondition()}
    </div>
  )
}
