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
      <canvas ref={canvasRef} width={500} height={500} />
      {ctx && <Graphics ctx={ctx} />}
    </>
  );
}

function Graphics({ctx}: {ctx: CanvasRenderingContext2D}) {
  const [rect] = useState(() => new Rect(ctx));
  const inputRef = useRef({
    left: false,
    right: false,
    down: false,
    up: false,
  });

  useEffect(() => {
    let frameId: number | undefined;
    let timeElapsedPrevious = performance.now();
    const frame: FrameRequestCallback = (timeElapsedMilliseconds) => {
      const timeElapsed = timeElapsedMilliseconds * 0.001;
      const timeDelta = timeElapsed - timeElapsedPrevious;

      const speed = 50.0;
      const input = inputRef.current;

      let dx = 0.0;
      let dy = 0.0;

      if (input.left) dx += -speed * timeDelta;
      if (input.right) dx += speed * timeDelta;
      if (input.down) dy += -speed * timeDelta;
      if (input.up) dy += speed * timeDelta;

      rect.move(dx, dy);
      rect.draw();

      timeElapsedPrevious = timeElapsed;
      frameId = requestAnimationFrame(frame);
    };
    frameId = requestAnimationFrame(frame);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [rect]);

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
  }, []);

  return null;
}

class Rect {
  public x: number = 0.0;
  public y: number = 0.0;
  private _ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
  }

  public move(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
  }

  public draw(): void {
    this._ctx.fillStyle = '#ffffff';
    this._ctx.fillRect(this.x, -this.y, 20, 20);
  }
}
