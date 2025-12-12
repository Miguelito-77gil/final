import React, { useState } from "react";

const MAX_TIME_UNIT = 500;

const getInitialProcesses = () => [
  { pid: "P1", arrival: "", burst: "" },
  { pid: "P2", arrival: "", burst: "" },
  { pid: "P3", arrival: "", burst: "" },
];

function fcfs(processes) {
  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
  const results = [];
  const timeline = [];
  let time = 0;

  for (const p of sorted) {
    if (p.arrival > time) {
      for (let i = 0; i < p.arrival - time; i++) timeline.push("IDLE");
      time = p.arrival;
    }

    for (let i = 0; i < p.burst; i++) timeline.push(p.pid);
    const completion = time + p.burst;
    results.push({
      ...p,
      completion,
      turnaround: completion - p.arrival,
      waiting: completion - p.arrival - p.burst,
    });
    time = completion;
  }

  const compressedTimeline = timeline.reduce((acc, cur) => {
    if (!acc.length || acc[acc.length - 1] !== cur) acc.push(cur);
    return acc;
  }, []);

  return { results, timeline: compressedTimeline };
}

export default function FCFSSimulator() {
  const [processes, setProcesses] = useState(getInitialProcesses());
  const [results, setResults] = useState(null);
  const [timeline, setTimeline] = useState(null);
  const [error, setError] = useState("");

  const updateField = (i, field, value) => {
    const copy = [...processes];
    setError("");
    if (field !== "pid") {
      if (!/^\d*$/.test(value)) return;
      copy[i][field] = value === "" ? "" : parseInt(value, 10);
    } else {
      copy[i][field] = value;
    }
    setProcesses(copy);
  };

  const addProcess = () => {
    setProcesses([
      ...processes,
      { pid: `P${processes.length + 1}`, arrival: "", burst: "" },
    ]);
    setResults(null);
    setTimeline(null);
  };

  const removeProcess = (i) => {
    const copy = processes.filter((_, idx) => idx !== i);
    copy.forEach((p, idx) => (p.pid = `P${idx + 1}`));
    setProcesses(copy);
    setResults(null);
    setTimeline(null);
    setError("");
  };

  const simulate = () => {
    setError("");
    const validProcesses = [];

    for (const p of processes) {
      if (!p.pid.trim()) return setError("PID cannot be empty.");
      if (p.arrival === "" || p.burst === "")
        return setError(`All fields must be filled for ${p.pid}`);
      const arrival = Number(p.arrival);
      const burst = Number(p.burst);
      if (arrival < 0 || burst <= 0) return setError(`${p.pid}: Invalid time values`);
      if (arrival > MAX_TIME_UNIT || burst > MAX_TIME_UNIT)
        return setError(`${p.pid}: Max time unit exceeded`);
      validProcesses.push({ pid: p.pid, arrival, burst });
    }

    if (!validProcesses.length) return setError("No processes to simulate");

    const output = fcfs(validProcesses);
    setResults(output.results);
    setTimeline(output.timeline);
  };

  const avgW = results ? results.reduce((a, b) => a + b.waiting, 0) / results.length : 0;
  const avgT = results ? results.reduce((a, b) => a + b.turnaround, 0) / results.length : 0;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-12 font-sans">
      <h1 className="text-4xl font-extrabold text-indigo-600 mb-8 text-center">
        FCFS CPU Scheduling Simulator
      </h1>

      {/* Input Table */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-10 max-w-4xl mx-auto">
        {error && (
          <p className="text-red-600 font-semibold mb-4 text-center">{error}</p>
        )}
        <table className="w-full border-collapse mb-6 text-center">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border px-4 py-2 font-medium">PID</th>
              <th className="border px-4 py-2 font-medium">Arrival</th>
              <th className="border px-4 py-2 font-medium">Burst</th>
              <th className="border px-4 py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p, i) => (
              <tr key={i} className="even:bg-indigo-50">
                <td className="border px-4 py-2 font-semibold">{p.pid}</td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    min="0"
                    value={p.arrival}
                    onChange={(e) => updateField(i, "arrival", e.target.value)}
                    className="w-full text-center rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    min="1"
                    value={p.burst}
                    onChange={(e) => updateField(i, "burst", e.target.value)}
                    className="w-full text-center rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => removeProcess(i)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-1 transition"
                    aria-label={`Remove process ${p.pid}`}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between">
          <button
            onClick={addProcess}
            className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-5 py-2 rounded-md font-semibold transition"
          >
            + Add
          </button>
          <button
            onClick={simulate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md font-semibold transition"
          >
            Simulate
          </button>
        </div>
      </div>

      {/* Output */}
      {results && timeline && (
        <section className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-5 text-indigo-600">
            Simulation Output
          </h2>

          <div className="mb-6">
            <p className="mb-2 font-semibold">Gantt Chart:</p>
            <div className="flex gap-1 overflow-x-auto whitespace-nowrap">
              {timeline.map((t, idx) => (
                <span
                  key={idx}
                  className={`inline-block px-3 py-1 rounded-sm text-sm font-semibold ${
                    t === "IDLE" ? "bg-gray-400 text-gray-700" : "bg-indigo-600 text-white"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <table className="w-full border-collapse text-center">
            <thead>
              <tr className="bg-indigo-100">
                <th className="border px-4 py-2 font-medium">PID</th>
                <th className="border px-4 py-2 font-medium">Arrival</th>
                <th className="border px-4 py-2 font-medium">Burst</th>
                <th className="border px-4 py-2 font-medium">Completion</th>
                <th className="border px-4 py-2 font-medium">Turnaround</th>
                <th className="border px-4 py-2 font-medium">Waiting</th>
              </tr>
            </thead>
            <tbody>
              {results.map((p) => (
                <tr key={p.pid} className="even:bg-indigo-50">
                  <td className="border px-4 py-2 font-semibold">{p.pid}</td>
                  <td className="border px-4 py-2">{p.arrival}</td>
                  <td className="border px-4 py-2">{p.burst}</td>
                  <td className="border px-4 py-2">{p.completion}</td>
                  <td className="border px-4 py-2">{p.turnaround}</td>
                  <td className="border px-4 py-2">{p.waiting}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-center gap-12 text-lg font-semibold">
            <p>
              Avg Waiting: <span className="text-red-600">{avgW.toFixed(2)}</span>
            </p>
            <p>
              Avg Turnaround: <span className="text-indigo-600">{avgT.toFixed(2)}</span>
            </p>
          </div>
        </section>
      )}
    </main>
  );
}