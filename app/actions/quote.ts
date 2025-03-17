'use server'

import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'

const API_URL = process.env.API_URL || 'http://localhost:3001'

export const createQuote = async (payload: QuotePayload) => {
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

export const findQuote = async (id: string) => {
  try {
    const session = await getServerSession(authOptions)
    if (session) {
      const response = await fetch(`${API_URL}/quote/${id}`, {
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