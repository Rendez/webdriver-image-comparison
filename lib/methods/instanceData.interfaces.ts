import { ScreenDimensions } from '../clientSideScripts/screenDimensions.interfaces';

export interface InstanceData {
  // The browser name of the instance
  browserName: string;
  // The browser version of the instance
  browserVersion: string;
  // The device name of the instance
  deviceName: string;
  // The log name of the instance
  logName: string;
  // The name of the instance
  name: string;
  // If the instance creates native webscreenshots
  nativeWebScreenshot: boolean;
  // The platform name of the instance
  platformName: string;
  // The platform version of the instance
  platformVersion: string;
}

export interface InstanceOptions {
  // The browser name of the instance
  addressBarShadowPadding: number;
  // The browser name of the instance
  toolBarShadowPadding: number;
  // The browser name of the instance
  browserName: string;
  // The browser version of the instance
  browserVersion: string;
  // The device name of the instance
  deviceName: string;
  // The log name of the instance
  logName: string;
  // The name of the instance
  name: string;
  // If the instance creates native webscreenshots
  nativeWebScreenshot: boolean;
  platformName: string;
  // The platform version of the instance
  platformVersion: string;
}

export interface EnrichedInstanceData extends ScreenDimensions, InstanceOptions {
  // Is this an Android device
  isAndroid: boolean;
  // Is this an Android ChromeDriver screenshot
  isAndroidChromeDriverScreenshot: boolean;
  // Is this an Android Native screenshot
  isAndroidNativeWebScreenshot: boolean;
  // Is this an iOS device
  isIos: boolean;
  // Is this a mobile instance
  isMobile: boolean;
  // Is this a test in a desktop browser
  isTestInBrowser: boolean;
  // Is this a test in a mobile browser
  isTestInMobileBrowser: boolean;
}
