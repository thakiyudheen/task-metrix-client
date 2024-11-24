import { googleSignupAction } from "@/store/actions/auth/googleSignupAction";
import { isUserExist } from "@/store/actions/auth/userExistOauth";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, account, user }) {

      if (account && user) {
        
        token.accessToken = account.access_token;
        return token;
      }

      
      return token;
    },
    async signIn({ user, account }) {
      try {
        if (!user?.email) {
          return false; 
        }

        
        const existingUser = await isUserExist(user.email);

        if (existingUser) {
          
          if (account) {
            account.access_token = existingUser.token;
          }
          return true; 
        }

        
        const signupResponse = await googleSignupAction(user);

        if (signupResponse) {
          if (account) {
            account.access_token = signupResponse.token;
          }
          return true; 
        }

        return false; 
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async session({ session, token }) {
      session.token = (token as JWT).accessToken;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET, 
  pages: {
    signIn: "/auth/signin", 
    error: "/auth/error" 
  },
  debug: process.env.NODE_ENV === "development", 
};

export default function auth(req: any, res: any) {
  return NextAuth(req, res, authOptions);
}
