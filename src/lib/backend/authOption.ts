import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { Adapter } from "next-auth/adapters";

const authOption: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
        },
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "MyLogin",
      id: "credentials",
      name: "MyLogin",
      credentials: {
        username: { label: "email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        if (!credentials) {
          return null;
        }
        try {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/Myauth/Login`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            }
          );
          const data = await res.json();
          // If no error and we have user data, return it
          if (!res.ok) {
            const error = data.message || "Invalid credentials";
            return Promise.reject(new Error(error));
          }
          // Return the user data for successful auth
          return data.user;
        } catch (error) {
          console.log("error : ", error);
        try {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/Myauth/Login`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            }
          );
          const data = await res.json();
          // If no error and we have user data, return it
          if (!res.ok) {
            const error = data.message || "Invalid credentials";
            return Promise.reject(new Error(error));
          }
          // Return the user data for successful auth
          return data.user;
        } catch (error) {
          console.log("error : ", error);
        }
      },
    }),
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async jwt({ token, user }) {
      // Add user.id to token on initial sign-in
      if (user) {
        token.id = user.id; // No type error now
      }
      return token;
    },
    async session({ session, token }) {
      // Ensure session.user exists before setting properties
      if (session?.user) {
        session.user.id = token.id as string; // Use the id from token
      }
      return session;
    },
  },
};

export default authOption;
