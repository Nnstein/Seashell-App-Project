# 🚀 PROMPT: Session Start — Cross-Session Persistence

> **Copy and paste this entire block when starting a new session with ANY agent (new or returning).**  
> **The agent will be fully caught up on the project's current state in under 30 seconds.**

---

## PASTE THIS INTO THE CONVERSATION:

```
You are resuming work on the **Seashell Hotel & Resort** project. This is a cross-session continuation — you may or may not have worked on this project before. Your job is to get oriented in under 30 seconds and continue from where the project left off.

### STEP 1: Get Oriented (30 seconds, read 2 files)
1. Read this file: `C:\Users\Nnstein's PC\Desktop\Seashell App Project\PROJECT_BRIEF.md`
2. Read this file: `C:\Users\Nnstein's PC\Desktop\Seashell App Project\PROGRESS.md`

Do NOT explore the entire project folder. Do NOT re-read the ASP.NET Zero template (15,000 files). Do NOT re-read the React prototype (138 files). The two files above tell you everything you need to know about the current state.

### STEP 2: Understand Where We Left Off
Look at the "Last Session Log" table in `PROGRESS.md`. This tells you:
- What was the last thing that was done
- When it was done
- Which agent did it

Look at the checklists in `PROGRESS.md`. Any task marked `- [/]` is IN PROGRESS. Any task marked `- [!]` is BLOCKED. Any task marked `- [x]` is DONE. Any task marked `- [ ]` is AVAILABLE for you to pick up.

### STEP 3: Pick Up Where We Left Off

**If you are a returning agent:**
- Check `AGENTS.md` "Current Agent Assignments" — is your name still there? If yes, continue your previous task. If no, pick a new available task.
- If your previous task was interrupted, check what was done and what remains. Continue from the unfinished part.

**If you are a new agent:**
- Pick the first available `- [ ]` task from the current phase in `PROGRESS.md`
- Read `AGENTS.md` sections 1, 2, and 4 to understand the collaboration rules
- Claim your task by adding your name to `AGENTS.md` and marking it `- [/]` in `PROGRESS.md`

### STEP 4: Validate the State
Before you start working, verify these things:
- Does the backend compile? (`dotnet build` in `aspnet-core/`)
- Does the frontend compile? (`npm run build` in `prototype_extracted/app/`)
- Does the database have the expected schema? (Check `__EFMigrationsHistory` table)
- Are the seed data present? (Query the relevant tables in SQL Server)

If anything is broken, fix it BEFORE starting your new task. The previous agent should have left a working state, but if they didn't, it's your responsibility to get it working.

### STEP 5: Work
Follow the rules in `AGENTS.md`:
- Work on ONE task at a time
- Run `dotnet build` / `npm run build` after every change
- Don't commit broken code
- If you hit a blocker, mark `- [!]` in `PROGRESS.md`

### STEP 6: When Done
- Mark `- [x]` in `PROGRESS.md`
- Remove your name from `AGENTS.md` (if you're not continuing)
- Add a row to the "Last Session Log" in `PROGRESS.md`
- Update `PROJECT_BRIEF.md` if a milestone was reached

### WHAT'S DIFFERENT FROM A FRESH START?

A fresh start would require:
- Reading 15,000 template files (impossible)
- Re-reading the entire plan (866 lines, 30 minutes)
- Re-exploring the prototype (138 files, 20 minutes)
- Re-figuring out what was done and what wasn't (unknown)

This prompt avoids all of that. You read 2 files (~500 lines total, 2 minutes) and you know exactly where the project stands and what to do next.

### CURRENT PROJECT STATE (as of last session):

{INSERT CURRENT STATE HERE}

Example:
"Phase 0 is in progress. The `RoomType` and `Restaurant` entities are created. The `PublicLanding` and `PublicRooms` frontend pages are wired to the API. Next available task: create the `RoomUnit` entity and wire `PublicDining` to the API."

Now begin work.
```

---

## HOW TO USE THIS PROMPT

1. **Copy the entire block above** (everything between the triple backticks)
2. **Paste it into ANY agent's conversation at the start of a new session**
3. **Replace `{INSERT CURRENT STATE HERE}` with a 1-2 sentence summary of the current state** (copy from the "Last Session Log" in `PROGRESS.md`)
4. **The agent reads 2 files and starts working** — no prior context needed

## EXAMPLE: Session Start with Current State

```
...
CURRENT PROJECT STATE (as of last session):
"Phase 0 is in progress. The `RoomType`, `Restaurant`, and `Facility` entities are created with DTOs and added to the DbContext. The `PublicLanding` and `PublicRooms` frontend pages are wired to the `/api/v1/public/*` API. The next available task is to create the `RoomUnit` entity (references `RoomType`), add it to the DbContext, and wire the `PublicDining` and `PublicFacilities` pages to the API. No agents are currently assigned."

Now begin work.
```

## EXAMPLE: Session Start with Blocker

```
...
CURRENT PROJECT STATE (as of last session):
"Phase 0 is in progress but BLOCKED. The `RoomType` entity was created but the migration fails because `RoomUnit` has a foreign key to `RoomType` and `RoomUnit` hasn't been created yet. The `RoomUnit` task was assigned to Agent 3 but they did not finish. The blocker is: `RoomUnit` entity needs to be created before the migration can be applied. Priority: create `RoomUnit` entity and fix the migration."

Now begin work.
```

## EXAMPLE: Session Start with No Work (Everything Done)

```
...
CURRENT PROJECT STATE (as of last session):
"Phase 0 is COMPLETE. All entities (RoomType, RoomUnit, Booking, DayPass, Transaction, Restaurant, Facility, ContentBlock, MediaAsset, GuestRequest) are created with DTOs, added to the DbContext, and seeded. All marketing pages (PublicLanding, PublicRooms, PublicDining, PublicFacilities, PublicGallery, PublicContact) are wired to the API. The backend compiles and the frontend builds successfully. Phase 1 (Guest Authentication) is ready to start."

Now begin work.
```

---

## WHY THIS PROMPT WORKS

| Problem | Solution |
|---|---|
| Context window exhaustion | Only 2 files to read (~500 lines total) |
| Re-exploring the project every session | Reference files contain all essential context |
| Not knowing what was done last time | `PROGRESS.md` "Last Session Log" shows exactly what happened |
| Not knowing what's next | `PROGRESS.md` checklists show the next available task |
| Not knowing the rules | `AGENTS.md` is referenced in the prompt |
| Broken state from previous session | Step 4 validates the state before starting new work |

---

*This prompt is the single most important one. Use it every time a new session starts — whether it's the same agent returning or a completely new agent joining the project.*
