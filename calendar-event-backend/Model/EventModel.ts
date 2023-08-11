import { EventEntity } from '../Entity/EventEntity';
import QueryDB from '../Providers/DatabaseProvider';

export class EventModel {
  async addEvent(event: EventEntity): Promise<EventEntity> {
    const { name, eventDate } = event;

    const query =
      'INSERT INTO event_calendar (name, event_date) VALUES ( ?, ?)';
    const values = [name, eventDate];

    try {
      let result = await QueryDB(query, values);

      const insertedId = (result as any).insertId as number;
      return { id: insertedId, ...event };
    } catch (error) {
      throw new Error('Failed to add event');
    }
  }
}
