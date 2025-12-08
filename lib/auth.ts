import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Fake credentials provider (only used when invoked from client)
    CredentialsProvider({
      id: "credentials",
      name: "Email (Fake)",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase();
        if (!email) return null;

        const user = await prisma.user.upsert({
          where: { email },
          update: { emailVerified: new Date() },
          create: {
            email,
            emailVerified: new Date(),
            profileDone: false,
          },
        });

        // Return minimal user object NextAuth expects
        return { id: user.id, email: user.email ?? null };
      },
    }),
    EmailProvider({
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier, url }) {
        const resendApiKey = process.env.RESEND_API_KEY!;
        const html = `
          <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.4;color:#0f172a">
            <h2 style="margin:0 0 8px 0">Sign in to SportHive Connect</h2>
            <p style="margin:0 0 20px 0">Click the link below to sign in:</p>
            <a href="${url}" style="display:inline-block;padding:12px 18px;background:#ff7a00;color:#fff;border-radius:8px;text-decoration:none;">Sign in</a>
            <p style="margin-top:18px;font-size:13px;color:#475569">If you didn't request this email, ignore it.</p>
          </div>
        `;

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM,
            to: identifier,
            subject: "Your SportHive sign-in link",
            html,
          }),
        });
      },
    }),

    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: { 
    strategy: "jwt" 
    // strategy: "database",
  },

  callbacks: {
    async jwt({ token, user }) {
      // On first login, merge user info into token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      // Expose token into session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};

export async function isUserAuthenticated() {
  return !!authOptions.session;
};

export async function hasCompletedOnboarding(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { onboardingCompleted: true }
  });
  return user?.onboardingCompleted ?? false;
};

