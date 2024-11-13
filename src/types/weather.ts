export interface Weather {
    location: {
      name: string;
    };
    current: {
      condition: {
        text: string;
      };
      temp_c: number;
    };
  }
  