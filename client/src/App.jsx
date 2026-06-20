import './App.css'

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import InstructionsPage
    from './page/instruction';

import LoginPage
    from './page/login';

import RankingPage
    from './page/ranking';

import SetupPage
    from './page/setup';

import PlanningPage
    from './page/planning';

import ResultPage
    from './page/result';

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