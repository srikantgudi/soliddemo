import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <div className="mx-auto w-4/5">
          <title>SolidJs Sample Demo</title>
          <Nav />
          <Suspense>
            <div>{props.children}</div>
          </Suspense>
        </div>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
