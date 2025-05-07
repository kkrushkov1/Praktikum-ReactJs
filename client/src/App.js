import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as gameService from "./services/gameService";
import { AuthProvider } from "./contexts/AuthContext";
import { GameContext } from "./contexts/GameContext";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Logout/Logout";
import { Register } from "./components/Register/Register";
import { CreateGame } from "./components/CreateGame/CreateGame";
import { EditGame } from "./components/EditGame/EditGame";
import { Catalog } from "./components/Catalog/Catalog";
import { GameDetails } from "./components/GameDetails/GameDetails";
import "./App.css";

function App() {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        gameService.getAll().then((result) => {
            setGames(result);
        });
    }, []);

    const gameAdd = (gameData) => {
        setGames((state) => [...state, gameData]);
        navigate("/catalog");
    };

    const gameEdit = (gameId, gameData) => {
        if (!gameData || typeof gameData !== "object" || !gameData.id) {
            console.log("Invalid game data, skipping update");
            return;
        }
        setGames((state) => state.map((x) => (x.id === gameId ? gameData : x)));
    };

    return (
        <AuthProvider>
            <div id="box">
                <Header />

                <GameContext.Provider value={{ games, gameAdd, gameEdit }}>
                    <main id="main-content">
                        <Routes>
                            <Route path="/" element={<Home games={games} />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/create" element={<CreateGame />} />
                            <Route
                                path="/games/:gameId/edit"
                                element={<EditGame />}
                            />
                            <Route
                                path="/catalog"
                                element={<Catalog games={games} />}
                            />
                            <Route
                                path="/catalog/:gameId"
                                element={
                                    <GameDetails
                                        games={games}
                                        // addComment={addComment}
                                    />
                                }
                            />
                        </Routes>
                    </main>
                </GameContext.Provider>
            </div>
        </AuthProvider>
    );
}

export default App;
