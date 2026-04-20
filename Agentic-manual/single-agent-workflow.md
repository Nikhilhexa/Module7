# Single-Agent Workflow

This file describes the todo app workflow that uses one agent and one thread from start to finish.

## Workflow Goal

Take raw todo text from the user, clean it, prioritize it, review it for clarity, and return a final board with three lanes.

## Skill Name

`todo-single-agent-manager`

## Role

- `Todo Manager Agent`: owns the entire workflow and publishes the final result.

## Thread

- `singleAgentThread`: receives the todo input, processes the board, reviews the result, and returns the final answer.

## Input

- Raw todo text entered in the app.
- Short task lines that may include urgency words, vague phrases, or delivery language.

## Workflow Steps

1. Receive the raw todo text from the app.
2. Split the text into individual task items.
3. Detect urgency, priority, and category signals for each task.
4. Place each task into `Today`, `This Week`, or `Later`.
5. Review the draft board for vague tasks, missing owner details, or overload.
6. Add clarification notes when a task needs more detail.
7. Return the final prioritized board in `singleAgentThread`.

## Output

- A cleaned todo list.
- A prioritized board with `Today`, `This Week`, and `Later` lanes.
- Clarification notes for tasks that need follow-up.
- A single visible thread named `singleAgentThread`.

## Success Criteria

- Only one agent is used.
- Only one thread is used.
- The final result matches the board structure shown in the app.
- The workflow includes cleanup, prioritization, review, and final output.
- The skill file, thread file, and workflow document all describe the same todo process.
