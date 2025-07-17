export interface Entry {
    id: string;
    date: string;
    weather: string;
    visibility: string;
    comment: string;
}

export type NewEntry = Pick<Entry, 'date' | 'weather' | 'visibility' | 'comment'>;

export const VISIBILITY_OPTIONS = ["great", "good", "ok", "poor"] as const;
export const WEATHER_OPTIONS = ["sunny", "rainy", "cloudy", "stormy", "windy"] as const;

export type Visibility = typeof VISIBILITY_OPTIONS[number];
export type Weather = typeof WEATHER_OPTIONS[number];