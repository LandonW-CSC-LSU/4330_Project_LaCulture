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
}
