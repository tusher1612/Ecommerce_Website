/**
 * SignInComponent provides a login form where users can enter their email and password.
 * It uses NextAuth's `signIn` function to authenticate users with credentials.
 * On successful login, the user is redirected to the homepage.
 * If authentication fails, an error message is displayed.
 */

"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

const SignInComponent = () => {
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("Login Result:", result);

      if (result?.error) {
        setMessage("Invalid credentials. Please try again.");
      } else {
        setMessage("Login Successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
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
  );
};

export default SignInComponent;
