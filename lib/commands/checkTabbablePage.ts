import { Methods } from '../methods/methods.interface';
import { InstanceData } from '../methods/instanceData.interfaces';
import { Folders } from '../base.interface';
import drawTabbableOnCanvas from '../clientSideScripts/drawTabbableOnCanvas';
import { CheckTabbableOptions } from './tabbable.interfaces';
import removeElementFromDom from '../clientSideScripts/removeElementFromDom';
import checkFullPageScreen from './checkFullPageScreen';
import { ImageCompareResult } from '..';

/**
 * Compare an image with all tab executions
 */
export default async function checkTabbablePage(
  methods: Methods,
  instanceData: InstanceData,
  folders: Folders,
  tag: string,
  checkTabbableOptions: CheckTabbableOptions,
): Promise<ImageCompareResult | number> {
  // 1. Inject drawing the tabbables
  await methods.executor(drawTabbableOnCanvas, checkTabbableOptions.wic.tabbableOptions);

  // 2. Create the screenshot
  const fullPageCompareData = await checkFullPageScreen(methods, instanceData, folders, tag, checkTabbableOptions);

  // 3. Remove the canvas
  await methods.executor(removeElementFromDom, 'wic-tabbable-canvas');

  // 4. Return the data
  return fullPageCompareData;
}
