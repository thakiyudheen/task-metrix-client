import { googleSignupAction } from "@/store/actions/auth/googleSignupAction";
import { isUserExist } from "@/store/actions/auth/userExistOauth";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }): Promise<boolean> {
      
      console.log("User signing in____________", user);
      const isUser =async ( )=>{
        const response =await isUserExist(user?.email||"")
        if(response){
          return true
        }else{
         const response =await googleSignupAction(user)
         if(response){
          return true
         }
        }
      }
      isUser()
      return true; 
    },
    async session({ session }): Promise<typeof session> {
      
      console.log("Session data________", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, 
};

export default NextAuth(authOptions);
