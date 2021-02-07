import { Gear } from '@/models';
import { DefaultGearOptimizer, IGearOptimizer } from '@/services/gear-optimizer';

const ACTIONS = {
  OPTIMIZE: 'optimize',
  //
  PROGRESS: 'progress'
};

const reportProgress = (x: number) => {
  (self as any).postMessage({ action: ACTIONS.PROGRESS, result: x });
};

addEventListener('message', (event: MessageEvent) => {
  console.log('optimizer::message::start, event =', event);
  if (event.data.action == ACTIONS.OPTIMIZE) {
    // (self as any).postMessage({
    //   action: 'optimize-result',
    //   result: GearOptimizer.optimize(event.data.store, event.data.criteria, reportProgress)
    // });
    const optimizer: IGearOptimizer = new DefaultGearOptimizer(event.data.store, event.data.profile, reportProgress);
    (self as any).postMessage({
      action: 'optimize-result',
      result: optimizer.optimize()
    });
  } else {
    // hack of casting self to DedicatedWorkerGlobalScope, typescript conflict between webworker and other lib
    (self as any).postMessage({ action: 'START' });
    (self as any).postMessage({ action: 'END', result: [1, 2, 3] });
  }
});
