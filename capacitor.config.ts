import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.PatanjaliWisdom.app',
  appName: 'Patanjali Wisdom',
  webDir: 'www',
  "bundledWebRuntime": false,
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 1000,
      "launchAutoHide": true,
      "splashFullScreen": true,
      "splashImmersive": true
    }
  }
};

export default config;
