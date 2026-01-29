import { createSignal, createMemo, For, createEffect, onCleanup } from "solid-js";
import { DateTime } from "luxon";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const [numyears, setNumyears] = createSignal(20);

export default function Yearlcal() {
  let [curdt, setCurdt] = createSignal(DateTime.now());
  let [ydt, setYdt] = createSignal(DateTime.now());


  const startYear = createMemo(() => curdt().year - (curdt().year % 10));
  const endYear = createMemo(() => startYear() + numyears());

  const yearRange = createMemo(() => {
    let arr = [];
    for (let y = startYear(); y < endYear(); y++) {
      arr.push(y);
    }
    return arr;
  });

  let ydays = (m) => {
    let arr = [];
    const nextMonth = m + 1;
    let startOfMonth = ydt().set({ month: nextMonth, day: 1 });
    let endOfMonth = startOfMonth.endOf("month");
    for (let d = startOfMonth.day; d <= endOfMonth.day; d++) {
      arr = [...arr, ydt().set({ month: nextMonth, day: d })];
    }
    return arr;
  };
  return (
    <div className="border my-4">
      <div className="text-3xl bg-zinc-700 p-4 mb-2 uppercase">
        Yearly Calendar {startYear} - {endYear}
      </div>
      <div className="grid grid-cols-2 gap-1">
        <div>
          <div className="p-2 my-2 text-3xl uppercase">Years</div>
          <div className="p-4">
            <div className="flex items-center justify-center gap-4">
              <div>Number of years to display:</div>
              <select className="p-1 border bg-zinc-500 text-silver-200" onChange={(ev) => setNumyears(parseInt(ev.target.value))}>
                <option>20</option>
                <option>40</option>
                <option>60</option>
              </select>
              <button onClick={() => setCurdt(curdt().set({year:curdt().year - numyears()}))} className="border rounded-sm p-1 px-2">{"<< Prev "}{numyears()}</button>
              <button onClick={() => setCurdt(curdt().set({year:curdt().year + numyears()}))} className="border rounded-sm p-1 px-2">{" Next "}{numyears()}{" >>"}</button>
            </div>
            <div className="my-8 grid grid-cols-10 gap-2">
              <For each={yearRange()}>{(y) => <button onClick={() => setYdt(ydt().set({year:y}))} className="hover:bg-gray-400 hover:text-blue-700 hover:font-bold p-2 border rounded-sm w-16">{y}</button>}</For>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="text-3xl uppercase p-2">Calendar for {ydt().toFormat("yyyy")}</div>
          <div>!! One Unique feature is that the days are static and the week days are dynamic.!!</div>
          <div className="my-2 h-140 p-2 overflow-y-auto">
            <For each={months}>
              {(m, i) => (
                <div>
                  <div className="bg-blue-100 p-1 text-gray-900 font-bold rounded-sm">{m}</div>
                  <div className="grid grid-cols-7 gap-1">
                    <For each={ydays(i())}>
                      {(d) => (
                        <div className="w-15 text-center my-1 bg-blue-900 shadow shadow-gray-500">
                          <div>{d.toFormat("EEE")}</div>
                          <div className="bg-gray-400 text-black">{d.toFormat("dd")}</div>
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
}
