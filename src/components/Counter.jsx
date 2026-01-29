import { createSignal } from "solid-js";
import Pagetitle from "~/components/Pagetitle";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <div className="border">
      <div className="text-2xl p-2 mb-2 bg-zinc-600">Counter Demo</div>
      <div className="flex gap-1 items-center p-2">
        <button onclick={() => setCount(count()-1)}class={`p-1 px-4 bg-gray-200 text-black rounded-sm`}>Dec -</button>
        <span class={`p-1 px-4 w-18 text-center bg-gray-200 text-black rounded-sm`}>{count()}</span>
        <button onclick={() => setCount(count()+1)} class={`p-1 px-4 bg-gray-200 text-black rounded-sm`}>INC +</button>
      </div>
    </div>

  );
}
