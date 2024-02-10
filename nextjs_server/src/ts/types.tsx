export interface Event {
  id: string;
  title: string;
  eventLocation?: string;
  allDay: boolean;
  start: string;
  end: string;
  organizerId?: number;
  backgroundColor?: string;
}