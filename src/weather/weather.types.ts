export interface WeatherCurrent {
  dt: number;
  name?: string;
  main?: { temp?: number; humidity?: number; pressure?: number };
  wind?: { speed?: number };
  weather?: Array<{ id: number; main: string; description: string; icon: string }>;
}

export interface WeatherForecast {
  city?: { name?: string; country?: string };
  cnt?: number;
  list?: Array<{
    dt: number;
    main: { temp?: number; humidity?: number; pressure?: number };
    weather?: Array<{ id: number; main: string; description: string; icon: string }>;
    wind?: { speed?: number };
  }>;
}

export interface WeatherBundle {
  current?: WeatherCurrent;
  forecast?: WeatherForecast;
  error?: string;
  fetchedAt: string;
  ttl: number; // seconds
}
