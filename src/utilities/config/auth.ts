import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const users = [
  { id: "1", name: "Admin", email: "admin123@gmail.com", password: "test123" },
  {
    id: "2",
    name: "John Doe",
    email: "test123@gmail.com",
    password: "password123",
  },
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password are required");
        }

        const user = users.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
          throw new Error("Invalid email or password");
        }

        console.log(user);
        console.log("Login Successful:", user.name);

        return user;
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.emailVerified = user.emailVerified ? new Date() : null;
      }
      return token;
    },

    session: ({ session, token }) => {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          emailVerified: token.emailVerified ? new Date() : null,
        };
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
});
