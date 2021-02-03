import { Gear } from '@/models';
import { GearOptimizer } from '@/services/gear-optimizer';

const ACTIONS = {
  OPTIMIZE: 'optimize',
  //
  PROGRESS: 'progress'
};

const reportProgress = (x: number) => {
  (self as any).postMessage({ action: ACTIONS.PROGRESS, result: x });
};

addEventListener('message', (event: MessageEvent) => {
  // postMessage(calculatePrimes(400, 1000000000), 'self');
  console.log('optimizer::message::start, event =', event);
  if (event.data.action == ACTIONS.OPTIMIZE) {
    (self as any).postMessage({
      action: 'optimize-result',
      result: GearOptimizer.optimize(event.data.store, event.data.criteria, reportProgress)
    });
  } else {
    // console.log(self);
    // console.log(event);
    // hack of casting self to DedicatedWorkerGlobalScope, typescript conflict between webworker and other lib
    (self as any).postMessage({ action: 'START' });

    (self as any).postMessage({ action: 'END', result: [1, 2, 3] });
  }
});
