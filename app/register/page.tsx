"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { app } from "@/lib/firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setError("");

    if (password !== confirmation) {
      setError("Passwords don't match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(getAuth(app), email, password);
      router.push("/login");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="flex items-center space-x-2 mb-12">
        <img src="solar_link-circle.png" alt="Icon" className="w-8 h-8" />
        <h1 className="text-xl font-bold leading-tight tracking-tight text-text md:text-2xl ">
          devlinks
        </h1>
      </div>
      <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-text md:text-2xl">
            Create account
          </h1>
          <p>Let's get you started sharing your links!</p>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-text"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="bg-gray-50 border border-border text-text sm:text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-inputBorder focus:outline-none focus:bg-white focus:shadow block w-full p-2.5 transition-shadow duration-200"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-text"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Enter your password"
                className="bg-gray-50 border border-border text-text sm:text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-inputBorder focus:outline-none focus:bg-white focus:shadow block w-full p-2.5 transition-shadow duration-200"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-text"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                id="confirm-password"
                placeholder="Confirm your password"
                className="bg-gray-50 border border-border text-text sm:text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-inputBorder focus:outline-none focus:bg-white focus:shadow block w-full p-2.5 transition-shadow duration-200"
                required
              />

            </div>
            {error && (
              <div
                className="bg-red-100 border border-error text-error px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <button
              type="submit"
              className="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-text">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
