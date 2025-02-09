import { signIn } from "next-auth/react"; // Importing NextAuth's sign-in function

/**
 * Handles user login when the form is submitted.
 
 */
export const handleLogin = async (e: any) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Extract user input (email and password) from the form
  const email = e.target.email.value;
  const password = e.target.password.value;

  // Authenticate user with NextAuth using credentials provider
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false, // Prevent automatic redirect after login
  });

  console.log("Login Result:", result); // Debugging: Log the response from signIn

  // Check if authentication failed
  if (result?.error) {
    console.log("Invalid credentials. Please try again."); // Log error if credentials are incorrect
  } else {
    console.log("Login Successful! Fetching session...");

    /**
     * (Optional) Fetch and use session after login:
     * Uncomment the following lines if session handling is required.
     */

    // const session = await getSession(); // Get the updated session after login

    // if (session) {
    //   alert(`Welcome dear: ${session?.user.name}`); // Show a welcome alert
    // }

    // Redirect user to home page after a short delay
    setTimeout(() => {
      window.location.href = "/"; // Redirect to homepage
    }, 2000);
  }
};
