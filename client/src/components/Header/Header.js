import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
    const { user } = useContext(AuthContext);
    return (
        <header>
            <h1>
                <Link className="home" to="/">
                    GamesPlay
                </Link>
            </h1>
            <nav>
                {user.user?.username && <span>{user.user?.username}</span>}
                <Link to="/catalog">All games</Link>
                {user.user?.username ? (
                    <div id="user">
                        <Link to="/create">Create Game</Link>
                        <Link to="/logout">Logout</Link>
                    </div>
                ) : (
                    <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};
