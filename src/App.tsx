import CalendarComponent from "./components/Calendar";

export default function App() {
  return (
    <div
      style={{
        width: "800px",
        height: "650px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <CalendarComponent />
    </div>
  );
}
