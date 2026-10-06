# Synapse360
### Student Wellbeing Intelligence Dashboard

> **Event:** ServiceNow Co-Innovation Day — SRM University  
> **Track:** Track 05 — Wellbeing Intelligence Dashboard  
> **Persona:** Dr. Meera, Dean of Student Affairs

---

## What is Synapse360?

Synapse360 is a university operations intelligence center that answers four questions leadership asks during a student wellbeing crisis:

| # | Question | Feature |
|---|----------|---------|
| 1 | **What** is happening? | Live KPI overview — wait times, capacity, referral backlog |
| 2 | **Why** is it happening? | Correlated signal insights across dining, attendance, clinic data |
| 3 | **What will happen** if we do nothing? | What-If Simulator with physics-based projection model |
| 4 | **What should we do right now?** | One-click ServiceNow workflow orchestration |

It is designed to feel like a **ServiceNow Control Tower**, not a student project.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vanilla JS · Single-page app (SPA) |
| Styling | Tailwind CSS (CDN) · Inter font |
| Charts | Chart.js (CDN) |
| Icons | Lucide Icons (CDN) |
| Backend | Node.js native `http` module (no npm dependencies) |
| Database | In-memory state (resets on server restart) |

No build step. No npm install required. Just run and open.

---

## How to Run

```bash
# Navigate to project folder
cd "C:\Users\rakes\OneDrive\Desktop\PROJECTS\Synapse"

# Start the server (no install needed)
node server.js

# Open in browser
http://localhost:3000
```

**Login credentials (demo):**
- Email: `dr.meera@srm.edu.in`
- Password: `synapse2025`

---

## Project Structure

```
Synapse/
├── index.html        ← Root redirect (optional)
├── server.js         ← Node.js HTTP server + REST API
├── README.md
└── public/
    └── index.html    ← Entire SPA: all HTML, CSS, and JavaScript
```

---

## REST API Endpoints

### `GET /api/status`
Returns the current in-memory system state.

```json
{
  "waitTime": 21.4,
  "capacity": 185,
  "backlog": 340,
  "interventionExecuted": false
}
```

---

### `POST /api/simulate`
**What-If Simulator.** Accepts a resource multiplier and returns projected outcomes.

**Request body:**
```json
{ "resourceMultiplier": 1.5 }
```

**Response:**
```json
{
  "projectedWaitTime": 14.2,
  "projectedCapacity": 120,
  "projectedBacklog": 220
}
```

---

### `POST /api/orchestrate`
Executes the ServiceNow workflow prototype — rebalances cases and updates system state.

**Response:**
```json
{
  "success": true,
  "message": "Workflow executed",
  "newState": {
    "waitTime": 1.8,
    "capacity": 42,
    "backlog": 110
  }
}
```

---

## Pages (Sidebar Navigation)

| Page | ID | Description |
|------|----|-------------|
| Overview | `page-overview` | KPI cards + 6-month demand chart |
| Insights | `page-insights` | Correlated signal analysis + correlation chart |
| Resource Planning | `page-planning` | What-If simulator + ServiceNow action panel |
| Action Center | `page-actions` | Recommended interventions with one-click execution |
| Impact | `page-impact` | Before vs After comparison chart + metrics |
| Semester Calendar | `page-calendar` | Risk heat map by academic period |
| Mentor Matching | `page-mentors` | Peer mentor deployment tracker |
| Capacity & Burnout | `page-capacity` | Counselor utilization + team load overview |
| Priority Cohorts | `page-cohorts` | Cohort summaries + 10 anonymized case records |
| Privacy & Ethics | `page-privacy` | Data governance principles |

---

## Demo Scenario

**The Campus Crisis:**  
CS Year 2 / Hostel B identified as the epicenter of a wellbeing crisis. 130 active cases driven by convergence of DSP-301 mid-term stress, dining drop-off (-38%), and clinic surge (+52%).

**Key numbers to cite during demo:**

| Metric | Before | After Intervention |
|--------|--------|--------------------|
| Average wait time | **21.4 days** | **1.8 days** (-91%) |
| Counseling capacity | **185%** (overloaded) | **42%** (optimal) |
| Active referral backlog | **340 cases** | **110 cases** |
| Departments correlated | 12 | 12 |

---

## Anonymized Student Case Log (Priority Cohorts)

10 individual operational case records (CASE-4011 → CASE-4020) are shown on the **Priority Cohorts** page with:
- **Severity filter pills** — All / High / Moderate / Mild
- **Inspect button** → opens a detail modal with detected signals, triage channel, status, and coordinator notes

No student PII is stored. All data is cohort-aggregated and anonymized.

---

## Privacy & Ethics Principles

- No individual student identity stored or displayed in any analytical view
- All indicators are **operational risk signals**, not medical or psychological diagnoses
- Role-based access limited to authorized administrative coordinators (Dr. Meera level)
- Human coordinator review is required before any direct outreach to a student
- Illustrative prototype — not a production clinical system

---

## Hackathon Context

Built for **ServiceNow Co-Innovation Day** at SRM University as a demonstration of how ServiceNow-style workflow orchestration can be applied to university student wellbeing operations.

The product demonstrates:
- **Signal correlation** across campus behavioral data (dining, attendance, clinic, library)
- **Predictive simulation** of resource intervention outcomes
- **One-click workflow orchestration** triggered from a unified operations dashboard
- **Privacy-first** cohort analytics with no individual PII exposure

---

*Synapse360 — Don't just show university problems. Understand the hidden pattern, simulate what happens next, and act on it.*
