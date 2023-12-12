import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, Session } from "next-auth";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any, req) {
        try {
          const { email } = credentials;

          const user = await axios
            .get(`https://jsonplaceholder.typicode.com/users`, {
              params: {
                email,
              },
            })
            .then(({ data }) => {
              return data[0];
            });

          console.log("user", user);

          if (user) {
            const { _id, name, email } = user.data;
            return { _id, name, email } as any;
          } else {
            throw new Error("Email  Incorrect..!");
          }
        } catch (error: any) {
          throw new Error(error?.message);
        }
      },
    }),
  ],

  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },

    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          user,
        };
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        return { ...session, user: token.user as Session["user"] };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
