import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`CREATE TABLE events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        date TEXT,
        location TEXT,
        participantsLimit INTEGER
    )`);

    db.run(`CREATE TABLE sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        eventId INTEGER,
        title TEXT,
        speakerId INTEGER,
        duration INTEGER,
        FOREIGN KEY(eventId) REFERENCES events(id),
        FOREIGN KEY(speakerId) REFERENCES speakers(id)
    )`);

    db.run(`CREATE TABLE speakers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        bio TEXT
    )`);

    db.run(`CREATE TABLE participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        eventId INTEGER,
        name TEXT,
        email TEXT,
        FOREIGN KEY(eventId) REFERENCES events(id)
    )`);
});

export default db;
