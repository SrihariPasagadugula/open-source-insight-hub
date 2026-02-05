# Open-Source Insight Hub

A production-focused frontend application for discovering, exploring, and comparing open-source repositories using GitHub’s public REST APIs.

This project is intentionally frontend-only and emphasizes real-world UI challenges such as async data handling, pagination strategies, state derivation, race-condition safety, and UX predictability under imperfect network conditions.

---

## Why This Project Exists

Many GitHub explorer demos stop at rendering API responses.

This project goes further by addressing problems frontend engineers solve in production, including:

- Paginated API consumption with infinite scrolling
- Preventing stale UI updates during rapid user interactions
- Managing derived UI state (filters, sorting, comparison)
- Synchronizing application state with the URL
- Designing resilient UI flows under async behavior
- Handling API rate limits and partial failures gracefully

The goal is to demonstrate frontend architecture and decision-making rather than visual design or backend development.

---

## Core Features

### 🔍 Repository Discovery

- Search GitHub repositories using the public Search API
- Search can be triggered via button click or Enter key
- Results are fetched incrementally using infinite scrolling

### ♾️ Infinite Scroll (Discovery Mode)

- Uses the IntersectionObserver API for scroll detection
- Automatically disabled when client-side refinements (filters or sorting) are applied
- Prevents duplicate or runaway API calls during fast scrolling

### 🔄 Sorting & Filtering

- Client-side sorting by:
  - Stars
  - Forks
  - Recently updated
- Language-based filtering using derived repository data
- Clear UI indication when refinement mode is active
- Infinite scroll is paused to maintain predictable UX

### 🔗 URL State Synchronization

- Search query, sort option, and language filter are reflected in the URL
- Supports page refresh and link sharing
- Avoids polluting browser history during typing or refinement

### 📊 Repository Comparison

- Select up to two repositories for side-by-side comparison
- Comparison table updates dynamically
- Automatically clears invalid selections when filters change

### 📦 Repository Details Modal

- Fetches additional repository metadata on demand
- Uses a reusable modal component
- Includes skeleton loading and error handling
- Prevents state updates after unmount using cancellation logic

### 🦴 Skeleton Loaders

- Visual placeholders for list and modal content
- Prevents layout shifts during async fetches
- Improves perceived performance and UX clarity

### 🚦 Robust Error Handling

- Differentiates between network errors and GitHub rate limits (403)
- Gracefully stops infinite scroll when rate limits are hit
- Displays actionable feedback to the user

### 🧵 Race-Condition Safe Data Fetching

- Uses AbortController to cancel stale requests
- Guards against out-of-order responses
- Ensures UI always reflects the latest user intent

---

## Architectural Decisions

### Infinite Scroll vs Sorting/Filtering

Infinite scrolling and client-side sorting do not combine well due to result reordering and scroll position instability.

To avoid unpredictable UX:

- Infinite scroll is active only in discovery mode
- Applying filters or sorting switches to a controlled, finite result set

This mirrors trade-offs commonly made in production systems.

---

### State Management Strategy

- Local component state combined with derived state via `useMemo`
- No Redux or Context by design
- State ownership kept close to where it is consumed
- Avoids unnecessary global state complexity

---

### Async Safety

- All API requests are cancellable
- UI updates are guarded against stale responses
- Loading and error states are mutually exclusive and predictable

---

## Tech Stack

- React (Hooks-based architecture)
- TypeScript
- GitHub REST API
- IntersectionObserver API
- AbortController
- Vite

No external state management libraries or UI frameworks were used intentionally.

---

## Non-Goals

- Backend implementation or server-side rendering
- Authentication or GitHub OAuth
- Persistent storage
- Pixel-perfect UI or design system

---

## What This Project Demonstrates

- Strong understanding of React hooks and lifecycle behavior
- Real-world async data handling patterns
- UX-driven architectural decisions
- Performance-conscious rendering
- Clean separation of concerns
- Defensive frontend engineering practices

---

## Potential Future Enhancements

- Authentication to increase GitHub API rate limits
- Server-side sorting and filtering for large datasets
- Keyboard navigation and accessibility improvements
- Test coverage for hooks and critical UI flows

---

## Closing Note

This project is intentionally scoped to reflect the type of frontend problems encountered in real production systems rather than being a feature-heavy demo.
