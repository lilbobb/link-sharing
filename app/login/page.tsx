"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    try {
      const credential = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      const idToken = await credential.user.getIdToken();

      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      router.push("/");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="flex items-center space-x-2 mb-12">
        <img src="solar_link-circle.png" alt="Icon" className="w-8 h-8" />
        <h1 className="text-xl font-bold leading-tight tracking-tight text-text md:text-2xl ">
          devlinks
        </h1>
      </div>
      <div className="w-full bg-background rounded-lg  md:mt-0 sm:max-w-md ">
        <div className="bg-white p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-text md:text-2xl">
            Login
          </h1>
          <p className="text-text">Add your details below to get back into the app</p>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-text"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="name@company.com"
                className="bg-gray-50 border border-border text-text sm:text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-inputBorder focus:outline-none focus:bg-white focus:shadow block w-full p-2.5 transition-shadow duration-200"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-text "
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
              Enter
            </button>
            <p className="text-sm font-light text-text">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:underline "
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>

  );
}