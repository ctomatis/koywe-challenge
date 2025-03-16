import { Session as NextAuthSession } from 'next-auth'
import { DefaultUser } from 'next-auth';

export type LoginCredentials = {
    email: string
    password: string
}

export type User = {
    access_token: string
    image?: string
    id: string
    email: string
    first_name: string
    last_name: string
}

declare module 'next-auth' {
    interface Session extends NextAuthSession {
        access_token: string
        user: {
            image?: string
            id: string
            first_name?: string
            last_name?: string
            email?: string
        }
    }

    interface User extends DefaultUser {
        access_token: string
    }
}
