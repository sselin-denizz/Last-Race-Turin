import './App.css'

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

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

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={
                        <InstructionsPage />
                    }
                />

                <Route
                    path="/login"
                    element={
                        <LoginPage />
                    }
                />

                <Route
                    path="/ranking"
                    element={
                        <RankingPage />
                    }
                />

                <Route
                    path="/setup"
                    element={
                        <SetupPage />
                    }
                />

                <Route
                    path="/planning"
                    element={
                        <PlanningPage />
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