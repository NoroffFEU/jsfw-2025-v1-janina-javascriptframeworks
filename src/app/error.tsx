"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main style={{ padding: "1.5rem", maxWidth: "700px" }}>
      <h1 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
        Something went wrong
      </h1>
      <p style={{ color: "#555", marginBottom: "1rem" }}>
        The shop couldn’t load right now. Try again in a moment.
      </p>

      <button
        onClick={reset}
        style={{
          padding: "10px 14px",
          borderRadius: "12px",
          border: "1px solid #ddd",
          background: "#fff",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Retry
      </button>
    </main>
  );
}
