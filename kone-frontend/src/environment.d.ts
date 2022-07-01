declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: number;
      DB_USER: string;
      ENV: 'test' | 'dev' | 'prod';
      REACT_APP_AWS_GATEWAY_URL: string;
      REACT_APP_ACCESS_KEY: string;
      REACT_APP_SECRET_KEY: string;
    }
  }
}

export {};
