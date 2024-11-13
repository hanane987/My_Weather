export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface Hour {
  time_epoch: number;
  time: string;
  temp_c: number;
  condition: Condition;
}

export interface Day {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  condition: Condition;
}

export interface ForecastDay {
  date: string;
  day: Day;
  hour: Hour[];
}

export interface Weather {
  current: {
    temp_c: number;
    condition: Condition;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}
