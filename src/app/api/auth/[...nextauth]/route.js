import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/lib/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("=== AUTH ATTEMPT ===");
        console.log("Email received:", JSON.stringify(credentials.email));
        console.log("Password received:", JSON.stringify(credentials.password));
        console.log("ADMIN_EMAIL:", JSON.stringify(process.env.ADMIN_EMAIL));
        console.log("ADMIN_PASSWORD:", JSON.stringify(process.env.ADMIN_PASSWORD));
        console.log("Email match:", credentials.email === process.env.ADMIN_EMAIL);
        console.log("Pass match:", credentials.password === process.env.ADMIN_PASSWORD);

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        if (
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          console.log("=== ADMIN LOGIN SUCCESS ===");
          return {
            id: "admin-id",
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            role: "admin",
          };
        }

        console.log("=== NOT ADMIN, TRYING REGULAR USER ===");

        const user = await getUserByEmail(credentials.email);
        if (!user) throw new Error("No account found with this email");

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) throw new Error("Incorrect password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/admin-access",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };