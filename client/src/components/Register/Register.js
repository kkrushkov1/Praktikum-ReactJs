import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from "../../services/authService";
import { AuthContext } from "../../contexts/AuthContext";

export const Register = () => {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return;
        }

        const registerInfo = {
            username,
            email,
            password,
        };

        const authData = await authService.register(registerInfo);
        userLogin(authData);
        navigate("/");
    };

    const usernameChangeHandler = (e) => {
        setUsername(e.target.value);
    };

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };
    const confirmPasswordChangeHandler = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Register</h1>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={usernameChangeHandler}
                        value={username}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                        onChange={emailChangeHandler}
                        value={email}
                    />
                    <label htmlFor="pass">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        onChange={passwordChangeHandler}
                        value={password}
                    />
                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        onChange={confirmPasswordChangeHandler}
                        value={confirmPassword}
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        value="Register"
                    />
                </div>
            </form>
        </section>
    );
};
