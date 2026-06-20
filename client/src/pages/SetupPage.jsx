import {
    useEffect
} from 'react';

import {
    useNavigate
} from 'react-router-dom';

import './css/SetupPage.css';

function SetupPage({
    game,
    createNewGame
}) {

    const navigate =
        useNavigate();

    useEffect(() => {

        if (game)
            return;

        createNewGame()
            .catch(
                console.error
            );

    }, [
        game,
        createNewGame
    ]);

    if (!game) {

        return (

            <div className="setup-page">

                <div className="setup-card">

                    <h1>
                        Loading...
                    </h1>

                </div>

            </div>

        );

    }

    return (

        <div className="setup-page">

            <div className="setup-card">

                <div className="floating-icons">
                    🎯 🚇 📍
                </div>

                <h1>
                    New Mission
                </h1>

                <p className="subtitle">
                    Your exam starts soon.
                </p>

                <div className="mission-card">

                    <h2>
                        Departure
                    </h2>

                    <p>
                        {game.startStation.name}
                    </p>

                </div>

                <div className="mission-card">

                    <h2>
                        Destination
                    </h2>

                    <p>
                        {game.destinationStation.name}
                    </p>

                </div>

                <div className="mission-card">

                    <h2>
                        Minimum Distance
                    </h2>

                    <p>
                        {game.distance}
                        {' '}
                        stations
                    </p>

                </div>

                <div className="objective-badge">

                    Objective:
                    Reach the destination.

                </div>

                <button
                    onClick={() =>
                        navigate('/planning')
                    }
                >
                    PLAN MY ROUTE
                </button>

            </div>

        </div>

    );

}

export default SetupPage;