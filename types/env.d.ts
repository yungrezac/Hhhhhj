declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_TELEGRAM_BOT_TOKEN: string;
      EXPO_PUBLIC_API_URL?: string;
    }
  }
}

export {};