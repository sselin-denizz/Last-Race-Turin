import './App.css';

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import {
    useState
} from 'react';

import API
    from './api/API';

import InstructionsPage
    from './pages/InstructionsPage';

import LoginPage
    from './pages/LoginPage';

import RankingPage
    from './pages/RankingPage';

import SetupPage
    from './pages/SetupPage';

import PlanningPage
    from './pages/PlanningPage';

import ResultPage
    from './pages/ResultPage';

function App() {

    const [user, setUser] =
        useState(null);

    const [game, setGame] =
        useState(null);

    async function createNewGame() {

        const gameData =
            await API.createGame();

        setGame(
            gameData
        );

    }

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={
                        <LoginPage
                            setUser={setUser}
                        />
                    }
                />

                <Route
                    path="/instructions"
                    element={
                        <InstructionsPage />
                    }
                />

                <Route
                    path="/setup"
                    element={
                        <SetupPage
                            game={game}
                            createNewGame={
                                createNewGame
                            }
                        />
                    }
                />

                <Route
                    path="/planning"
                    element={
                        <PlanningPage
                            game={game}
                        />
                    }
                />

                <Route
                    path="/ranking"
                    element={
                        <RankingPage />
                    }
                />

                <Route
                    path="/result"
                    element={
                        <ResultPage />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;