# 🚀 PROMPT: Multiple Agents — Parallel Work Session

> **Copy and paste this entire block into the conversation when deploying multiple agents simultaneously.**  
> **All agents will orient themselves and coordinate automatically.**

---

## PASTE THIS INTO THE CONVERSATION (for the orchestrator):

```
You are now the orchestrator for the **Seashell Hotel & Resort** project. You are deploying multiple agents to work in parallel. Your job is to orient all agents, assign non-conflicting tasks, and prevent file conflicts.

### STEP 1: Orient Yourself (2 minutes)
Read these 4 files in order:
1. `C:\Users\Nnstein's PC\Desktop\Seashell App Project\PROJECT_BRIEF.md` — project overview
2. `C:\Users\Nnstein's PC\Desktop\Seashell App Project\PROGRESS.md` — what's done and what's next
3. `C:\Users\Nnstein's PC\Desktop\Seashell App Project\AGENTS.md` — multi-agent coordination rules
4. `C:\Users\Nnstein's PC\Desktop\Seashell App Project\DECISIONS.md` — architecture decisions

Do NOT explore the entire project folder. Do NOT read the ASP.NET Zero template (15,000 files). Do NOT read the React prototype (138 files). The 4 files above contain everything you need.

### STEP 2: Identify Available Tasks
Look at `PROGRESS.md` and find tasks that are `- [ ]` (pending) and independent of each other. The best parallel tasks are in different work areas (e.g., one agent on backend entities, one on frontend pages).

### STEP 3: Assign Non-Conflicting Tasks
Use the work area boundaries from `AGENTS.md` section 4. Ensure no two agents are assigned to the same work area. Specifically:

- NEVER assign two agents to Area F (Auth) simultaneously — `useAuth.tsx` is high-contention
- NEVER assign two agents to Area D (EF Migrations) simultaneously — only one "migration token" holder
- NEVER assign two agents to Area A (Backend Core) if they're creating entities that reference each other
- Area G (Frontend Admin) and Area E (Frontend Marketing) can be parallel safely
- Area C (Backend API) controllers can be parallel — one controller per domain

### STEP 4: Deploy Each Agent with a Custom Prompt
For each agent, paste the "SINGLE AGENT" prompt (from `PROMPT_SINGLE_AGENT.md`) but with their specific task. Also tell them:
- "You are Agent {N} of {M}. The other agents are working on: {list other tasks}."
- "Do NOT modify these files: {list high-contention files}"
- "If you need to touch a file another agent is working on, STOP and notify the orchestrator."

### STEP 5: Monitor Progress
After all agents start working, periodically check:
- `AGENTS.md` "Current Agent Assignments" — verify everyone is still working
- `PROGRESS.md` — see if any tasks are marked done or blocked
- If an agent finishes early, assign them the next available task from their work area
- If an agent hits a blocker, help them resolve it or reassign the task

### STEP 6: Merge Results
When all agents finish:
1. Verify each agent's work by running `dotnet build` and `npm run build`
2. If there are conflicts, coordinate the merge (use the conflict resolution guide in `AGENTS.md` section 7)
3. Update `PROGRESS.md` with all completed tasks
4. Update `PROJECT_BRIEF.md` if any milestones were reached
5. Clear the "Current Agent Assignments" table in `AGENTS.md`

### CURRENT TASKS TO ASSIGN:

{INSERT TASKS HERE}

Example:
- Agent 1 (Backend): Create `RoomType` and `RoomUnit` entities + DTOs (Area A)
- Agent 2 (Frontend): Wire `PublicLanding` and `PublicRooms` to API (Area E)
- Agent 3 (Backend): Create `Restaurant` and `Facility` entities + DTOs (Area A)
- Agent 4 (Frontend): Wire `PublicDining` and `PublicFacilities` to API (Area E)

Now begin orchestration.
```

---

## PASTE THIS INTO EACH INDIVIDUAL AGENT'S CONVERSATION:

```
You are Agent {N} of {M} working on the **Seashell Hotel & Resort** project.

### STEP 1: Orient Yourself (2 minutes)
1. Read: `C:\Users\Nnstein's PC\Desktop\Seashell App Project\PROJECT_BRIEF.md`
2. Read: `C:\Users\Nnstein's PC\Desktop\Seashell App Project\PROGRESS.md`
3. Read: `C:\Users\Nnstein's PC\Desktop\Seashell App Project\AGENTS.md` (sections 1, 2, 4, 6)

Do NOT explore the entire project. Do NOT read the template (15,000 files). Do NOT read the prototype (138 files). The 3 files above contain everything you need.

### STEP 2: Claim Your Task
Open `AGENTS.md` and add your name to "Current Agent Assignments" with your task. Mark your task as `- [/]` in `PROGRESS.md`.

### STEP 3: Know Your Boundaries
You are working in **Area {X}**. Other agents are working in **Area {Y}, {Z}**. Do NOT modify files from their areas. Specifically, do NOT touch these files: {list high-contention files}.

If you need to modify a file another agent is working on, STOP and notify the orchestrator. Do NOT attempt to resolve conflicts yourself.

### STEP 4: Work Rules
- Work on ONE task at a time.
- Run `dotnet build` (backend) or `npm run build` (frontend) after every change.
- If you hit a blocker, mark `- [!]` in `PROGRESS.md`.
- When done, mark `- [x]` in `PROGRESS.md`, remove yourself from `AGENTS.md`, and add a row to the "Last Session Log".

### YOUR TASK:

{INSERT AGENT-SPECIFIC TASK HERE}

Now begin work.
```

---

## HOW TO USE THIS PROMPT

1. **For the orchestrator:** Copy the first block (orchestrator prompt) and paste it into the orchestrator agent's conversation. Replace `{INSERT TASKS HERE}` with the specific task list.
2. **For each worker agent:** Copy the second block (individual agent prompt) and paste it into each agent's conversation. Replace `{N}`, `{M}`, `{X}`, `{Y}`, `{Z}`, and the task list with the specific values.
3. **The orchestrator monitors** — reads `AGENTS.md` and `PROGRESS.md` to track progress.
4. **Individual agents work independently** — they know their boundaries and don't step on each other.

## EXAMPLE: Orchestrator Deployment

```
ORCHESTRATOR PROMPT (with tasks filled in):
...
CURRENT TASKS TO ASSIGN:
- Agent 1 (Backend, Area A): Create `RoomType` entity + DTOs. Do NOT create `RoomUnit` yet (Agent 3 will do that). Do NOT create migrations yet.
- Agent 2 (Frontend, Area E): Wire `PublicLanding` to `/api/v1/public/resort-info`. Create `publicApi.ts` with the API client. Use TanStack Query.
- Agent 3 (Backend, Area A): Create `RoomUnit` entity + DTOs. RoomUnit references RoomType (which Agent 1 is creating). Coordinate if Agent 1 hasn't finished yet.
- Agent 4 (Frontend, Area E): Wire `PublicRooms` to `/api/v1/public/room-types`. Reuse the `publicApi.ts` that Agent 2 is creating. Add loading skeletons.
```

## EXAMPLE: Individual Agent 1 Prompt

```
You are Agent 1 of 4 working on the **Seashell Hotel & Resort** project.
...
You are working in **Area A (Backend Core)**. Other agents are working in Area E (Frontend Marketing). Do NOT modify files from their areas. Specifically, do NOT touch these files: `prototype_extracted/app/src/*`, `useAuth.tsx`, `App.tsx`.
...
YOUR TASK:
Create the `RoomType` entity in `aspnet-core/src/Seashell.Resort.Core/Entities/`. Include all fields from the `RoomType` definition in `plan.md` section 5.2. Create the DTOs in the Application layer. Do NOT create `RoomUnit` yet (Agent 3 will handle that). Do NOT create a migration yet. Seed the 13 room types from `resortData.ts`.
```

---

*This prompt system is self-contained. The orchestrator and all agents get everything they need from the reference files. No prior context is needed.*
