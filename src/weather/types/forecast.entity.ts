export type ForecastEntity = {
  city: { name: string; country: string };
  list: Array<{
    dt: number;
    main: { temp: number; pressure: number; humidity: number };
    weather: Array<{ main: string; description: string; icon: string }>;
    wind?: { speed: number; deg?: number };
  }>;
};
