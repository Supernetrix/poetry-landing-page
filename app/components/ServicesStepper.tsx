"use client";

import { useState } from "react";

const STAGES = [
  { name: "Design", caption: "Ideas rooted in context" },
  { name: "Manage", caption: "Precision at every stage" },
  { name: "Build", caption: "Spaces for a better tomorrow" },
] as const;

export default function ServicesStepper() {
  const [active, setActive] = useState(1);

  return (
    <div className="services-stepper" role="tablist" aria-label="Design, manage, build">
      <span className="services-stepper__rail" aria-hidden="true" />
      {STAGES.map((stage, index) => {
        const step = index + 1;
        const state = step < active ? "completed" : step === active ? "active" : "upcoming";

        return (
          <button
            key={stage.name}
            type="button"
            role="tab"
            aria-selected={state === "active"}
            className={`services-stepper__item is-${state}`}
            onClick={() => setActive(step)}
          >
            <strong>{stage.name}</strong>
            <span className="services-stepper__dot" aria-hidden="true" />
            <em>{stage.caption}</em>
          </button>
        );
      })}
    </div>
  );
}
