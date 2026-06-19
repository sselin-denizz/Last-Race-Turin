import sqlite from 'sqlite3';

const db = new sqlite.Database('./db/database.sqlite');

export function getStations() {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT *
            FROM stations
        `;

        db.all(sql, [], (err, rows) => {

            if (err)
                reject(err);
            else
                resolve(rows);

        });

    });

}

export function getLines() {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT *
            FROM lines
        `;

        db.all(sql, [], (err, rows) => {

            if (err)
                reject(err);
            else
                resolve(rows);

        });

    });

}

export function getStationLines() {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT *
            FROM station_lines
        `;

        db.all(sql, [], (err, rows) => {

            if (err)
                reject(err);
            else
                resolve(rows);

        });

    });

}

export function getSegments() {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT *
            FROM segments
        `;

        db.all(sql, [], (err, rows) => {

            if (err)
                reject(err);
            else
                resolve(rows);

        });

    });

}