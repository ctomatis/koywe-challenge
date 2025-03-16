import { NextAuthOptions } from 'next-auth'
import { logIn } from './actions/auth'
import { LoginCredentials, User } from './types/CredentialsLogin'
import CrendentialsProvider from 'next-auth/providers/credentials'

/*
{
      userId: 1,
      username: 'john@gmail.com',
      password: 'changeme',
    },
*/
export const authOptions: NextAuthOptions = {
    providers: [
        CrendentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                let loginUser: LoginCredentials = {
                    email: credentials?.email as string,
                    password: credentials?.password as string,
                }
                try {
                    const { access_token } = await logIn(loginUser)
                    if (access_token) {
                        const user: User = {
                            access_token: access_token,
                            id: "id",
                            email: loginUser.email,
                            first_name: "first_name",
                            last_name: "last_name",
                        }
                        return user
                    }
                } catch (error) { }
                return null
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, credentials }) {
            if (account?.provider === 'credentials') {
                return true
            }
            return false
        },
        async jwt({ token, user }) {
            if (user) {
                const userToken = user as User
                token.accessToken = userToken.access_token
                token.id = userToken.id
                token.email = userToken.email
                token.first_name = userToken.first_name
                token.last_name = userToken.last_name
            }
            return token
        },
        async session({ session, token }) {
            session.access_token = token.accessToken as string
            session.user = {
                id: token.id as string,
                email: token.email as string,
                first_name: token.first_name as string,
                last_name: token.last_name as string,
            }
            return session
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60
    },
    pages: {
        signIn: '/auth/login',
        error: "/auth/login"
    },
}
