const app = document.getElementById("app");

const docs = [
  {
    key: "skill",
    title: "SKILL.md",
    badge: "Skill contract",
    summary: "Defines the multi-agent team, its roles, and the visible thread structure.",
    path: "./SKILL.md",
    keyTerm: "todo-multi-agent-team",
    points: [
      "Roles: Intake, Priority, Scheduling, Review, Coordinator",
      "Threads: intakeThread through coordinatorThread",
      "Inputs: raw todo text and short task lines",
      "Outputs: cleaned list, prioritized board, review notes"
    ],
    source: [
      "# Skill Set Name",
      "`todo-multi-agent-team`",
      "### Roles",
      "- `Intake Agent`...",
      "- `Priority Agent`...",
      "- `Scheduling Agent`...",
      "- `Review Agent`...",
      "- `Coordinator Agent`..."
    ]
  },
  {
    key: "thread",
    title: "multi-agent-thread.md",
    badge: "Thread map",
    summary: "Shows how each specialist receives input, makes a decision, and hands off work.",
    path: "./multi-agent-thread.md",
    keyTerm: "coordinatorThread",
    points: [
      "intakeThread cleans raw input",
      "priorityThread scores tasks",
      "scheduleThread builds the draft board",
      "reviewThread flags issues",
      "coordinatorThread publishes the result"
    ],
    source: [
      "# Multi-Agent Thread Map",
      "## Thread Overview",
      "- `intakeThread`...",
      "- `priorityThread`...",
      "- `scheduleThread`...",
      "- `reviewThread`...",
      "- `coordinatorThread`..."
    ]
  },
  {
    key: "workflow",
    title: "multi-agent-workflow.md",
    badge: "Workflow guide",
    summary: "Explains the todo process from raw input to final coordinated board.",
    path: "./multi-agent-workflow.md",
    keyTerm: "coordinatorThread",
    points: [
      "Goal: clean, score, schedule, review, and publish",
      "Role: Coordinator Agent publishes the answer",
      "Thread flow ends in coordinatorThread",
      "Success requires visible specialist handoffs"
    ],
    source: [
      "# Multi-Agent Workflow",
      "## Workflow Goal",
      "Take raw todo text, clean it, score it, schedule it, review it...",
      "## Workflow Steps",
      "1. Intake Agent...",
      "2. Priority Agent...",
      "3. Scheduling Agent...",
      "4. Review Agent...",
      "5. Coordinator Agent..."
    ]
  }
];

const threads = [
  {
    id: "intakeThread",
    agent: "Intake Agent",
    title: "intakeThread",
    purpose: "Receives raw todo text and returns a clean task list.",
    decision: "Accept the non-empty lines as task candidates and normalize them.",
    next: "priorityThread"
  },
  {
    id: "priorityThread",
    agent: "Priority Agent",
    title: "priorityThread",
    purpose: "Scores urgency, importance, category, and priority.",
    decision: "Use urgency words, delivery clues, and task type to score items.",
    next: "scheduleThread"
  },
  {
    id: "scheduleThread",
    agent: "Scheduling Agent",
    title: "scheduleThread",
    purpose: "Places scored tasks into Today, This Week, or Later.",
    decision: "Prefer high priority and urgent items for Today.",
    next: "reviewThread"
  },
  {
    id: "reviewThread",
    agent: "Review Agent",
    title: "reviewThread",
    purpose: "Checks the draft board for vague items, overload, and missing owners.",
    decision: "Collect review notes before the final merge.",
    next: "coordinatorThread"
  },
  {
    id: "coordinatorThread",
    agent: "Coordinator Agent",
    title: "coordinatorThread",
    purpose: "Merges all handoffs and publishes the final answer.",
    decision: "Show the final coordinated board and the full thread history.",
    next: "none"
  }
];

const workflowSteps = [
  {
    title: "Intake Agent cleans the input",
    detail: "Raw to-do text is split into task candidates and normalized for planning."
  },
  {
    title: "Priority Agent scores tasks",
    detail: "Urgency, importance, and category signals are converted into planning scores."
  },
  {
    title: "Scheduling Agent builds the board",
    detail: "Tasks are placed into Today, This Week, or Later based on the score."
  },
  {
    title: "Review Agent checks for issues",
    detail: "Vague items, overload, and missing owner details are flagged."
  },
  {
    title: "Coordinator Agent publishes the result",
    detail: "The coordinator merges the handoffs and returns the final board."
  }
];

const metrics = [
  { label: "Roles", value: "5" },
  { label: "Threads", value: "5" },
  { label: "Handoffs", value: "4" },
  { label: "Final publisher", value: "Coordinator Agent" },
  { label: "Board lanes", value: "3" }
];

let activeDoc = "skill";

render();

function render() {
  const active = docs.find((doc) => doc.key === activeDoc) || docs[0];

  app.innerHTML = `
    <main class="shell">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">Agentic Manual Studio</p>
          <h1>Multi-agent todo workflow built from the three manual files.</h1>
          <p class="lede">
            This page turns <strong>SKILL.md</strong>, <strong>multi-agent-thread.md</strong>, and
            <strong>multi-agent-workflow.md</strong> into a visual specialist team dashboard.
          </p>
          <p class="supporting">
            The page keeps the roles, handoffs, and final coordinator visible together so the
            workflow contract stays easy to understand.
          </p>
          <div class="chip-row">
            <div class="chip">
              <span>Skill</span>
              <strong>todo-multi-agent-team</strong>
            </div>
            <div class="chip">
              <span>Final thread</span>
              <strong>coordinatorThread</strong>
            </div>
            <div class="chip">
              <span>Output</span>
              <strong>Today / This Week / Later</strong>
            </div>
          </div>
        </div>
        <div class="route-note">
          Each agent has a clear job, a named thread, and a handoff to the next specialist.
        </div>
      </section>

      <section class="metrics">
        ${metrics
          .map(
            (metric) => `
              <article class="metric-card">
                <span>${metric.label}</span>
                <strong>${metric.value}</strong>
              </article>
            `
          )
          .join("")}
      </section>

      <section class="layout">
        <aside class="stack">
          <div class="panel">
            <div class="panel-inner">
              <div class="panel-head">
                <div>
                  <p class="section-kicker">Manual cards</p>
                  <h2>The three source files</h2>
                </div>
              </div>
              <div class="docs">
                ${docs.map(renderDocCard).join("")}
              </div>
            </div>
          </div>

          <div class="panel">
            <div class="panel-inner">
              <div class="panel-head">
                <div>
                  <p class="section-kicker">Thread map</p>
                  <h2>Specialist agents and handoffs</h2>
                </div>
              </div>
              <div class="thread-grid">
                ${threads.map(renderThreadCard).join("")}
              </div>
            </div>
          </div>
        </aside>

        <section class="stack">
          <section class="panel workflow-panel">
            <div class="panel-inner">
              <div class="panel-head">
                <div>
                  <p class="section-kicker">Workflow path</p>
                  <h2>How the coordinator closes the loop</h2>
                </div>
              </div>
              <div class="workflow-grid">
                ${workflowSteps
                  .map(
                    (step, index) => `
                      <article class="workflow-card">
                        <header>
                          <span class="step-number">${index + 1}</span>
                          <h3>${step.title}</h3>
                        </header>
                        <p>${step.detail}</p>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </div>
          </section>

          <section class="panel">
            <div class="panel-inner">
              <div class="panel-head">
                <div>
                  <p class="section-kicker">Document viewer</p>
                  <h2>Switch between the three files</h2>
                </div>
              </div>

              <div class="source-switcher" role="tablist" aria-label="Document tabs">
                ${docs
                  .map(
                    (doc) => `
                      <button type="button" class="${doc.key === active.key ? "active" : ""}" data-doc="${doc.key}">
                        ${doc.title}
                      </button>
                    `
                  )
                  .join("")}
              </div>

              ${renderSourceView(active)}
            </div>
          </section>
        </section>
      </section>
    </main>
  `;

  app.querySelectorAll("[data-doc]").forEach((button) => {
    button.addEventListener("click", () => {
      activeDoc = button.dataset.doc;
      render();
    });
  });
}

function renderDocCard(doc) {
  return `
    <article class="doc-card">
      <header>
        <div>
          <p class="badge">${doc.badge}</p>
          <h3>${doc.title}</h3>
        </div>
        <span class="section-kicker">${doc.keyTerm}</span>
      </header>
      <p>${doc.summary}</p>
      <ul class="doc-list">
        ${doc.points.map((point) => `<li>${point}</li>`).join("")}
      </ul>
    </article>
  `;
}

function renderThreadCard(thread) {
  return `
    <article class="thread-card">
      <header>
        <div>
          <span class="badge">${thread.agent}</span>
          <h3>${thread.title}</h3>
        </div>
        <span class="section-kicker">${thread.next}</span>
      </header>
      <p>${thread.purpose}</p>
      <ul class="thread-path">
        <li><strong>Decision:</strong> ${thread.decision}</li>
        <li><strong>Next handoff:</strong> ${thread.next}</li>
      </ul>
    </article>
  `;
}

function renderSourceView(doc) {
  return `
    <article class="source-view">
      <div class="source-meta">
        <div>
          <span>Source file</span>
          <h3>${doc.path}</h3>
        </div>
        <div>
          <span>Key term</span>
          <strong>${doc.keyTerm}</strong>
        </div>
      </div>
      <pre>${escapeHtml(doc.source.join("\n"))}</pre>
    </article>
  `;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
