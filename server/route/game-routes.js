import express from 'express';

import {
    getStations
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

router.post(
    '/games/new',

    isLoggedIn,

    async (req, res) => {

        try {

            const stations =
                await getStations();

            res.json({
                message:
                    'Game generation placeholder',
                stationsCount:
                    stations.length
            });

        } catch (err) {

            res
                .status(500)
                .json(err);

        }

    }
);

export default router;
