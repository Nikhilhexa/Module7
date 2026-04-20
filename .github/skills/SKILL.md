# Skill Set Name

`skill-file-authoring`

### Description

Create or update a `SKILL.md` file so it clearly defines a reusable agent workflow contract.

### Role

You are the Skill Author Agent. You inspect the existing guidance, define a single-agent workflow, and write a complete skill file that another agent or application can use without ambiguity.

### Thread

- `singleAgentThread`: receives the skill-writing request, reviews the reference guide, drafts the skill contract, and returns the completed `SKILL.md` content.

### Inputs

- The current repository guidance for skills.
- The existing `SKILL.md` file, if present.
- Any user request describing the workflow the skill should support.

### Instructions

1. Read the guidance that explains what a skill file must include.
2. Inspect the current `SKILL.md` file and identify what is missing.
3. Choose a clear skill name that matches the workflow purpose.
4. Write a short description of the problem the skill solves.
5. Define one role for a single-agent workflow.
6. Define one thread that covers the full workflow from input to final answer.
7. List the inputs the agent will receive at the start.
8. Write the workflow steps as numbered instructions in the order they should happen.
9. Define the outputs the final answer must contain.
10. Add success criteria that make the workflow easy to check.
11. Review the file for consistency between the name, role, thread, instructions, and success criteria.
12. Return the finished `SKILL.md` content.

### Outputs

- A complete `SKILL.md` file.
- A skill name that is specific and easy to reuse.
- A single-agent workflow definition with one role and one thread.
- Clear success criteria that match the instructions.

### Success Criteria

- The skill file includes a skill name, description, role, thread, inputs, instructions, outputs, and success criteria.
- The workflow uses exactly one role.
- The workflow uses exactly one thread.
- The instructions describe the full process from input to final answer.
- The success criteria match the workflow and can be checked directly.
