import { Database } from "sqlite3";
import { injectable } from "inversify";
import { Event } from "../models/event.model";

@injectable()
export class EventRepository {
    private db: Database;

    constructor() {
        this.db = new Database("event-management.db");

        this.db.serialize(() => {
            this.db.run(`
                CREATE TABLE IF NOT EXISTS events (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    date TEXT NOT NULL,
                    location TEXT NOT NULL,
                    participantsLimit INTEGER NOT NULL
                )
            `);
        });
    }

    public async createEvent(event: Event): Promise<void> {
        const { name, date, location, participantsLimit } = event;
        return new Promise((resolve, reject) => {
            this.db.run(
                `INSERT INTO events (name, date, location, participantsLimit)
                 VALUES (?, ?, ?, ?)`,
                [name, date, location, participantsLimit],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    public async getEventById(eventId: number): Promise<Event | null> {
        return new Promise((resolve, reject) => {
            this.db.get(
                `SELECT * FROM events WHERE id = ?`,
                [eventId],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row ? row as Event : null);
                    }
                }
            );
        });
    }

    // Other CRUD methods can be added here...
}
