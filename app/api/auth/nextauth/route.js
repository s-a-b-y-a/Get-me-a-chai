import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/app/models/User";
import connectDB from "@/db/connectDB";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (['github', 'google'].includes(account.provider)) {
          await connectDB();

          const currentUser = await User.findOne({ email: user.email });
          if (!currentUser) {
            const newUser = await User.create({
              email: user.email,
              username: user.email.split("@")[0],
            });
            console.log('New user created:', newUser);
          } else {
            console.log('User already exists:', currentUser);
          }
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async session({ session }) {
      try {
        await connectDB();

        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.name = dbUser.username;
        }
      } catch (error) {
        console.error("Error in session callback:", error);
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

// Export named HTTP methods
export const GET = handler;
export const POST = handler;
