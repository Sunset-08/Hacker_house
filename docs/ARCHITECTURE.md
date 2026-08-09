# Builder ID Generator — Architecture

## 1. Purpose

This document defines the technical architecture for the Builder ID Generator.

The architecture must prioritize:

1. Reliability
2. Performance
3. Simplicity
4. Maintainability
5. Mobile-first UX
6. Visual quality
7. Future extensibility

The application should remain lightweight and avoid unnecessary backend infrastructure.

The PRD at `/docs/PRD.md` is the product source of truth.

---

# 2. Architecture Principles

## 2.1 Client-first

Whenever practical, perform operations inside the browser.

Examples:

- Image resizing
- Image cropping
- Preview rendering
- Template switching
- Theme changes
- Builder title generation
- QR generation
- Card export

Avoid unnecessary server requests.

---

## 2.2 Configuration over hardcoding

Templates, themes, teams, event information, and Builder title rules should be represented as configuration/data rather than deeply embedded inside UI components.

Example:

```text
Configuration
     ↓
Template Engine
     ↓
Renderer
     ↓
Preview / Export