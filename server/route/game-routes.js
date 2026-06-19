import express from 'express';

import {
    getStations,
    getSegments
} from '../dao/network-dao.js';

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

// Helper function to build a graph from the segments with BFS 
function buildGraph(segments) {

    const graph = {};

    for (const segment of segments) {

        const a = segment.stationA;
        const b = segment.stationB;

        if (!graph[a])
            graph[a] = [];

        if (!graph[b])
            graph[b] = [];

        graph[a].push(b);
        graph[b].push(a);
    }

    return graph;
}

function shortestDistance(
    graph,
    start,
    destination
) {

    const queue = [
        {
            station: start,
            distance: 0
        }
    ];

    const visited = new Set([start]);

    while (queue.length > 0) {

        const current =
            queue.shift();

        if (
            current.station === destination
        ) {
            return current.distance;
        }

        const neighbours =
            graph[current.station] || [];

        for (const next of neighbours) {

            if (!visited.has(next)) {

                visited.add(next);

                queue.push({
                    station: next,
                    distance:
                        current.distance + 1
                });

            }
        }
    }

    return -1;
}

export default router;
