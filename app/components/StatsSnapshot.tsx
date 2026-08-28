import "./StatsSnapshot.css";

const STATS = [
  { value: "50+", label: "Projects" },
  { value: "30+", label: "Ongoing" },
  { value: "20+", label: "Delivered" },
] as const;

export default function StatsSnapshot() {
  return (
    <section className="stats-snapshot" aria-label="Project statistics">
      <div className="stats-snapshot__row">
        {STATS.map((stat) => (
          <div key={stat.label} className="stats-snapshot__stat">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
      <hr className="stats-snapshot__rule" />
    </section>
  );
}
