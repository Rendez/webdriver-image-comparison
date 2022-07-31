import getElementPositionTopWindow from '../clientSideScripts/getElementPositionTopWindow';
import getElementPositionTopDom from '../clientSideScripts/getElementPositionTopDom';
import { getElementPositionTopScreenNativeMobile } from '../clientSideScripts/getElementPositionTopScreenNativeMobile';
import { ANDROID_OFFSETS, IOS_OFFSETS } from '../helpers/constants';
import { Executor } from './methods.interface';
import { ElementPosition } from '../clientSideScripts/elementPosition.interfaces';
import getAndroidStatusAddressToolBarOffsets from '../clientSideScripts/getAndroidStatusAddressToolBarOffsets';
import getIosStatusAddressToolBarOffsets from '../clientSideScripts/getIosStatusAddressToolBarOffsets';
import { StatusAddressToolBarOffsets } from '../clientSideScripts/statusAddressToolBarOffsets.interfaces';

/**
 * Get the element position on a Android device
 */
export async function getElementPositionAndroid(
  executor: Executor,
  element: HTMLElement,
  { isAndroidNativeWebScreenshot, isLandscape }: { isAndroidNativeWebScreenshot: boolean; isLandscape: boolean },
): Promise<ElementPosition> {
  // This is the native web screenshot
  if (isAndroidNativeWebScreenshot) {
    const {
      safeArea,
      screenHeight,
      screenWidth,
      sideBarWidth,
      statusAddressBar: { height },
    } = <StatusAddressToolBarOffsets>(
      await executor(getAndroidStatusAddressToolBarOffsets, ANDROID_OFFSETS, { isHybridApp: false, isLandscape })
    );

    return executor(getElementPositionTopScreenNativeMobile, element, {
      isLandscape,
      safeArea,
      screenHeight,
      screenWidth,
      sideBarWidth,
      statusBarAddressBarHeight: height,
    });
  }

  // This is the ChromeDriver screenshot
  return executor(getElementPositionTopWindow, element);
}

/**
 * Get the element position on a desktop browser
 *
 * @param {function} executor         The function to execute JS in the browser
 * @param {number}   innerHeight      The inner height of the screen
 * @param {number}   screenshotHeight The screenshot height
 * @param {element}  element          The element
 *
 * @returns {Promise<{
 * 		height: number,
 *    width: number,
 *    x: number,
 *    y: number
 * }>}
 */
export async function getElementPositionDesktop(
  executor: Executor,
  element: HTMLElement,
  { innerHeight, screenshotHeight }: { innerHeight: number; screenshotHeight: number },
): Promise<ElementPosition> {
  if (screenshotHeight > innerHeight) {
    return executor(getElementPositionTopDom, element);
  }

  return executor(getElementPositionTopWindow, element);
}

/**
 * Get the element position on iOS Safari
 */
export async function getElementPositionIos(
  executor: Executor,
  element: HTMLElement,
  { isLandscape }: { isLandscape: boolean },
): Promise<ElementPosition> {
  // Determine status and address bar height
  const {
    safeArea,
    screenHeight,
    screenWidth,
    sideBarWidth,
    statusAddressBar: { height },
  } = <StatusAddressToolBarOffsets>await executor(getIosStatusAddressToolBarOffsets, IOS_OFFSETS, isLandscape);

  return executor(getElementPositionTopScreenNativeMobile, element, {
    isLandscape,
    safeArea,
    screenHeight,
    screenWidth,
    sideBarWidth,
    statusBarAddressBarHeight: height,
  });
}
