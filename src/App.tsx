import CalendarComponent from "./components/Calendar";

export default function App() {
  return (
    <main className="w-screen h-screen overflow-hidden flex justify-center items-center bg-slate-100">
      <div className="w-[800px] rounded border-2 border-slate-200">
        <CalendarComponent />
      </div>
    </main>
  );
}
