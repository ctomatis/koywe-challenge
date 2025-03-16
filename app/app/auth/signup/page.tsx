import { Card, CardBody } from "@heroui/card";
import type { Metadata } from 'next'
import SignUpForm from "@/components/signup/form";

export const metadata: Metadata = {
  title: 'Ingresá a tu cuenta',
  description: 'Ingresá a tu cuenta',
}

export default function LoginPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <Card className="lg:w-[450px]" radius="sm" shadow="lg" fullWidth>
        <CardBody className="gap-5 flex flex-col p-6 w-full">
          <h1 className="font-medium text-xl">Creá tu cuenta</h1>
          <SignUpForm />
        </CardBody>
      </Card>
    </div>
  )
}