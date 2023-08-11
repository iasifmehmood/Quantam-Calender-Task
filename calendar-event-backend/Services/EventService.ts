import { EventEntity } from '../Entity/EventEntity';
import { EventModel } from '../Model/EventModel';

export class EventService {
  private eventModel: EventModel;

  constructor() {
    this.eventModel = new EventModel();
  }

  async addEvent(event: EventEntity): Promise<EventEntity> {
    const createdEvent = await this.eventModel.addEvent(event);
    return createdEvent;
  }
}
