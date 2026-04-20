# Multi-Agent Thread Map

This file describes the visible handoff path for the multi-agent todo workflow.

## Thread Overview

- `intakeThread`: receives raw todo text and turns it into clean task data.
- `priorityThread`: receives the clean data and scores urgency, importance, and category.
- `scheduleThread`: receives the scored tasks and builds the draft board.
- `reviewThread`: receives the draft board and identifies issues that need attention.
- `coordinatorThread`: receives every handoff and publishes the final board.

## intakeThread

- **Input:** raw todo text from the user.
- **Decision:** accept the non-empty lines as task candidates and normalize them.
- **Output:** a clean task list ready for scoring.
- **Next handoff:** `priorityThread`.

## priorityThread

- **Input:** clean task list from `intakeThread`.
- **Decision:** assign urgency, importance, category, and priority values.
- **Output:** scored tasks with planning notes.
- **Next handoff:** `scheduleThread`.

## scheduleThread

- **Input:** scored tasks from `priorityThread`.
- **Decision:** place each task into `Today`, `This Week`, or `Later`.
- **Output:** a draft task board grouped into lanes.
- **Next handoff:** `reviewThread`.

## reviewThread

- **Input:** draft board from `scheduleThread`.
- **Decision:** check for vague tasks, overload, and missing owner details.
- **Output:** review notes and adjustment recommendations.
- **Next handoff:** `coordinatorThread`.

## coordinatorThread

- **Input:** the draft board plus review notes.
- **Decision:** merge the specialist output and decide whether the board is ready.
- **Output:** the final coordinated board and visible thread history.
- **Next handoff:** none. The coordinator publishes the result.
