import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const SAMPLE_TODOS = `Submit project update today
Email mentor about review notes
Prepare slides for Friday demo
Buy snacks for study group
Read agentic workflow chapter
Plan something for later`;

const SINGLE_AGENT_BLUEPRINT = {
  skillName: "todo-single-agent-manager",
  skillDescription:
    "One agent reads raw todo input, organizes it into a prioritized board, reviews the result for clarity issues, and returns the final plan in a single thread.",
  role: "Todo Manager Agent",
  threadName: "singleAgentThread",
  threadPurpose: "Receives the todo input, cleans and plans the tasks, reviews the draft, applies clarification notes, and returns the final board.",
  workflowGoal:
    "Take raw todo text from the user, clean it, prioritize it, review it for clarity, and return a final board with three lanes.",
  workflowSteps: [
    "Receive the raw todo text from the app.",
    "Split the text into individual task items.",
    "Detect urgency, priority, and category signals for each task.",
    "Place each task into Today, This Week, or Later.",
    "Review the draft board for vague tasks, missing owner details, or overload.",
    "Add clarification notes when a task needs more detail.",
    "Return the final prioritized board in singleAgentThread."
  ],
  outputs: [
    "A cleaned todo list.",
    "A prioritized board with Today, This Week, and Later lanes.",
    "Clarification notes for tasks that need follow-up.",
    "A single visible thread named singleAgentThread."
  ],
  successCriteria: [
    "Only one agent is used.",
    "Only one thread is used.",
    "The final result matches the board structure shown in the app.",
    "The workflow includes cleanup, prioritization, review, and final output.",
    "The skill file, thread file, and workflow document all describe the same todo process."
  ]
};

const ROUTES = {
  "/single-agent": {
    mode: "single",
    title: "Single-Agent Todo Studio",
    subtitle:
      "A single agent owns the full todo workflow from raw text to a cleaned, prioritized board.",
    endpoint: "/api/single-agent/todos",
    accent: "mint",
    narrative:
      "This view is designed around the files in Agentic-manual: the skill contract, the singleAgentThread file, and the workflow write-up."
  },
  "/multi-agent": {
    mode: "multi",
    title: "Multi-Agent Comparison View",
    subtitle:
      "Specialized agents split the work into visible handoffs before a coordinator publishes the final board.",
    endpoint: "/api/multi-agent/todos",
    accent: "gold",
    narrative:
      "This route is still available so students can compare a single continuous thread with a specialist handoff pipeline."
  }
};

function App() {
  const route = ROUTES[window.location.pathname] || ROUTES["/single-agent"];
  const [text, setText] = useState(SAMPLE_TODOS);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  async function runWorkflow(event) {
    event.preventDefault();

    if (!text.trim()) {
      setError("Add a few tasks before running the workflow.");
      return;
    }

    setError("");
    setResult(null);
    setIsRunning(true);

    try {
      const response = await fetch(route.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "The workflow could not complete.");
      }

      setResult(payload);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <main className={`app theme-${route.accent}`}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Module 07 Agentic Workflow</p>
          <h1>{route.title}</h1>
          <p className="lede">{route.subtitle}</p>
          <p className="supporting">{route.narrative}</p>
          <div className="chip-row" aria-label="Workflow highlights">
            <Chip label="Skill" value="todo-single-agent-manager" />
            <Chip label="Thread" value="singleAgentThread" />
            <Chip label="Output" value="Today / This Week / Later" />
          </div>
        </div>

        <nav className="route-switcher" aria-label="Demo routes">
          <a className={route.mode === "single" ? "active" : ""} href="/single-agent">
            Single Agent
          </a>
          <a className={route.mode === "multi" ? "active" : ""} href="/multi-agent">
            Multi Agent
          </a>
        </nav>
      </header>

      <section className="content-grid">
        <aside className="sidebar">
          <BlueprintPanel blueprint={SINGLE_AGENT_BLUEPRINT} />
          <StatsPanel result={result} />
        </aside>

        <section className="workspace">
          <WorkflowForm
            error={error}
            isRunning={isRunning}
            onRun={runWorkflow}
            onSample={() => setText(SAMPLE_TODOS)}
            text={text}
            setText={setText}
          />

          <WorkflowTimeline mode={route.mode} result={result} isRunning={isRunning} />

          <TaskBoard board={result?.board} />
        </section>
      </section>
    </main>
  );
}

function Chip({ label, value }) {
  return (
    <div className="chip">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function BlueprintPanel({ blueprint }) {
  return (
    <section className="panel blueprint-panel" aria-label="Skill blueprint">
      <div className="panel-title">
        <p className="section-kicker">Docs-backed blueprint</p>
        <h2>Skill, thread, workflow</h2>
      </div>

      <div className="blueprint-stack">
        <article className="blueprint-card">
          <span>Skill</span>
          <h3>{blueprint.skillName}</h3>
          <p>{blueprint.skillDescription}</p>
        </article>

        <article className="blueprint-card">
          <span>Thread</span>
          <h3>{blueprint.threadName}</h3>
          <p>{blueprint.threadPurpose}</p>
        </article>

        <article className="blueprint-card">
          <span>Role</span>
          <h3>{blueprint.role}</h3>
          <p>{blueprint.workflowGoal}</p>
        </article>
      </div>

      <div className="blueprint-lists">
        <ListBlock title="Workflow steps" items={blueprint.workflowSteps} />
        <ListBlock title="Expected outputs" items={blueprint.outputs} />
        <ListBlock title="Success criteria" items={blueprint.successCriteria} />
      </div>
    </section>
  );
}

function ListBlock({ title, items }) {
  return (
    <article className="list-block">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function StatsPanel({ result }) {
  const summary = result?.board
    ? [
        { label: "Today", value: result.board.today.length },
        { label: "This Week", value: result.board.thisWeek.length },
        { label: "Later", value: result.board.later.length }
      ]
    : [
        { label: "Today", value: "0" },
        { label: "This Week", value: "0" },
        { label: "Later", value: "0" }
      ];

  return (
    <section className="panel stats-panel" aria-label="Board summary">
      <div className="panel-title">
        <p className="section-kicker">Board snapshot</p>
        <h2>Lane counts</h2>
      </div>
      <div className="stats-grid">
        {summary.map((item) => (
          <article className="stat-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
      <div className="meta-line">
        <span>Thread</span>
        <strong>{result?.threadName || "singleAgentThread"}</strong>
      </div>
      <div className="meta-line">
        <span>Mode</span>
        <strong>{result?.mode || "single-agent"}</strong>
      </div>
    </section>
  );
}

function WorkflowForm({ error, isRunning, onRun, onSample, text, setText }) {
  return (
    <form className="panel form-panel" onSubmit={onRun}>
      <div className="panel-title">
        <div>
          <p className="section-kicker">Run the app</p>
          <h2>Raw todo input</h2>
        </div>
        <button className="secondary" type="button" onClick={onSample}>
          Load sample
        </button>
      </div>

      <textarea
        aria-label="Raw todo text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={12}
        placeholder="Enter one task per line..."
      />

      {error ? (
        <p className="error" role="alert">
          {error}
        </p>
      ) : (
        <p className="form-hint">Paste or edit the list, then run the workflow to see each stage.</p>
      )}

      <button type="submit" disabled={isRunning}>
        {isRunning ? "Workflow running..." : "Run workflow"}
      </button>
    </form>
  );
}

function WorkflowTimeline({ mode, result, isRunning }) {
  const placeholderThreads = useMemo(
    () =>
      mode === "single"
        ? [
            {
              id: "singleAgentThread",
              title: "Single Agent Thread",
              agent: "Single Agent",
              stages: []
            }
          ]
        : ["Intake Agent", "Priority Agent", "Scheduling Agent", "Review Agent", "Coordinator Agent"].map(
            (agent) => ({
              id: agent.toLowerCase().replace(/\s+/g, "-"),
              title: `${agent} Thread`,
              agent,
              stages: []
            })
          ),
    [mode]
  );

  const threads = result?.threads || placeholderThreads;

  return (
    <section className="panel timeline-panel" aria-label="Workflow threads">
      <div className="panel-title">
        <div>
          <p className="section-kicker">Workflow trace</p>
          <h2>{mode === "single" ? "singleAgentThread" : "Thread handoffs"}</h2>
        </div>
        <span className="timeline-note">
          {isRunning ? "Processing..." : "Stages appear after the run"}
        </span>
      </div>

      <div className={`threads ${mode === "multi" ? "multi" : "single"}`}>
        {threads.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} isRunning={isRunning} />
        ))}
      </div>
    </section>
  );
}

function ThreadCard({ thread, isRunning }) {
  return (
    <article className="thread-card">
      <div className="thread-heading">
        <span>{thread.agent}</span>
        <h3>{thread.title}</h3>
      </div>

      {thread.stages.length ? (
        <div className="stage-list">
          {thread.stages.map((stage) => (
            <StageCard key={stage.id} stage={stage} />
          ))}
        </div>
      ) : (
        <p className="empty-state">
          {isRunning ? "Waiting for the next handoff..." : "Run the workflow to reveal this thread."}
        </p>
      )}
    </article>
  );
}

function StageCard({ stage }) {
  return (
    <article className="stage-card">
      <div className="stage-top">
        <span className={`status ${stage.status}`}>{stage.status}</span>
        <h4>{stage.title}</h4>
      </div>
      <p>{stage.message}</p>
      <dl>
        <Detail label="Input" value={stage.details.input} />
        <Detail label="Decision" value={stage.details.decision} />
        <Detail label="Handoff" value={stage.details.handoff} />
        <Detail label="Changed" value={stage.details.changed} />
      </dl>
    </article>
  );
}

function Detail({ label, value }) {
  return (
    <div className="detail-row">
      <dt>{label}</dt>
      <dd>{formatValue(value)}</dd>
    </div>
  );
}

function TaskBoard({ board }) {
  const lanes = [
    ["today", "Today"],
    ["thisWeek", "This Week"],
    ["later", "Later"]
  ];

  return (
    <section className="panel board-panel" aria-label="Final prioritized task board">
      <div className="panel-title">
        <div>
          <p className="section-kicker">Final board</p>
          <h2>Prioritized todo lanes</h2>
        </div>
        <p className="board-note">Matches the cleaned board produced by the backend workflow.</p>
      </div>

      <div className="lanes">
        {lanes.map(([key, title]) => (
          <article className="lane" key={key}>
            <h3>{title}</h3>
            {board?.[key]?.length ? (
              <ul>
                {board[key].map((task) => (
                  <li key={task.id}>
                    <strong>{task.title}</strong>
                    <span>
                      {task.category} · P{task.priority}
                    </span>
                    {task.notes.length ? <em>{task.notes.join(" ")}</em> : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">No tasks yet.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "None";
  }

  if (value && typeof value === "object") {
    return Object.entries(value)
      .map(([key, count]) => `${formatLabel(key)}: ${count}`)
      .join(", ");
  }

  return String(value || "None");
}

function formatLabel(value) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
