export interface Event {
  id: string;
  title: string;
  eventLocation?: string;
  allDay: boolean;
  start: string;
  end: string;
  organizerId?: number;
  backgroundColor: string;
  oneDayEvent: boolean;
};

export interface ResourceViewModel {
  id: number;
  name: string;
  image: string;
};

export interface ResourceDetailsViewModel {
  id: number;
  name: string;
  description: string;
  url: string;
  category: number;
  university: number;
};