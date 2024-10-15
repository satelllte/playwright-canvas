import {useCallback, useLayoutEffect, useRef} from 'react';

/**
 * In-house version of https://react.dev/learn/separating-events-from-effects#declaring-an-effect-event.
 * Once it's stable in React, we can remove this.
 */
export const useEffectEvent = <Args extends unknown[], ReturnValue>(
  callback: (...args: Args) => ReturnValue,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const callbackRef = useRef((..._args: Args): ReturnValue => {
    throw new Error('Forbidden to call an event handler while rendering.');
  });

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback((...args: Args) => callbackRef.current(...args), []);
};
