'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import Spinner from '../icon/spinner'
import { EyeButton } from './eye'
import { signUp } from '@/actions/auth'
import { SignUp } from '@/types/SignUp'

export default function SignUpForm() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const toggleVisibility = () => setIsVisible(!isVisible)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = handleSubmit(async (formData) => {
    setError('')
    try {
      const { statuscode } = await signUp(formData as SignUp)
      if (statuscode === 201) {
        router.push("/auth/login")
      } else {
        setError('No se pudo crear la cuenta!')
      }
    } catch (e) {
      setError('No se pudo crear la cuenta!')
    }
  })

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex flex-col gap-5">
        <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
          <Input
            autoFocus
            label="Nombre"
            isInvalid={!!errors.first_name}
            errorMessage={errors.first_name?.message?.toString()}
            variant="bordered"
            radius='full'
            fullWidth
            onFocus={() => setError('')}
            {...register('first_name', {
              required: {
                value: true,
                message: 'El nombre es requerido.',
              }
            })}
          />
          <Input
            label="Apellido"
            isInvalid={!!errors.last_name}
            errorMessage={errors.last_name?.message?.toString()}
            variant="bordered"
            radius='full'
            fullWidth
            onFocus={() => setError('')}
            {...register('last_name', {
              required: {
                value: true,
                message: 'El apellido es requerido.',
              }
            })}
          />
        </div>
        <Input
          label="Correo electrónico"
          isInvalid={!!errors.email}
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
          description="La contraseña debe tener entre 4 y 20 caracteres."
          label="Contraseña"
          radius='full'
          fullWidth
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message?.toString()}
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
        {!!error && <div className='flex w-full text-danger'>
          {error}
        </div>}
        <Button
          fullWidth
          isLoading={isSubmitting}
          type="submit"
          size="lg"
          color='primary'
          radius="full"
          spinner={<Spinner />}
        >
          Crear
        </Button>
      </div>
    </form>
  )
}
