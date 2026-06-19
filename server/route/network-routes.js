import express from 'express';

import {
    getStations,
    getLines,
    getStationLines,
    getSegments
} from '../dao/network-dao.js';

const router = express.Router();

// GET /api/network
router.get(
    '/network',

    async (req, res) => {

        try {

            const stations =
                await getStations();

            const lines =
                await getLines();

            const stationLines =
                await getStationLines();

            const segments =
                await getSegments();

            res.json({
                stations,
                lines,
                stationLines,
                segments
            });

        } catch (err) {

            res
                .status(500)
                .json(err);

        }

    }
);

export default router;