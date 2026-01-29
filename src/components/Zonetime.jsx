import { createSignal, createMemo, For, createEffect, onCleanup } from "solid-js";
import { DateTime } from 'luxon';
import Pagetitle from "./Pagetitle";
import Panel from "./Panel";

export default function Zonetime(props) {
  const [localtime, setLocaltime] = createSignal(DateTime.now());
  const [inputtime, setInputtime] = createSignal(DateTime.now());

  const [clockhrs,setClockhrs] = createSignal(12);
  
  const timefmt = 'DDDD TTT';

  const marks = (num_marks, radius, step) => {
    let arr = [];
    const step_angle = 360 / num_marks;
    for (let i=0; i < num_marks; i++) {
      let angle = i * step_angle - 90;
      let rad = angle * Math.PI / 180;
      let x = radius * Math.cos(rad);
      let y = radius * Math.sin(rad);
      let fontsize = i % step ? 3 : 5;
      let val = i ;
      let pt = {x,y,fontsize,val};
      arr.push(pt);
    }
    return arr;
  }

  createEffect(() => {
    const interval = setInterval(() => {
      setLocaltime(localtime());
    },1000);
    onCleanup(() => clearInterval(interval));
  });
  
  const ztime = createMemo(() => localtime().setZone(props.zone));

  const thr = createMemo(() => ztime().hour);
  const tmi = createMemo(() => ztime().minute);
  const tse = createMemo(() => ztime().second);

  const thrlocal = createMemo(() => localtime().hour);
  const tmilocal = createMemo(() => localtime().minute);
  const tselocal = createMemo(() => localtime().second);


  const formattedZoneTime = createMemo(() => localtime().setZone("Asia/Tokyo").toFormat(timefmt));
  const formattedTime = createMemo(() => localtime().toFormat(timefmt));

  const ang = createMemo(() => {
    return {
      h: ((thr() * 30) + (tmi() / 2)) - 90,
      m: ((tmi() * 6) + (tse() / 10)) - 90,
      s: (tse() * 6) - 90
    }
  })

  const anglocal = createMemo(() => {
    return {
      h: ((thrlocal() * 30) + tmilocal() / 2) - 90,
      m: (tmilocal() * 6 + tselocal() / 10) - 90
    }
  })

  return (
    <div>
      <Pagetitle size="xl" text="Clock" />
      <div className={"w-[45rem] text-xl text-amber-700 font-bold bg-gray-100 p-1"}>LOCAL TIME | {localtime().toRFC2822()}</div>

      <Show when={props.showzone}>
        <div className={`my-1 w-[45rem] p-1 bg-blue-100 text-gray-700`}><span class="text-blue-800 font-bold text-xl">{props.zone}</span> | <span class="text-blue-800 text-xl">{ztime().toRFC2822()}</span></div> 
      </Show>

      <div className="flex items-center gap-4">
        <div className="py-2">
          Enter value: 
        </div>
        <div>
          <input id="inputtime" type="datetime-local" 
            className="border bg-gray-200 text-gray-800 rounded-sm p-2"
            onInput={(e) => {
              setInputtime(e.target.value);
              setLocaltime(DateTime.fromISO(e.target.value));
            }}
          />
        </div>
        <button className="bg-teal-800 p-2 px-4 text-gray-200 rounded-sm" onClick={() => {
          setLocaltime(DateTime.fromISO(inputtime()))}
        }>Set Input</button>
        <button className="bg-teal-800 p-2 px-4 text-gray-200 rounded-sm" onClick={() => {
          setLocaltime(DateTime.now())}
        }>Set Local</button>
      </div>
      <div>
        <div>
          <Show when={inputtime().isValid}>
            Input time: {inputtime().toString()}
          </Show>
        </div>
      </div>
      <div className="my-4">
        <svg viewBox="-50 -50 100 100" width={400}>
          <circle r={49} fill="lightcyan" />
          <circle r={4} fill="lightblue" />

          <line x1={-6} x2={30} stroke="maroon" stroke-width="1" stroke-linecap="round" transform={`rotate(${anglocal().h})`} />
          <line x1={-6} x2={40} stroke="maroon" stroke-width="1" stroke-linecap="round" transform={`rotate(${anglocal().m})`} />

          <line x1={-6} x2={30} stroke="navy" stroke-width="1.5" transform={`rotate(${ang().h})`} />
          <line x1={-6} x2={40} stroke="navy" stroke-width="1.5"  transform={`rotate(${ang().m})`} />
          <line x1={-6} x2={42} stroke="teal" stroke-width="0.5"  transform={`rotate(${ang().s})`} />

          <For each={marks(60,45,5)} fallback={<div>Loading...</div>}>
            {(m) => (
              <text x={m.x} y={m.y} text-anchor="middle" font-size={m.fontsize} fill="navy">{m.val}</text>
            )}
          </For>
          <For each={marks(clockhrs(),34,3)} fallback={<div>Loading...</div>}>
            {(m) => (
              <text x={m.x} y={m.y} text-anchor="middle" font-size={m.fontsize} fill="navy">{m.val}</text>
            )}
          </For>
        </svg>
      </div>
    </div>
  );
}
