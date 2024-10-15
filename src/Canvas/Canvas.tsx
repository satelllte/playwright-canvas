import {useEffect, useRef, useState} from 'react';
import {Rect} from './Rect';

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
