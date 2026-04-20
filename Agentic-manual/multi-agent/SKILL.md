# Skill Set Name

`todo-multi-agent-team`

### Description

A team of specialist agents reads raw todo input, cleans it, prioritizes it, schedules it, reviews the draft, and returns a final coordinated board.

### Roles

- `Intake Agent`: cleans raw todo text into explicit task items.
- `Priority Agent`: scores urgency, importance, and category signals.
- `Scheduling Agent`: places tasks into `Today`, `This Week`, or `Later`.
- `Review Agent`: checks the draft board for vague items, missing owners, and overload.
- `Coordinator Agent`: merges the handoffs and publishes the final board.

### Threads

- `intakeThread`: receives the raw todo input and returns a clean task list.
- `priorityThread`: receives the cleaned list and returns scored tasks.
- `scheduleThread`: receives the scored tasks and returns a draft board.
- `reviewThread`: receives the draft board and returns review notes.
- `coordinatorThread`: receives all handoffs and returns the final result.

### Inputs

- Raw todo text entered by the user.
- Short task lines that may include urgency words, vague phrases, or delivery-related language.

### Instructions

1. Intake Agent receives the raw todo text and cleans it into task candidates.
2. Priority Agent receives the cleaned task list and assigns urgency, importance, and category signals.
3. Scheduling Agent receives the scored tasks and places them into the correct lane.
4. Review Agent receives the draft board and checks for vague tasks, overload, or missing owner details.
5. Coordinator Agent receives all handoffs and applies any final notes.
6. Coordinator Agent publishes the completed board in the final response.

### Outputs

- A cleaned todo list.
- A prioritized board with `Today`, `This Week`, and `Later` lanes.
- Review notes for vague or risky tasks.
- A visible set of specialist threads ending in `coordinatorThread`.

### Success Criteria

- The workflow uses multiple roles with distinct responsibilities.
- Every role has a matching thread.
- Each thread has a clear input and output.
- The Coordinator Agent is the only agent that publishes the final answer.
- The final board matches the todo app structure used by the backend.
