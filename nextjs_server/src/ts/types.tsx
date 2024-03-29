export interface Event {
  id: string;
  title: string;
  eventLocation?: string;
  backgroundColor: string;
  allDay: boolean;
  editable: boolean;
  oneDayEvent: boolean;
  start: string;
  end: string;
  organizer?: number;
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
  favoritedBy: [];
};



export interface AvailableTimeSlotViewModel {
  id: number;
  dayOfWeek: string;
  person: number;
  timeSlot: number;
}

export const eventColorPalette = [
  {id: 1, name: "Navy", value: "#002e5d" },
  {id: 2, name: "Emerald", value: "#2ecc71" },
  {id: 3, name: "Orange", value: "#f39c12" },
  {id: 4, name: "Ruby", value: "#e74c3c" },
  {id: 5, name: "Purple", value: "#9b59b6" },
  {id: 6, name: "Turquoise", value: "#1abc9c" },
  {id: 7, name: "Goldenrod", value: "#d35400" },
  {id: 8, name: "Crimson", value: "#dc143c" },
  {id: 9, name: "Indigo", value: "#4b0082" },
  {id: 10, name: "Teal", value: "#008080" }
];