import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "ai.steilar.app",
  appName: "Steilar",
  webDir: "out",
  server: {
    androidScheme: "https"
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1800,
      backgroundColor: "#f7f1eb",
      showSpinner: false
    }
  }
};

export default config;
