'use server'

import { LoginCredentials } from "@/types/CredentialsLogin"
import { SignUp } from '@/types/SignUp'

const API_URL = process.env.API_URL || 'http://localhost:3001'

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

export const signUp = async (user: SignUp) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    const data = await response.json()
    return data
  } catch (e) {
    throw e
  }
}

