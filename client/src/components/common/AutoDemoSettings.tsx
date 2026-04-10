import { useState } from "react";
import { Button } from "./Button";

export const AutoDemoSettings = ({
  onRun,
}: {
  onRun?: (count: number, speedMs: number) => void;
}) => {
  const [count, setCount] = useState(5);
  const [speed, setSpeed] = useState(800);

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={count}
        min={1}
        max={50}
        onChange={(e) => setCount(Number(e.target.value))}
        className="w-20 p-2 rounded-lg border"
      />
      <input
        type="number"
        value={speed}
        min={100}
        max={5000}
        step={100}
        onChange={(e) => setSpeed(Number(e.target.value))}
        className="w-28 p-2 rounded-lg border"
      />
      <Button variant="primary" size="sm" onClick={() => onRun?.(count, speed)}>
        Run
      </Button>
    </div>
  );
};

export default AutoDemoSettings;
