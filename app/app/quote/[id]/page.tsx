"use client"

import { Card, CardBody } from "@heroui/card";
import { useState, useEffect, useCallback, use } from "react";
import { findQuote } from "@/actions/quote";
import { Item } from "@/types/Item";


export default function QuotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [item, setItem] = useState<Item | undefined>()

  const fetchQuote = useCallback(async () => {
    try {
      const res = await findQuote(id)
      setItem(res as Item)
    } catch (e) { }
  }, [id])

  useEffect(() => {
    fetchQuote()
  }, [fetchQuote])

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <Card className="lg:w-[450px]" radius="sm" shadow="lg" fullWidth>
        <CardBody className="gap-5 flex flex-col p-6 w-full">
          <h1 className="font-medium text-xl">Cotización</h1>
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </CardBody>
      </Card>
    </div>
  );
}
