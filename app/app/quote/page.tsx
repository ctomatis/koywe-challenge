"use client"

import { Card, CardBody } from "@heroui/card";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { Select, SelectItem } from "@heroui/select";
import Spinner from "@/components/icon/spinner";
import { createQuote } from "@/actions/auth";

interface Item {
  _id: string
  amount: number
  from: string
  to: string
  rate: number
  createdAt: string
  expiresAt: string
  convertedAmount: number
}

export default function QuotePage() {
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const from: string[] = ["ARS", "CLP", "MXN", "USDC", "BTC", "ETH"]
  const to: string[] = ["ETH", "USDC", "CLP", "USD", "ARS"]

  const [item, setItem] = useState<Item>()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const watchFrom = watch("from")

  const onSubmit = handleSubmit(async (formData) => {
    setIsDisabled(true)
    try {
      const { statuscode, item } = await createQuote(formData as QuotePayload)
      if (statuscode === 201) {
        setItem(item as Item)
      }
    } catch (e) {

    } finally {
      //setIsDisabled(!isDisabled)
      //reset()
    }
  })

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <Card className="lg:w-[450px]" radius="sm" shadow="lg" fullWidth>
        <CardBody className="gap-5 flex flex-col p-6 w-full">
          <h1 className="font-medium text-xl">Cotizar</h1>
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
            <div className="flex flex-col">
              <Input
                label="Ingresá el monto"
                isInvalid={!!errors.amount}
                errorMessage={errors.amount?.message?.toString()}
                variant="bordered"
                radius='full'
                type="number"
                inputMode="numeric"
                fullWidth
                {...register('amount', {
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: 'El monto debe ser mayor a 0.'
                  },
                  max: {
                    value: 1e10,
                    message: 'El monto no debe superar los 1e10.'
                  },
                  required: {
                    value: true,
                    message: 'El monto es requerido.',
                  }
                })}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Select
                isInvalid={!!errors.from}
                errorMessage={errors.from?.message?.toString()}
                label="From"
                radius='full'
                placeholder="Seleccionar..."
                variant="bordered"
                {...register('from', {
                  required: {
                    value: true,
                    message: 'Requerido.',
                  }
                })}
              >
                {from.map((f) => <SelectItem key={f}>{f}</SelectItem>)}
              </Select>
              <Select
                isDisabled={!watchFrom}
                isInvalid={!!errors.to}
                errorMessage={errors.to?.message?.toString()}
                label="To"
                placeholder="Seleccionar..."
                radius='full'
                variant="bordered"
                {...register('to', {
                  required: {
                    value: true,
                    message: 'Requerido.',
                  }
                })}
              >
                {to.filter(elm => elm !== watchFrom).map(f => <SelectItem key={f}>{f}</SelectItem>)}
              </Select>
            </div>
            {item?._id && <div className="flex flex-col w-full items-center">
              <p>{item.to} {item.convertedAmount}</p>
            </div>}
            <Button
              fullWidth
              isDisabled={isDisabled}
              isLoading={isSubmitting}
              type="submit"
              size="lg"
              color='primary'
              radius="full"
              spinner={<Spinner />}
            >
              Calcular
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
