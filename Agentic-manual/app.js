const app = document.getElementById("app");

const docs = [
  {
    key: "skill",
    title: "SKILL.md",
    badge: "Skill contract",
    summary: "Defines the todo workflow as one agent, one role, and one thread.",
    path: "./SKILL.md",
    highlight: "todo-single-agent-manager",
    points: [
      "Role: Todo Manager Agent",
      "Thread: singleAgentThread",
      "Inputs: raw todo text plus short task lines",
      "Outputs: prioritized board, lane structure, review notes"
    ],
    source: [
      "# Skill Set Name",
      "`todo-single-agent-manager`",
      "### Description",
      "One agent reads raw todo input, organizes it into a prioritized board..."
    ]
  },
  {
    key: "thread",
    title: "singleAgentThread",
    badge: "Thread path",
    summary: "Shows the full single-agent todo flow from input to final response.",
    path: "./singleAgentThread",
    highlight: "singleAgentThread",
    points: [
      "Purpose: full single-agent todo workflow",
      "Decision path: clean, score, board, review, adjust, complete",
      "Output: cleaned board and review notes",
      "Next handoff: none"
    ],
    source: [
      "# Single Agent Thread",
      "Thread name: `singleAgentThread`",
      "### Purpose",
      "This thread represents the full single-agent todo workflow used by the app."
    ]
  },
  {
    key: "workflow",
    title: "single-agent-workflow.md",
    badge: "Workflow guide",
    summary: "Explains the todo app workflow and how the files fit together.",
    path: "./single-agent-workflow.md",
    highlight: "todo-single-agent-manager",
    points: [
      "Goal: clean, prioritize, review, and publish the todo board",
      "Role: Todo Manager Agent",
      "Thread: singleAgentThread",
      "Success: all three files describe the same process"
    ],
    source: [
      "# Single-Agent Workflow",
      "This file describes the todo app workflow that uses one agent and one thread from start to finish.",
      "## Workflow Goal",
      "Take raw todo text from the user, clean it, prioritize it..."
    ]
  }
];

const workflowSteps = [
  {
    title: "Receive the raw todo text",
    detail: "The app passes the user's list into the workflow."
  },
  {
    title: "Split it into task candidates",
    detail: "Each line becomes a todo item for planning."
  },
  {
    title: "Detect urgency and category signals",
    detail: "The agent looks for deadline words, task type, and priority hints."
  },
  {
    title: "Build the draft board",
    detail: "Tasks are placed into Today, This Week, or Later."
  },
  {
    title: "Review for clarity issues",
    detail: "The workflow checks for vague items, missing owners, and overload."
  },
  {
    title: "Add clarification notes",
    detail: "Tasks that need more detail get annotated before completion."
  },
  {
    title: "Return the final board",
    detail: "The single thread publishes the completed result."
  }
];

const successCriteria = [
  "Only one agent is used.",
  "Only one thread is used.",
  "The final result matches the board structure shown in the app.",
  "The workflow includes cleanup, prioritization, review, and final output.",
  "The skill file, thread file, and workflow document all describe the same todo process."
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
          <h1>Single-agent todo workflow, built from the three manual files.</h1>
          <p class="lede">
            This page turns <strong>SKILL.md</strong>, <strong>singleAgentThread</strong>, and
            <strong>single-agent-workflow.md</strong> into a visual guide for the todo app.
          </p>
          <p class="supporting">
            The layout keeps the contract, the thread path, and the workflow steps visible at the
            same time so the implementation stays aligned with the documentation.
          </p>
          <div class="chip-row">
            <div class="chip">
              <span>Skill</span>
              <strong>todo-single-agent-manager</strong>
            </div>
            <div class="chip">
              <span>Thread</span>
              <strong>singleAgentThread</strong>
            </div>
            <div class="chip">
              <span>Output</span>
              <strong>Today / This Week / Later</strong>
            </div>
          </div>
        </div>
        <div class="route-note">
          A compact documentation-driven frontend for the todo app example in <code>Agentic-manual</code>.
        </div>
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
                  <p class="section-kicker">Checklist</p>
                  <h2>Success criteria</h2>
                </div>
              </div>
              <ul class="doc-list">
                ${successCriteria.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </div>
          </div>
        </aside>

        <section class="stack">
          <section class="panel workflow-panel">
            <div class="panel-inner">
              <div class="panel-head">
                <div>
                  <p class="section-kicker">Workflow path</p>
                  <h2>singleAgentThread as a visible sequence</h2>
                </div>
              </div>
              <div class="step-grid">
                ${workflowSteps
                  .map(
                    (step, index) => `
                    <article class="step-card">
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

              <div class="source-tabs" role="tablist" aria-label="Document tabs">
                ${docs
                  .map(
                    (doc) => `
                      <button
                        type="button"
                        class="${doc.key === active.key ? "active" : ""}"
                        data-doc="${doc.key}"
                      >
                        ${doc.title}
                      </button>
                    `
                  )
                  .join("")}
              </div>

              ${renderSourceCard(active)}
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
        <span class="section-kicker">${doc.highlight}</span>
      </header>
      <p>${doc.summary}</p>
      <ul class="doc-list">
        ${doc.points.map((point) => `<li>${point}</li>`).join("")}
      </ul>
    </article>
  `;
}

function renderSourceCard(doc) {
  return `
    <article class="source-card">
      <div class="source-meta">
        <div>
          <span>Source file</span>
          <h3>${doc.path}</h3>
        </div>
        <div>
          <span>Key term</span>
          <strong>${doc.highlight}</strong>
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
