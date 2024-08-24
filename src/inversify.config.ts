import { Container } from "inversify";
import { EventService } from "./services/event.service";
import { EventRepository } from "./repositories/event.repository";
import TYPES from "./types";

// Create a new container
const container = new Container();

// Bind services
container.bind<EventService>(TYPES.EventService).to(EventService);
container.bind<EventRepository>(TYPES.EventRepository).to(EventRepository);

export default container;
