import {
    useState,
    useEffect
} from 'react';

import {
    useNavigate
} from 'react-router-dom';

import API
    from '../api/API';

import './css/RankingPage.css';

function RankingPage() {

    const [ranking, setRanking] =
        useState([]);

    const navigate =
        useNavigate();

    useEffect(() => {

        async function loadRanking() {

            try {

                const rankingData =
                    await API.getRanking();

                setRanking(
                    rankingData
                );

            } catch (err) {

                console.error(
                    err
                );

            }

        }

        loadRanking();

    }, []);

    return (

        <div className="ranking-page">

            <div className="ranking-card">

                <div className="floating-icons">
                    🏆 ⭐ 🚇
                </div>

                <h1>
                    Hall of Fame
                </h1>

                <div className="ranking-list">

                    {
                        ranking.map(
                            (
                                player,
                                index
                            ) => (

                                <div

                                    key={index}

                                    className="ranking-row"

                                >

                                    <span>
                                        #{index + 1}
                                    </span>

                                    <span>
                                        {player.name}
                                    </span>

                                    <span>
                                        {player.bestScore}
                                    </span>

                                </div>

                            )
                        )
                    }

                </div>

                <button

                    className="action-button"

                    onClick={() =>
                        navigate('/setup')
                    }

                >
                    Play Again
                </button>

            </div>

        </div>

    );

}

export default RankingPage;