import { inject, injectable } from "inversify";
import { EventRepository } from "../repositories/event.repository";
import { Event } from "../models/event.model";
import TYPES from "../types";

@injectable()
export class EventService {
    constructor(@inject(TYPES.EventRepository) private eventRepository: EventRepository) {}

    public async createEvent(event: Event): Promise<void> {
        await this.eventRepository.createEvent(event);
    }

    public async getEventReport(eventId: number): Promise<Event> {
        const event = await this.eventRepository.getEventById(eventId);
        if (!event) {
            throw new Error(`Event with ID ${eventId} not found`);
        }
        return event;
    }

    // Additional service methods can be added here...
}
