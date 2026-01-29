import { createMemo, createSignal } from "solid-js";
import Counter from "~/components/Counter";
import Pagetitle from "~/components/Pagetitle";

export default function Home() {
  const [data, setData] = createSignal([]);
  const [cols, setCols] = createSignal([]);
  const [src, setSrc] = createSignal("posts");

  const srclist = [
    {value: "posts", text: "Post"},
    {value: "comments", text: "Comments"},
    {value: "todos", text: "Todos"}
  ]

  const result = createMemo(async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${src()}`);
    const data = await response.json();
    const cols = Object.keys(data[0]);
    setCols(cols)
    setData(data)
  })
  return (
    <main class="mt-4 border">
      <div class="text-3xl bg-zinc-800 p-4 text-sky-100 uppercase">Dynamic Data Fetch!</div>
      
      <div className="m-4 flex gap-1">
        <span>Select source:</span>
        <select class={`w-60 border bg-gray-800 text-white p-1`}
          onChange={(e) => {
              setSrc(e.target.value)
          }} >
            <option value="">- Select -</option>
          <For each={srclist} fallback={<div>Loading...</div>}>
              {(item) => (
                  <option selected={item.value == src()} class="py-1" value={item.value}>{item.text}</option>
              )}
          </For>
        </select>
      </div>
      <div className="h-150 overflow-y-auto px-2">
        <table className="w-full shadow-md">
          <caption className="bg-gray-900 py-1 text-cyan-200 uppercase">{src()}</caption>
          <thead className="sticky top-0">
            <tr>
              {
                cols().map((c) => (<td className="bg-gray-300 text-gray-800 uppercase">{c}</td>))
              }
            </tr>
          </thead>
          <tbody>
            <For each={data()}>
              {(row) =>
                <tr>
                  <For each={cols()}>
                    {c => <td>{row[c]}</td>}
                  </For>
                </tr>
              }
            </For>
          </tbody>
        </table>
      </div>
    </main>
  );
}
