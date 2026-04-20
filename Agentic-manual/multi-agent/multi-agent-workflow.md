# Multi-Agent Workflow

This file describes the todo app workflow that uses specialist agents and named handoff threads.

## Workflow Goal

Take raw todo text, clean it, score it, schedule it, review it, and publish a final board through a coordinator.

## Skill Name

`todo-multi-agent-team`

## Roles

- `Intake Agent`: cleans the raw input into task candidates.
- `Priority Agent`: scores each task by urgency, importance, and category.
- `Scheduling Agent`: places tasks into the correct lane.
- `Review Agent`: checks the draft board for missing information or overload.
- `Coordinator Agent`: combines the handoffs and publishes the final answer.

## Threads

- `intakeThread`: raw input to clean tasks.
- `priorityThread`: clean tasks to scored tasks.
- `scheduleThread`: scored tasks to draft board.
- `reviewThread`: draft board to review notes.
- `coordinatorThread`: all handoffs to final response.

## Input

- Raw todo text entered in the app.
- Short items that may include deadline words, vague phrases, or delivery language.

## Workflow Steps

1. Intake Agent receives the raw todo text and extracts the non-empty tasks.
2. Priority Agent receives the cleaned list and assigns planning scores.
3. Scheduling Agent receives the scored tasks and builds the first board.
4. Review Agent receives the draft board and checks for issues that need clarification.
5. Coordinator Agent receives the draft board and review notes and merges the final result.
6. Coordinator Agent returns the published board in `coordinatorThread`.

## Output

- A cleaned todo list.
- A prioritized board with `Today`, `This Week`, and `Later` lanes.
- Review notes for vague or risky tasks.
- A multi-thread history that ends in `coordinatorThread`.

## Success Criteria

- The workflow uses multiple specialist roles.
- Each role has a matching thread.
- The review step is visible before the coordinator publishes the result.
- Only the Coordinator Agent returns the final answer.
- The final board matches the structure used by the todo app backend.
