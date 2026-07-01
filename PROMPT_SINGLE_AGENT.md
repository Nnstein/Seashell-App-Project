# 🚀 PROMPT: Single Agent — Start Working on a Task

> **Copy and paste this entire block into the agent's conversation.**  
> **The agent will be fully oriented and ready to work in under 30 seconds.**

---

## PASTE THIS INTO THE AGENT CONVERSATION:

```
You are now working on the **Seashell Hotel & Resort** project.

### STEP 1: Orient Yourself (2 minutes)
1. Read this file: `C:\Users\Nnstein's PC\Desktop\Seashell App Project\PROJECT_BRIEF.md`
2. Read this file: `C:\Users\Nnstein's PC\Desktop\Seashell App Project\PROGRESS.md`
3. Read this file: `C:\Users\Nnstein's PC\Desktop\Seashell App Project\DECISIONS.md`

Do NOT explore the entire project folder. Do NOT read the ASP.NET Zero template (15,000 files). Do NOT read the React prototype (138 files). The three files above contain everything you need.

### STEP 2: Claim Your Task
Open `C:\Users\Nnstein's PC\Desktop\Seashell App Project\AGENTS.md` and add your name to the "Current Agent Assignments" table with the task you're picking up. Then mark the task as `- [/]` in `PROGRESS.md`.

### STEP 3: Understand the Work Area
Your assigned task falls into one of these areas. Know the rules for your area:

- **Area A (Backend Core):** C# entities. One entity at a time. Commit after each. Check if referenced entities exist before adding foreign keys.
- **Area B (Backend App):** DTOs and AppServices. Never remove a DTO field — only add optional ones. Follow naming: `CreateXDto`, `UpdateXDto`, `XDto`, `XListDto`.
- **Area C (Backend API):** REST controllers. One controller per domain. Use `[ApiController]` and `[Route("api/v1/[controller]")]`.
- **Area D (Backend EF):** Migrations and seeding. YOU MUST coordinate with other agents before creating a migration. Only one agent creates migrations at a time.
- **Area E (Frontend Marketing):** Public pages. Replace `resortData.ts` with API calls. Use TanStack Query, not raw `fetch`.
- **Area F (Frontend Auth):** Auth flow. NEVER modify `useAuth.tsx` without coordinating. Add new auth modes as new methods, don't refactor existing ones.
- **Area G (Frontend Admin):** Dashboard pages. Each page is independent. Copy the pattern from `Dashboard.tsx`.
- **Area H (Frontend Shared):** Reusable components. Notify other agents before modifying shared components (BottomNav, Header, ChatModal, etc.).
- **Area I (Frontend API):** API client layer. One file per domain: `publicApi.ts`, `guestApi.ts`, `adminApi.ts`, `dayPassApi.ts`. Generate types from Swagger, never hand-write them.

### STEP 4: Work Rules
- Work on ONE task at a time. Don't claim multiple tasks.
- Run `dotnet build` after every backend change. Run `npm run build` after every frontend change. Don't commit broken code.
- If you hit a blocker, mark it `- [!]` in `PROGRESS.md` and explain the blocker.
- If you need to modify a file another agent is working on, ask first.

### STEP 5: When Done
- Mark the task `- [x]` in `PROGRESS.md`
- Remove your name from `AGENTS.md` "Current Agent Assignments"
- Add a row to the "Last Session Log" in `PROGRESS.md`
- If you made an architectural change, update `PROJECT_BRIEF.md` and `DECISIONS.md`

### YOUR TASK:

{INSERT TASK HERE}

Example: "Create the `RoomType` entity in the backend Core layer, including its DTOs in the Application layer, and add it to the DbContext. Follow the entity definition in `plan.md` section 5.2. Seed 13 room types from `resortData.ts`."

Now begin work.
```

---

## HOW TO USE THIS PROMPT

1. **Copy the entire block above** (everything between the triple backticks)
2. **Paste it into the agent's conversation**
3. **Replace `{INSERT TASK HERE}` with the specific task description**
4. **The agent reads 3 files and starts working** — no context bloat, no re-exploration

## EXAMPLE: Task for Backend Entity

```
YOUR TASK:
Create the `RoomType` entity in the backend Core layer (`aspnet-core/src/Seashell.Resort.Core/Entities/`). Include all fields from the `RoomType` definition in `plan.md` section 5.2. Then create the DTOs (`CreateRoomTypeDto`, `UpdateRoomTypeDto`, `RoomTypeDto`) in the Application layer. Add the `DbSet<RoomType>` to `AbpZeroTemplateDbContext`. Do NOT create a migration yet — that will be handled separately. Create a seed method that inserts the 13 room types from `prototype_extracted/app/src/data/resortData.ts`.
```

## EXAMPLE: Task for Frontend Page

```
YOUR TASK:
Wire the `PublicRooms` screen (`prototype_extracted/app/src/screens/public/PublicRooms.tsx`) to the backend API. Replace the static `resortData.stay.room_types` import with a TanStack Query `useQuery` hook that calls `/api/v1/public/room-types`. Create the API client function in `prototype_extracted/app/src/api/publicApi.ts`. Keep the `resortData.ts` as a fallback cache. Add loading skeletons (reuse `TileGridSkeleton` from `components/loading/`). Handle error states with a toast notification.
```

## EXAMPLE: Task for Auth Flow

```
YOUR TASK:
Implement the guest login API endpoint in the backend. Create `/api/v1/auth/guest-login` that accepts `{ roomNumber: string, pin: string }` and returns a JWT with custom claims: `BookingId`, `RoomUnitId`, `GuestName`. The PIN should be validated against the `Booking` table (PIN is stored on the `Booking` record, not the `User` record). If valid, return the JWT and the full booking details. If invalid, return `401 Unauthorized` with a clear error message. Add this endpoint to the Swagger documentation.
```

---

*This prompt is self-contained. The agent does not need any prior context about Seashell — it gets everything from the 3 reference files.*
