import { createSignal, createMemo } from "solid-js";
import Pagetitle from "~/components/Pagetitle";
import Calendarmod from '~/modules/calendarmod';

export default function RadialcalComp() {
  const [cal, setCal] = createSignal(new Calendarmod());

  return (
    <div className="border">
      <div className="text-2xl p-2 mb-2 bg-zinc-600">Radialcal Component</div>

      <div className="flex items-center gap-1">
        <div>
          {cal().marks(cal().lastDate,24,3).join("|")}
        </div>
        <svg viewBox="-50 -50 100 100" width={500}>
          <circle r={49} fill="lightblue" />
          <circle r={4} fill="cornflowerblue" />
          {/* year range */}
          <For each={cal().marks(10,44,4)}>
            {(m) => (<text x={m.x} y={m.y} text-anchor="middle" font-size={m.fontsize + (cal().isYear(m.val+cal().startYear()) ? 2: 0)}>{m.val+cal().startYear()}</text>)}
          </For>
          {/* months */}
          <For each={cal().marks(12,34,4)}>
            {(m) => (<text x={m.x} y={m.y} text-anchor="middle" font-size={m.fontsize + (cal().isMonth(m.val+1) ? 2 : 0)}>{cal().monthName(m.val)}</text>)}
          </For>
          {/* days */}
          <For each={cal().marks(cal().lastDate(),24,3)}>
            {/* {(m) => (<text x={m.x} y={m.y} text-anchor="middle" font-size={m.fontsize + (m.val+1==cal().getDay() ? 2:0)}>{m.val+1}</text>)} */}
            {(m) => (<text x={m.x} y={m.y} text-anchor="middle" font-size={m.fontsize + (cal().isDay(m.val+1) ? 2:0)}>{m.val+1}</text>)}
          </For>
          {/* weekdays */}
          <For each={cal().marks(7,14,3)}>
            {(m) => (<text x={m.x} y={m.y} text-anchor="middle" font-size={m.fontsize + (cal().isWeekday(m.val) ? 2 : 0)}>{cal().weekdayName(m.val)}</text>)}
          </For>
          {cal().svgText(0,-40,3,"blue","------ years ------")}
          {cal().svgText(0,-30,3,"blue","------ months ------")}
          {cal().svgText(0,-20,3,"blue","------ days ------")}
          {cal().svgText(0,-5,3,"blue","------ weekdays ------")}
        </svg>
      </div>
    </div>
  )
}
