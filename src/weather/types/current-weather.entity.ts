export type CurrentWeatherEntity = {
  name: string;
  main: { temp: number; pressure: number; humidity: number };
  weather: Array<{ main: string; description: string; icon: string }>;

  wind?: { speed: number; deg?: number };
};
