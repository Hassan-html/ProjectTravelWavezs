import "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    username?: string;
    isVerified?: boolean;
    isAdmin?: boolean;
    email?: string;
  }
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      username?: string;

      isAdmin?: boolean;
      email?: string;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    username?: string;

    isAdmin?: boolean;
    email?: string;
  }
}
