import express from 'express';

import {
    getStations,
    getSegments,
    getStationLines
} from '../dao/network-dao.js';

import {
    createGame,
    getEvents
} from '../dao/game-dao.js';

import {
    buildGraph,
    shortestDistance
} from '../utils/graph-utils.js';

import {
    validateRoute
} from '../utils/route-validator-utils.js';

import {
    getRandomEvent
} from '../utils/event-utils.js';

import {
    executeRoute
} from '../utils/game-executor-utils.js';

const router = express.Router();

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    return res
        .status(401)
        .json({
            error: 'Not authenticated'
        });

}

// POST /api/games/new
router.post(
    '/games/new',

    isLoggedIn,

    async (req, res) => {

        try {

            const stations =
                await getStations();

            const segments =
                await getSegments();

            const graph =
                buildGraph(segments);

            const start =
                stations[
                    Math.floor(
                        Math.random() * stations.length
                    )
                ];

            let destination;
            let distance;

            do {

                destination =
                    stations[
                        Math.floor(
                            Math.random() * stations.length
                        )
                    ];

                distance =
                    shortestDistance(
                        graph,
                        start.id,
                        destination.id
                    );

            } while (
                start.id === destination.id ||
                distance < 3
            );

            console.log(
                start.name,
                '->',
                destination.name,
                distance
            );

            res.json({

                startStation: start,

                destinationStation:
                    destination,

                distance

            });

        } catch (err) {

            res
                .status(500)
                .json(err);

        }

    }
);

// POST /api/games/submit
router.post(
    '/games/submit',

    isLoggedIn,

    async (req, res) => {

        try {

            const {
                startStationId,
                destinationStationId,
                route
            } = req.body;

            const segments =
                await getSegments();

            const stationLines =
                await getStationLines();

            const valid =
                validateRoute(
                    route,
                    startStationId,
                    destinationStationId,
                    segments,
                    stationLines
                );

            if (!valid) {

                return res.json({
                    valid: false,
                    finalScore: 0
                });

            }

            const events =
                await getEvents();

            const result =
                executeRoute(
                    route,
                    events
                );
            
            await createGame({

                userId:
                    req.user.id,

                startStationId:
                    startStationId,

                destinationStationId:
                    destinationStationId,

                submittedRoute:
                    JSON.stringify(route),

                score:
                    result.finalScore,

                playedAt:
                    new Date()
                        .toISOString()
            });

            return res.json({

                valid: true,

                finalScore:
                    result.finalScore,

                journey:
                    result.journey

            });

        } catch (err) {

            res
                .status(500)
                .json(err);

        }
    }
);

export default router;