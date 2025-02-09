// Importing necessary modules from NextAuth for authentication handling
import NextAuth, { Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Hardcoded list of users for demonstration purposes (in production, users should be fetched from a database)
const users = [
  { id: "1", name: "Admin", email: "admin123@gmail.com", password: "test123" },
  { id: "2", name: "John Doe", email: "test123@gmail.com", password: "password123" },
];

// NextAuth configuration to handle authentication and session management
export const { handlers, signIn, signOut, auth } = NextAuth({
  // Defining authentication providers (here using credentials-based authentication)
  providers: [
    Credentials({
      // Configuring credentials fields to be used for authentication
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },

      // Function to authorize the user based on provided credentials
      async authorize(credentials) {
        // Check if email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password are required"); // Throw error if any credential is missing
        }

        // Search for the user in the hardcoded list of users
        const user = users.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        // If no matching user is found, throw an error
        if (!user) {
          throw new Error("Invalid email or password");
        }

        // If user is found, log details and return user object for session creation
        console.log(user);
        console.log("Login Successful:", user.name);

        return user; // Returning user object after successful login
      },
    }),
  ],

  // Custom pages configuration (here, the sign-in page is customized)
  pages: {
    signIn: "/sign-in", // Path to custom sign-in page
  },

  // Callbacks to customize JWT and session behavior
  callbacks: {
    // Callback to add custom fields to JWT (JSON Web Token) for user details
    jwt: ({ token, user }) => {
      if (user) {
        // Add user information to the JWT token for use in subsequent requests
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.emailVerified = user.emailVerified ? new Date() : null; // Store email verification status as Date or null
      }
      return token; // Return the modified token with user data
    },

    // Callback to add custom fields to the session object, which holds user session data
    session: ({ session, token }) => {
      if (token) {
        // Add token data to session user object
        session.user = {
          id: token.id as string ?? "", // Ensure id is available in session
          email: token.email as string ?? "", // Ensure email is available in session
          name: token.name as string ?? "", // Ensure name is available in session
          emailVerified: token.emailVerified ? new Date() : null, // Set email verification status as Date or null
        };
      }
      return session; // Return the modified session object with user data
    },
  },

  // Session configuration to specify how sessions are handled
  session: {
    strategy: "jwt", // Use JWT strategy to manage sessions (stateless session)
  },

  // Secret key for JWT signing, ensure it is stored securely (in environment variables)
  secret: process.env.NEXTAUTH_SECRET, // Ensure you have a secret key defined in your .env file
});
