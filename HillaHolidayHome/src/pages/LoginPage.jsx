import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    // Form states
    const [user_name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Email, setEmail] = useState("");

    // Status states
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const endpoint = isLogin ? "/api/login" : "/api/signup";

        // Prepare payload
        const payload = isLogin
            ? { user_name, password }
            : { Email, user_name, password };

        try {
            // Replace the URL 'https://hhhnewapp-1.onrender.com' with your actual backend domain/port
            const response = await fetch(`https://hhhnewapp-1.onrender.com${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                // Attempt to get backend error message
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || "Authentication failed. Please try again.");
            }

            const data = await response.json();

            // Example: Store the JWT token to local storage
            // localStorage.setItem("token", data.token);

            // Navigate to profile on success
            navigate("/profile");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles['login-container']}>
            <div className={styles['login-card']}>
                <div className={styles['tab-container']}>
                    <button
                        className={`${styles['tab-button']} ${isLogin ? styles['active-tab'] : ''}`}
                        onClick={() => { setIsLogin(true); setError(""); }}
                        type="button"
                    >
                        Sign In
                    </button>
                    <button
                        className={`${styles['tab-button']} ${!isLogin ? styles['active-tab'] : ''}`}
                        onClick={() => { setIsLogin(false); setError(""); }}
                        type="button"
                    >
                        Sign Up
                    </button>
                </div>

                <div className={styles['login-header']}>
                    <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                    <p>{isLogin ? 'Sign in to your account' : 'Sign up for a new account'}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div style={{ color: '#ef4444', marginBottom: '15px', fontSize: '14px', fontWeight: '500' }}>
                            {error}
                        </div>
                    )}

                    {!isLogin && (
                        <div className={styles['input-group']}>
                            <input
                                type="email"
                                className={styles['login-input']}
                                placeholder="Email Address"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className={styles['input-group']}>
                        <input
                            type="text"
                            className={styles['login-input']}
                            placeholder={isLogin ? "User Name" : "Choose a User Name"}
                            value={user_name}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles['input-group']}>
                        <input
                            type="password"
                            className={styles['login-input']}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles['login-button']} disabled={isLoading}>
                        {isLoading
                            ? (isLogin ? 'Signing In...' : 'Signing Up...')
                            : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;