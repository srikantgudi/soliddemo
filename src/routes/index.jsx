import { A } from "@solidjs/router";
import Counter from "~/components/Counter";
import Tempconv from "~/components/Tempconv";
import Pagetitle from "~/components/Pagetitle";
import RadialcalComp from "~/components/RadialCoomp";
import Panel from "~/components/Panel";

export default function Home() {
  return (
    <main className="border my-4">
      <div className="text-4xl bg-zinc-800 p-4">Home page!</div>
      <div className="flex gap-4 p-2">
          <Counter />
          <Tempconv />
          <RadialcalComp />
      </div>
    </main>
  );
}
