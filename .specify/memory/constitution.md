
# Online ROM Calculator Constitution


## Core Principles

### I. Code Quality
All code MUST adhere to established style guides, be clearly structured, and include meaningful comments where necessary. Code reviews are mandatory for all merges. Linting and static analysis tools MUST be used to enforce standards.
*Rationale: High code quality reduces defects, improves maintainability, and enables easier onboarding.*

### II. Testing Standards
Automated tests (unit, integration, and regression) MUST be written for all features and bug fixes. No code is merged without passing tests. Test coverage MUST be tracked and maintained at or above the project’s minimum threshold (default: 90%).
*Rationale: Rigorous testing ensures reliability, prevents regressions, and builds user trust.*

### III. User Experience Consistency
All user-facing components MUST follow a unified design system and interaction patterns. Accessibility standards (WCAG 2.1 AA or higher) MUST be met. UX changes require review for consistency and usability.
*Rationale: Consistent UX improves usability, accessibility, and user satisfaction.*

### IV. Performance Requirements
Features MUST meet defined performance targets (e.g., <200ms p95 response time, <100MB memory usage). Performance regressions are not permitted without explicit review and mitigation plan.
*Rationale: Performance is critical for user retention and operational efficiency.*


## Additional Constraints

* Technology stack: All core logic must be implemented in the primary project language as defined in the plan. Third-party dependencies require approval and must not introduce license or security risks.
* Security: Sensitive data must be protected in transit and at rest. Follow OWASP Top 10 guidelines.
* Deployment: All deployments must be automated and reproducible. Manual changes to production are prohibited.


## Development Workflow

* All work is tracked via issues and feature branches.
* Pull requests require at least one approving review and must pass all CI checks.
* No code is merged without meeting all core principles and additional constraints.
* Releases follow semantic versioning and require a changelog entry.


## Governance

This constitution supersedes all other practices. Amendments require documentation, team approval, and a migration plan if breaking. All PRs and reviews must verify compliance with the constitution. Complexity must be justified. Compliance reviews are conducted quarterly or upon major release.


<!--
Sync Impact Report
Version change: 1.0.0 → 1.0.0
List of modified principles: All placeholders replaced with concrete principles (Code Quality, Testing Standards, User Experience Consistency, Performance Requirements)
Added sections: Additional Constraints, Development Workflow
Removed sections: None
Templates requiring updates: plan-template.md (✅), spec-template.md (✅), tasks-template.md (✅)
Follow-up TODOs: TODO(RATIFICATION_DATE): Set original ratification date if known
-->

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): Set original ratification date if known | **Last Amended**: 2025-12-24
