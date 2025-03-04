import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {prisma} from './prisma'
import CredentialsProvider from "next-auth/providers/credentials";
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
  ]
})