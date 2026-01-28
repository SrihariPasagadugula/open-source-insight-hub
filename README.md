# Open-Source Insight Hub

A frontend-only web application that helps developers discover, analyze, and compare open-source repositories using GitHub’s public APIs.

## Purpose

This project focuses on solving real-world frontend challenges such as:

- Consuming paginated public APIs
- Implementing infinite scrolling and virtualized lists
- Managing complex UI state and derived data
- Building reusable UI components like modals and comparison panels
- Optimizing performance for large datasets

The goal is to demonstrate frontend architecture, performance optimization, and clean state management rather than UI design or backend logic.

## Key Features (Planned)

- Repository search using GitHub public APIs
- Infinite scrolling for repository discovery
- Virtualized list rendering using react-window
- Repository detail view in a reusable modal
- Side-by-side repository comparison
- Error handling and loading states
- Performance optimization and memoization

## Tech Stack

- React
- TypeScript
- GitHub REST API
- react-window
- Jest & React Testing Library

## Non-Goals

- Backend implementation
- Authentication or user accounts
- Pixel-perfect UI or design system
- Persistence beyond browser session

## Unique Focus

Unlike a traditional repository browser, this project introduces an insights and comparison layer on top of raw GitHub data, allowing users to:

- Analyze repository popularity and activity
- Compare multiple repositories side-by-side
- Work with derived frontend state rather than just API responses

## Implementation Checklist

- [ ] GitHub API abstraction layer
- [ ] Repository search with debouncing
- [ ] Infinite scroll data loading
- [ ] Virtualized list rendering (react-window)
- [ ] Repository details modal
- [ ] Repository comparison view
- [ ] Loading, error, and empty states
- [ ] Performance optimizations
- [ ] Tests for critical UI logic
