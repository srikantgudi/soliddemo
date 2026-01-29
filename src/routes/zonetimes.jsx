import { createSignal, createMemo, For } from "solid-js";
import Zonetime from "~/components/Zonetime";
import Pagetitle from "~/components/Pagetitle";
import { DateTime } from "luxon";
import Panel from "~/components/Panel";

export default function Zonetimes() {
  const [zone, setZone] = createSignal('Asia/Kolkata');

  const zonelist = [
    {value:"America/Los_Angeles", label: "US-West"},
    {value:"America/New_York", label: "US-East"},
    {value:"Europe/London", label: "UK"},
    {value:"Europe/Paris", label: "France"},
    {value:"Europe/Moscow", label: "Moscow"},
    {value:"Asia/Kolkata", label: "India"},
    {value:"Asia/Tokyo", label: "Japan"},
    {value:"Pacific/Auckland", label: "New Zealand"},
  ]
  return (
    <div className="border my-4">
      <div className="text-3xl bg-zinc-800 uppercase p-4">Zone Times</div>
      <div className="flex gap-4 items-start">
          <div className="p-2">
              <Pagetitle text="Zones" size="xl" />
              <div>
                <select class={`w-60 border bg-gray-800 text-white p-1`} size={12}
                    onChange={(e) => {
                        setZone(e.target.value)
                    }} >
                    <For each={zonelist} fallback={<div>Loading...</div>}>
                        {(item) => (
                            <option class="py-1" value={item.value}>{item.label}</option>
                        )}
                    </For>
                </select>
              </div>
          </div>
        <div class="p-2">
            <Zonetime zone={zone()} showzone />
        </div>
      </div>
    </div>
  );
}
