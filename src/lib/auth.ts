import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {prisma} from './prisma'
import CredentialsProvider from "next-auth/providers/credentials";

import Credentials from "next-auth/providers/credentials"
const users=[
{
  id:'1',name:'uzair',email:'uzairaslam990@gmail.com',password:'123321'
},
{
  id:'2',name:'ali',email:'ali@gmail.com',password:'112233'
}
]
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret:process.env.AUTH_SECRET,
  session:{strategy:'jwt'},
  providers: [
    
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if(!credentials|| !credentials.password||!credentials.email)
        {
          return null
        }
        const user=users.find((item)=>item.email===credentials.email)
        if(user?.password===credentials.password){
          return user
        }
        return null
      }
    })
  ]
})