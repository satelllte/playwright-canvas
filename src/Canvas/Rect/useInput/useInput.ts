import {useEffect, useState} from 'react';

export const useInput = () => {
  const [input] = useState(() => ({
    left: false,
    right: false,
    down: false,
    up: false,
  }));

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          input.left = true;
          break;
        case 'ArrowRight':
          input.right = true;
          break;
        case 'ArrowDown':
          input.down = true;
          break;
        case 'ArrowUp':
          input.up = true;
          break;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          input.left = false;
          break;
        case 'ArrowRight':
          input.right = false;
          break;
        case 'ArrowDown':
          input.down = false;
          break;
        case 'ArrowUp':
          input.up = false;
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [input]);

  return input;
};
