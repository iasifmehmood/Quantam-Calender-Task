import { Request, Response } from 'express';
import { EventEntity } from '../Entity/EventEntity';
import { EventDTO } from '../DTO/EventDTO';
import { EventService } from '../Services/EventService';

export class EventController {
  private eventService: EventService;

  constructor() {
    this.eventService = new EventService();
  }

  async addEvent(req: Request, res: Response): Promise<void> {
    try {
      const { name, eventDate } = req.body as EventDTO;
      const event: EventEntity = { name, eventDate };

      const createdEvent = await this.eventService.addEvent(event);

      res.status(201).json(createdEvent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add event' });
    }
  }
}
