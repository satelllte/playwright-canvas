import {useEffect, useRef, useState} from 'react';
import {useInput} from './useInput';
import {useFrame} from './useFrame';

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
      {ctx && <Rect ctx={ctx} />}
    </>
  );
}

function Rect({ctx}: {ctx: CanvasRenderingContext2D}) {
  const input = useInput();
  const pointRef = useRef({x: 0.0, y: 0.0});

  useFrame((timeDelta) => {
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
  });

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
