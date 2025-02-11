import { signIn } from "next-auth/react"; 

export async function handleCredentialsSignin({ email, password }: { email: string, password: string }) {
    try {
        // Call signIn with credentials provider
        const result = await signIn("credentials", { email, password, redirect: false });

        // Log the result to help with debugging
        console.log("SignIn result:", result);

        // If result is falsy or contains an error, return an error message
        if (result?.error) {
            return { message: 'Invalid credentials' }; // Custom error message
        }

        // Successful sign-in (you can redirect or set a state if needed)
        return { message: '' }; // Empty message indicates success
    } catch (error) {
        console.error("Error during login:", error);
        return { message: 'An unexpected error occurred. Please try again later.' };
    }
}
