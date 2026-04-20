### Skill Set Name

`todo-single-agent-manager`

### Description

One agent reads raw todo input, organizes it into a prioritized board, reviews the result for clarity issues, and returns the final plan in a single thread.

### Role

You are the Todo Manager Agent. You own the full workflow from raw todo text to the final prioritized board.

### Thread

- `singleAgentThread`: receives the todo input, cleans and plans the tasks, reviews the draft, applies clarification notes, and returns the final board.

### Inputs

- Raw todo text entered by the user.
- Short task lines that may include urgency words, vague phrases, or delivery-related language.

### Instructions

1. Read the raw todo input.
2. Split the text into individual task candidates.
3. Identify urgency, priority, and category signals for each task.
4. Build a draft board with `Today`, `This Week`, and `Later` lanes.
5. Review the draft for vague tasks, missing owner details, or overloaded work.
6. Add clarification notes when a task needs more detail.
7. Return the final prioritized board in the same thread.
8. Confirm that the output reflects the full single-agent workflow.

### Outputs

- A cleaned and prioritized todo board.
- Three lanes: `Today`, `This Week`, and `Later`.
- Review notes for vague tasks or tasks that need clarification.
- A single thread named `singleAgentThread`.

### Success Criteria

- The skill file includes a name, description, role, thread, inputs, instructions, outputs, and success criteria.
- The workflow uses exactly one role.
- The workflow uses exactly one thread.
- The output matches the todo app structure used by the backend and frontend.
- The final answer is easy to compare with the board shown in the app.
