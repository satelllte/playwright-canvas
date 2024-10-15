import {createContext, useContext, useEffect, useRef, useState} from 'react';

export function Canvas() {
  const canvasRef = useRef<React.ElementRef<'canvas'>>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setCtx(ctx);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className='max-w-full select-none'
        width={500}
        height={500}
      />
      <InputProvider>
        {ctx && <Graphics ctx={ctx} />}
        <InputKeyboard />
      </InputProvider>
    </>
  );
}

const InputContext = createContext<
  | React.MutableRefObject<{
      left: boolean;
      right: boolean;
      down: boolean;
      up: boolean;
    }>
  | undefined
>(undefined);

function InputProvider({children}: {children: React.ReactNode}) {
  const inputRef = useRef({
    left: false,
    right: false,
    down: false,
    up: false,
  });

  return (
    <InputContext.Provider value={inputRef}>{children}</InputContext.Provider>
  );
}

const useInputRef = () => {
  const inputRef = useContext(InputContext);
  if (!inputRef)
    throw new Error('Can\'t access "useInputRef" outside "InputProvider" tree');
  return inputRef;
};

function InputKeyboard() {
  const inputRef = useInputRef();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          inputRef.current.left = true;
          break;
        case 'ArrowRight':
          inputRef.current.right = true;
          break;
        case 'ArrowDown':
          inputRef.current.down = true;
          break;
        case 'ArrowUp':
          inputRef.current.up = true;
          break;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          inputRef.current.left = false;
          break;
        case 'ArrowRight':
          inputRef.current.right = false;
          break;
        case 'ArrowDown':
          inputRef.current.down = false;
          break;
        case 'ArrowUp':
          inputRef.current.up = false;
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [inputRef]);

  return null;
}

function Graphics({ctx}: {ctx: CanvasRenderingContext2D}) {
  const inputRef = useInputRef();
  const pointRef = useRef({x: 0.0, y: 0.0});

  useEffect(() => {
    let frameId: number | undefined;
    let timeElapsedPrevious = performance.now();
    const frame: FrameRequestCallback = (timeElapsedMilliseconds) => {
      const timeElapsed = timeElapsedMilliseconds * 0.001;
      const timeDelta = timeElapsed - timeElapsedPrevious;

      const speed = 100.0;
      const input = inputRef.current;
      const point = pointRef.current;

      let dx = 0.0;
      let dy = 0.0;

      if (input.left) dx += -speed * timeDelta;
      if (input.right) dx += speed * timeDelta;
      if (input.down) dy += -speed * timeDelta;
      if (input.up) dy += speed * timeDelta;

      point.x += dx;
      point.y += dy;

      drawClear(ctx);
      drawRect(ctx, point.x, point.y);

      timeElapsedPrevious = timeElapsed;
      frameId = requestAnimationFrame(frame);
    };
    frameId = requestAnimationFrame(frame);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [ctx, inputRef]);

  return null;
}

const drawClear = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

const drawRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
): void => {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x, -y, 20, 20);
};
