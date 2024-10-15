import {Canvas} from './Canvas';

export function App() {
  return (
    <div className='p-8 flex flex-col gap-4 items-start absolute inset-0 w-full h-full select-none'>
      <h1 className='text-3xl font-bold'>playwright-canvas</h1>
      <p>
        Proof-of-concept demonstrating HTML Canvas scenarios testing via
        Playwright.
      </p>
      <Canvas />
    </div>
  );
}
