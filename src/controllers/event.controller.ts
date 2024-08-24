import { controller, httpPost, httpGet, requestBody, requestParam } from "inversify-express-utils";
import { inject } from "inversify";
import { EventService } from "../services/event.service";
import { Event } from "../models/event.model";
import TYPES from "../types";
import { generateEventPDF } from "../utils/pdf-generator";

@controller("/events")
export class EventController {
    constructor(@inject(TYPES.EventService) private eventService: EventService) {}

    @httpPost("/")
    public async createEvent(@requestBody() event: Event) {
        await this.eventService.createEvent(event);
        return { message: "Event created successfully" };
    }

    @httpGet("/:id/report")
    public async getEventReport(@requestParam("id") eventId: number) {
        const report = await this.eventService.getEventReport(eventId);
        generateEventPDF(report, `report_${eventId}.pdf`);
        return { message: `PDF report generated for event ${eventId}` };
    }
}
