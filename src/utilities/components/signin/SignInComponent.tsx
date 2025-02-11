'use client'

import { signIn } from "next-auth/react";
import { useState } from "react";

const SignInComponent = () => {

const [message,setMessage]=useState('')


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Extract user input (email and password) from the form
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      // Authenticate user with NextAuth using credentials provider
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Prevent automatic redirect after login
      });

      console.log("Login Result:", result); // Debugging: Log the response from signIn

      // Check if authentication failed
      if (result?.error) {
        setMessage("Invalid credentials. Please try again.");
      } else {
        setMessage("Login Successful! Redirecting...");

        setTimeout(() => {
          window.location.href = "/"; // Redirect to homepage
        }, 2000);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Sign in</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 bg-gray-700 shadow-lg p-6 rounded-lg w-80"
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="p-2 text-black rounded-md"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="p-2 text-black rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600"
        >
          Login
        </button>
        {message && <p className="text-green-500">{message}</p>}
      </form>
    </div>
  );
};

export default SignInComponent;
