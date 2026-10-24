
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [rememberEmail, setRememberEmail] = useState("no");

  function handleLogout() {
    if (rememberEmail === "yes") {
      const email = sessionStorage.getItem("loginEmail");
      const password = sessionStorage.getItem("loginPassword");

      if (email && password) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
      }
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }

    sessionStorage.removeItem("loginEmail");
    sessionStorage.removeItem("loginPassword");

    setShowLogoutModal(false);

    window.location.replace("/");
  }

  return (
    <main className="dashboard-page">
      <nav className="dashboard-nav">
        <button
          className="nav-button"
          type="button"
          onClick={() => alert("Settings are not available yet.")}
        >
          SETTINGS
        </button>

        <button
          className="nav-button"
          type="button"
          onClick={() => {
            setRememberEmail("no");
            setShowLogoutModal(true);
          }}
        >
          LOG OUT
        </button>
      </nav>

      <section className="welcome-panel">
        <h1>Welcome!</h1>

        <div className="welcome-content">
          <div className="welcome-lines" aria-hidden="true">
            <div className="line line-one"></div>
            <div className="line line-two"></div>
            <div className="line line-three"></div>
          </div>

          <div className="welcome-image" aria-hidden="true"></div>
        </div>
      </section>

      {showLogoutModal && (
        <div className="modal-overlay">
          <section
            className="logout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
          >
            <p id="logout-title">
              Do you want to remember your email and password?
            </p>

            <div className="remember-options">
              <label>
                <input
                  type="radio"
                  name="remember"
                  value="yes"
                  checked={rememberEmail === "yes"}
                  onChange={() => setRememberEmail("yes")}
                />
                Yes
              </label>

              <label>
                <input
                  type="radio"
                  name="remember"
                  value="no"
                  checked={rememberEmail === "no"}
                  onChange={() => setRememberEmail("no")}
                />
                No
              </label>
            </div>

            <button
              className="confirm-logout"
              type="button"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
