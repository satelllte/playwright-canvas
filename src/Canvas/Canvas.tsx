import {useEffect, useRef, useState} from 'react';

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
      {ctx && <Graphics ctx={ctx} />}
    </>
  );
}

const useInput = () => {
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

function Graphics({ctx}: {ctx: CanvasRenderingContext2D}) {
  const input = useInput();
  const pointRef = useRef({x: 0.0, y: 0.0});

  useEffect(() => {
    let frameId: number | undefined;
    let timeElapsedPrevious = performance.now();
    const frame: FrameRequestCallback = (timeElapsedMilliseconds) => {
      const timeElapsed = timeElapsedMilliseconds * 0.001;
      const timeDelta = timeElapsed - timeElapsedPrevious;

      const speed = 100.0;
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
  }, [ctx, input]);

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
