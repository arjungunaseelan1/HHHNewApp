import React from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/home"); 
    };

    return (
        <div className={styles['login-container']}>
            <div className={styles['login-card']}>
                <div className={styles['login-header']}>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account</p>
                </div>
                
                <form onSubmit={handleLogin}>
                    <div className={styles['input-group']}>
                        <input 
                            type="text" 
                            className={styles['login-input']} 
                            placeholder="Email address"
                            required 
                        />
                    </div>
                    <div className={styles['input-group']}>
                        <input 
                            type="password" 
                            className={styles['login-input']} 
                            placeholder="Password"
                            required 
                        />
                    </div>
                    
                    <button type="submit" className={styles['login-button']}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;