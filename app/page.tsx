
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeField, setActiveField] = useState<"email" | "password" | null>(null);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setActiveField(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.trim().toLowerCase().endsWith("@gmail.com")) {
      setError("Please use a valid @gmail.com email address.");
      return;
    }

    if (password.length <= 8) {
      setError("Password must be more than 8 characters.");
      return;
    }

    sessionStorage.setItem("loginEmail", email.trim());
    sessionStorage.setItem("loginPassword", password);

    router.push("/dashboard");
  }

  function chooseSavedEmail() {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) setEmail(savedEmail);
    setActiveField(null);
  }

  function chooseSavedPassword() {
    const savedPassword = localStorage.getItem("rememberedPassword");
    if (savedPassword) setPassword(savedPassword);
    setActiveField(null);
  }

  return (
    <main className="login-page">
      <form
        className="login-card"
        onSubmit={handleLogin}
        autoComplete="off"
      >
        <div className="profile-icon" aria-hidden="true">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="32" r="19" />
            <path d="M12 91c0-23 15-36 38-36s38 13 38 36v3H12z" />
          </svg>
        </div>

        <h1>MEMBER LOGIN</h1>

        <div className="form-fields">
          <label htmlFor="email">Email</label>

          <div className="credential-field">
            <input
              id="email"
              name="login-email"
              type="text"
              inputMode="email"
              placeholder="Enter your Gmail address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onFocus={() => setActiveField("email")}
              autoComplete="off"
            />

            {activeField === "email" &&
              localStorageAvailable() && (
                <button
                  className="saved-suggestion"
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={chooseSavedEmail}
                >
                  <span className="suggestion-icon">✉</span>
                  {typeof window !== "undefined"
                    ? localStorage.getItem("rememberedEmail") || ""
                    : ""}
                </button>
              )}
          </div>

          <label htmlFor="password">Password</label>

          <div className="credential-field">
            <input
              id="password"
              name="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onFocus={() => setActiveField("password")}
              autoComplete="new-password"
            />

            {activeField === "password" &&
              localStorageAvailable() && (
                <button
                  className="saved-suggestion"
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={chooseSavedPassword}
                >
                  <span className="suggestion-icon">🔑</span>
                  <span>Use saved password</span>
                </button>
              )}
          </div>
        </div>

        <button className="login-button" type="submit">
          LOGIN
        </button>

        <p className="error-message" role="alert">
          {error}
        </p>
      </form>
    </main>
  );
}

function localStorageAvailable() {
  if (typeof window === "undefined") return false;

  return (
    localStorage.getItem("rememberedEmail") !== null ||
    localStorage.getItem("rememberedPassword") !== null
  );
}
