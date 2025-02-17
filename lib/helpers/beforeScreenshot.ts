import hideScrollBars from '../clientSideScripts/hideScrollbars';
import setCustomCss from '../clientSideScripts/setCustomCss';
import { CUSTOM_CSS_ID } from './constants';
import { checkIsMobile, getAddressBarShadowPadding, getToolBarShadowPadding, waitFor } from './utils';
import getEnrichedInstanceData from '../methods/instanceData';
import { BeforeScreenshotOptions, BeforeScreenshotResult } from './beforeScreenshot.interface';
import { Executor } from '../methods/methods.interface';
import hideRemoveElements from '../clientSideScripts/hideRemoveElements';
import { yellow } from 'chalk';
import { LogLevel } from './options.interface';

/**
 * Methods that need to be executed before a screenshot will be taken
 */
export default async function beforeScreenshot(
  executor: Executor,
  options: BeforeScreenshotOptions,
  addShadowPadding = false,
): Promise<BeforeScreenshotResult> {
  const { browserName, nativeWebScreenshot, platformName } = options.instanceData;
  const {
    addressBarShadowPadding,
    disableCSSAnimation,
    hideElements,
    logLevel,
    noScrollBars,
    removeElements,
    toolBarShadowPadding,
  } = options;
  const addressBarPadding = getAddressBarShadowPadding({
    platformName,
    browserName,
    nativeWebScreenshot,
    addressBarShadowPadding,
    addShadowPadding,
  });
  const toolBarPadding = getToolBarShadowPadding({ platformName, browserName, toolBarShadowPadding, addShadowPadding });

  // Hide the scrollbars
  if (noScrollBars) {
    await executor(hideScrollBars, noScrollBars);
  }

  // Hide and or Remove elements
  if (hideElements.length > 0 || removeElements.length > 0) {
    try {
      await executor(hideRemoveElements, { hide: hideElements, remove: removeElements }, true);
    } catch (e) {
      if (logLevel === LogLevel.debug || logLevel === LogLevel.warn) {
        console.log(
          yellow(`
#####################################################################################
 WARNING:
 (One of) the elements that needed to be hidden or removed could not be found on the
 page and caused this error
 Error: ${e}
 We made sure the test didn't break.
#####################################################################################
`),
        );
      }
    }
  }

  // Set some custom css
  if (disableCSSAnimation || checkIsMobile(platformName)) {
    await executor(setCustomCss, { addressBarPadding, disableCSSAnimation, id: CUSTOM_CSS_ID, toolBarPadding });
    // Wait at least 500 milliseconds to make sure the css is applied
    // Not every device is fast enough to apply the css faster
    await waitFor(500);
  }

  // Get all the needed instance data
  const instanceOptions = {
    addressBarShadowPadding: options.addressBarShadowPadding,
    toolBarShadowPadding: options.toolBarShadowPadding,
    ...options.instanceData,
  };

  return getEnrichedInstanceData(executor, instanceOptions, addShadowPadding);
}
