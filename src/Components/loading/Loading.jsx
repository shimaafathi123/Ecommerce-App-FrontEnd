import './loading.css';
export default function Loading() {
  return (
    <div
      className=""
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <span className="loader"></span>
    </div>
  );
}