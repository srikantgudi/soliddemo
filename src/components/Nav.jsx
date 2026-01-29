import { useLocation } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const active = (path) =>
    path == location.pathname ? "border-sky-600 bg-sky-300 text-blue-800 px-2" : "border-transparent hover:border-sky-600 px-2";
  return (
    <div>
      <div class="m-auto flex items-center gap-2">
        <div className="flex flex-col">
          <div className="font-bold text-4xl my-4 mr-12">Sample SolidStart Demo</div>
          <div className="text-gray-300 px-2">Developed by <i>Srikant Gudi | Bengaluru, India</i> | <a className="cursor-pointer" href="https://www.linkedin.com/in/srikantgudi-blr/" target="_blank">LI profie</a> | <a href="https://github.com/srikantgudi/soliddemo">GitHub link</a></div>
        </div>
        <nav>
          <ul class="container flex items-center p-1 gap-2 text-gray-200">
            <li class={`border-b-2 ${active("/")}`}>
              <a href="/">Home</a>
            </li>
            <li class={`border-b-2 ${active("/dynamicdata")}`}>
              <a href="/dynamicdata">Dynamic-Data-fetch</a>
            </li>
            <li class={`border-b-2 ${active("/zonetimes")}`}>
              <a href="/zonetimes">Zone-times</a>
            </li>
            <li class={`border-b-2 ${active("/calendar")}`}>
              <a href="/calendar">Calendar</a>
            </li>
            <li class={`border-b-2 ${active("/yearlycal")}`}>
              <a href="/yearlycal">Yearly-calendar</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mt-4 text-2xl font-bold italic">A sample app using <mark className="p-1">SolidStart</mark> a framework for <span className="text-cyan-400">SolidJs</span>.</div>
    </div>
  )
}
