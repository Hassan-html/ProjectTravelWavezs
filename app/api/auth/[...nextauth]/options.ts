import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/app/api/dbconfig/mongoseConfig";
import bcrypt from "bcryptjs";
import User from "@/app/api/models/userModel";
import { sendEmail } from "@/app/api/helpers/mailer/nodeMailerTransport";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        const { email, password } = credentials;
        console.log("This is from credentials: " + credentials);
        await connect();
        // validation
        try {
          const user = await User.findOne({ email: email });
          console.log("This is the user found: " + user);

          if (!user.isVerified) {
            const mail = await sendEmail(email, user._id, "verify");

            throw new Error(
              "User is not verified \n We sent you mail verify it"
            );
          } else if (!user) {
            throw new Error("No such user exist");
          } else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
              console.log("This is the user returned: " + user);
              return user;
            } else {
              throw new Error("Password incorrect");
            }
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    // modifiying token
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.isAdmin = user.isAdmin;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          _id: token._id?.toString(),
          isVerified: token.isVerified,
          username: token.username,

          isAdmin: token.isAdmin,
          email: token.email,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/pages/public/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
