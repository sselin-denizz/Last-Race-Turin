import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db/database.sqlite');

export function createGame(game) {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO games (
                user_id,
                start_station_id,
                destination_station_id,
                submitted_route,
                score,
                played_at
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