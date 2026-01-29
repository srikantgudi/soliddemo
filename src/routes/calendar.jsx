import { createSignal, createMemo, For, createEffect, onCleanup } from "solid-js";
import { DateTime } from "luxon";
import Pagetitle from "~/components/Pagetitle";

export default function Calendar() {
  let [curdt, setCurdt] = createSignal(DateTime.now());

  let days = createMemo(() => {
      let arr = [];
      let startOfMonth = curdt().set({day:1});
      let endOfMonth = startOfMonth.endOf('month');
      for (let d=startOfMonth.day; d <= endOfMonth.day; d++) {
          arr = [...arr, curdt().set({day:d})]
      }
      return arr;
  })

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const startYear = createMemo(() => curdt().year - (curdt().year % 10));

  const yearsrange = createMemo(() => {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(i + startYear());
    }
    return arr;
  });

  return (
    <div className="my-4 border">
      <div>
        <div className="flex items-center gap-1 px-2 bg-zinc-800">
          <Pagetitle text={`Calendar`} size="3xl" /> <div>!! One Unique feature is that the days are static and the week days are dynamic.!!</div>
        </div>
      </div>
      <div className="p-2">
        <div className="flex items-center gap-1">
          <div className="text-3xl font-bold my-4 mr-24">{curdt().toFormat("MMMM yyyy")}</div>
          <span className="text-2xl mr-2">Years:</span>
          <button onClick={() => setCurdt(curdt().set({year: curdt().year-10}))} className="w-18 bg-gray-200 p-1 text-gray-900 text-xl rounded-sm">&laquo; -10</button>
          <For each={yearsrange()}>
            {(y) => <button onClick={() => {setCurdt(curdt().set({year: y}))}}
            className="w-16 bg-gray-200 p-1 text-gray-900 text-2xl rounded-sm">{y}</button>}
          </For>
          <button onClick={() =>setCurdt(curdt().set({year: curdt().year+10}))} className="w-18 bg-gray-200 p-1 text-gray-900 text-xl rounded-sm">+10 &raquo;</button>
          <button onClick={() =>setCurdt(DateTime.now)} className="bg-indigo-800 text-white p-2 shadow-md shadow-yellow-400 w-18 font-bold rounded-sm">Today</button>
        </div>

        <div className="grid grid-cols-12 gap-1 my-2">
            <For each={months}>
                {(m,i) => (
                    <button className="bg-gray-200 p-1 text-gray-900 text-xl rounded-sm" onClick={() => setCurdt(curdt().set({month:i()+1}))}>{m}</button>
                ) }
            </For>
        </div>

        <div className="grid grid-cols-7 gap-1">
            <For each={days()}>
                {(d) => (
                    <div className="text-center my-1 bg-blue-900 shadow shadow-gray-500 text-2xl">
                        <div className="py-1">{d.toFormat("EEE")}</div>
                        <div className="py-1 bg-gray-400 text-black">{d.toFormat("dd")}</div>
                    </div>
                )}
            </For>
        </div>
      </div>
    </div>
  )
}
