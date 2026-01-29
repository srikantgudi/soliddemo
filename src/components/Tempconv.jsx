import { createSignal, createMemo } from "solid-js";
import Pagetitle from "~/components/Pagetitle";

export default function Tempconv() {
  const [temp, setTemp] = createSignal(0);

  const ctof = createMemo(() => (temp() * 1.8) + 32);
  const ftoc = createMemo(() => (temp() - 32) / 1.8 );
  
  return (
    <div className="border">
      <div className="text-2xl p-2 mb-2 bg-zinc-600">Temperature Conversion</div>
      <div className="p-2">
        <div className="flex gap-1 items-center">
          Enter value: <input type="number" className="p-1 px-2 border rounded-sm" onInput={(e) => setTemp(parseFloat(e.target.value))} />
        </div>
        <div className="text-2xl my-4">
          {temp().toFixed(2)} <sup>o</sup>C = {ctof().toFixed(2)} <sup>o</sup>F
        </div>
        <div className="text-2xl my-4">
          {temp().toFixed(2)} <sup>o</sup>F = {ftoc().toFixed(2)} <sup>o</sup>C
        </div>
      </div>
    </div>
  );
}
