import { Session } from 'next-auth';
import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'

export default NextAuth({
  providers: [
    
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
   
  ],
  callbacks: {
    async session(session, user) {

      session.usernameExists = await checkUsernameExists(session.session.user.email);
      return session
    },

  },
  secret: process.env.NEXTAUTH_SECRET, // Use a random string for the secret
})

const checkUsernameExists = async (email) => {
  const verifyEmail = ["chanatan.melmel@gmail.com", "rayongcd@gmail.com"]
  if (verifyEmail.includes(email)) {
    return true
  }
  else return false
}