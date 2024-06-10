import { CalendarComponent } from "./Calendar";

export default function App() {
  return (
    <main className="w-screen min-h-screen p-10 overflow-y-auto overflow-x-hidden flex justify-center items-center bg-slate-100">
      <div className="w-[800px] rounded border-2 border-slate-200">
        <CalendarComponent />
      </div>
    </main>
  );
}
