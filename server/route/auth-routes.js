import express from 'express';
import passport from 'passport';

const router = express.Router();

// POST /api/sessions
// login user and create session
router.post(
    '/sessions',

    passport.authenticate('local'),

    (req, res) => {

        res.status(200).json({
            id: req.user.id,
            email: req.user.email,
            name: req.user.name
        });

    }
);

// GET /api/sessions/current
// check if the user is logged in, and return the user info
router.get(
    '/sessions/current',

    (req, res) => {

        if (!req.isAuthenticated()) {
            return res
                .status(401)
                .json({ error: 'Not authenticated' });
        }

        res.json(req.user);

    }
);

// DELETE /api/sessions/current
// logout user and destroy session
router.delete(
    '/sessions/current',

    (req, res, next) => {

        req.logout((err) => {

            if (err)
                return next(err);

            res.status(200).end();

        });

    }
);

export default router;