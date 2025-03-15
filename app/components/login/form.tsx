'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import Spinner from '../icon/spinner'
import { EyeButton } from './eye'

export default function LoginForm() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const toggleVisibility = () => setIsVisible(!isVisible)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = handleSubmit(async (formData) => {
    setIsDisabled(true)
    const res = await signIn('credentials', {
      email: formData.email.toLowerCase(),
      password: formData.password,
      redirect: false,
    })


    if (res?.ok) {
      router.push("/quote")
    } else {
      setIsDisabled(false)
      setError('El correo y/o la contraseña son incorrectos.')
      reset()
    }
  })

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex flex-col gap-6">
        <Input
          autoFocus
          label="Correo electrónico"
          isInvalid={!!errors.email || error.length > 0}
          errorMessage={errors.email?.message?.toString()}
          variant="bordered"
          radius='full'
          type="email"
          fullWidth
          onFocus={() => setError('')}
          {...register('email', {
            required: {
              value: true,
              message: 'El correo electrónico es requerido.',
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'El correo electrónico no es válido.',
            },
          })}
        />
        <Input
          label="Contraseña"
          radius='full'
          fullWidth
          isInvalid={!!errors.password || error.length > 0}
          errorMessage={errors.password?.message?.toString() || error}
          {...register('password', {
            required: {
              value: true,
              message: 'La contraseña es requerida.',
            },
            minLength: {
              value: 4,
              message: 'La contraseña es requerida.',
            },
            maxLength: {
              value: 20,
              message: 'La contraseña es requerida.',
            }
          })}
          variant="bordered"
          type={isVisible ? 'text' : 'password'}
          endContent={<EyeButton open={isVisible} onClick={toggleVisibility} />}
        />
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
          Iniciar sesión
        </Button>
      </div>
    </form>
  )
}
