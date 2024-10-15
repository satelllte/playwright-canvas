import {useEffect} from 'react';
import {useEffectEvent} from './useEffectEvent';

export const useFrame = (frameCallback: (timeDelta: number) => void) => {
  const _frame = useEffectEvent(frameCallback);

  useEffect(() => {
    let frameId: number | undefined;
    let timeElapsedPrevious = performance.now();
    const frame: FrameRequestCallback = (timeElapsedMilliseconds) => {
      const timeElapsed = timeElapsedMilliseconds * 0.001;
      const timeDelta = timeElapsed - timeElapsedPrevious;
      _frame(timeDelta);
      timeElapsedPrevious = timeElapsed;
      frameId = requestAnimationFrame(frame);
    };
    frameId = requestAnimationFrame(frame);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [_frame]);
};
