export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  website?: string;
  latitude: number;
  longitude: number;
  description?: string;
  category?: string;
  popularity?: number;
  image?: string;
}

export interface CreateEventDto {
  title: string;
  date: string;
  location: string;
  website?: string;
  latitude: number;
  longitude: number;
  description?: string;
  category?: string;
  popularity?: number;
}

export interface UpdateEventDto {
  title?: string;
  date?: string;
  location?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  category?: string;
  popularity?: number;
}
