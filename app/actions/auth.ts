'use server'

import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { LoginCredentials } from "@/types/CredentialsLogin"


const API_URL = process.env.API_URL ?? 'http://localhost:3001'

export const logIn = async (loginUser: LoginCredentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginUser),
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export const quote = async (payload: QuotePayload) => {
  try {
    const session = await getServerSession(authOptions)
    if (session) {
      const response = await fetch(`${API_URL}/quote`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
      })
      const res = await response.json()
      return res
    }
  } catch (e) {
    throw e
  }
}