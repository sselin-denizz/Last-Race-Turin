import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db/database.sqlite');

export function createGame(game) {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO games (
                userId,
                startStationId,
                destinationStationId,
                submittedRoute,
                score,
                playedAt
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.run(
            sql,
            [
                game.userId,
                game.startStationId,
                game.destinationStationId,
                game.submittedRoute,
                game.score,
                game.playedAt
            ],
            function(err) {

                if (err)
                    reject(err);
                else
                    resolve(this.lastID);

            }
        );

    });
}

export function getEvents() {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT *
            FROM events
        `;

        db.all(
            sql,
            [],
            (err, rows) => {

                if (err)
                    reject(err);
                else
                    resolve(rows);

            }
        );

    });

}

export function getRanking() {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                users.name,
                MAX(games.score) AS bestScore
            FROM games
            JOIN users
                ON users.id = games.userId
            GROUP BY users.id
            ORDER BY bestScore DESC
        `;

        db.all(
            sql,
            [],
            (err, rows) => {

                if (err)
                    reject(err);
                else
                    resolve(rows);

            }
        );

    });

}