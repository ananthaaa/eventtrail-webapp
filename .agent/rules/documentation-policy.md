# Documentation Policy — EventTrail (CampusPulse)

## 1. Mandatory Module Completion Reports
Per section 3 of `AGENTSRule.md`: *Every module gets a completion document before being marked done. This is not optional.*

Before any Sprint or Module is marked complete in `task.md` or handed off to the next sprint, the agent must generate a comprehensive completion report in `docs/modules/Module_<N>_Completion_Report.md`.

## 2. Required Report Contents
A Module Completion Report must contain the following sections:
1. **Executive Summary**: Brief statement of module objectives, sprint dates, and deliverables achieved.
2. **Architecture & AWS Resource Inventory**:
   - List of AWS resources provisioned (Lambda function ARNs, DynamoDB table names, RDS schemas, Cognito User Pools, API Gateway endpoints).
   - Infrastructure-as-Code (IaC) template reference (`template.yaml` / SAM stacks).
3. **API Contracts & Data Models**:
   - Explicit request/response schemas for all HTTP endpoints delivered in the module.
   - Database DDL changes or NoSQL table key structures.
4. **Automated Test & Quality Verification Results**:
   - Command log and pass/fail summary of the module's unit and integration test suite (`npm test`).
   - Postman test collection execution summary.
   - CloudWatch monitoring baseline verification (log groups created and alarms tested).
5. **Frontend-Backend Integration Status**:
   - Mapping of frontend UI screens to the backend endpoints built in this module.
   - Known UI state behaviors (loading skeletons, optimistic UI updates, error toasts).
6. **Handoff & Dependencies for Next Module**:
   - Clear declaration that exit criteria from `BackendArchitecture.md` §2 have been satisfied.
   - Guidance and prerequisites for the agent building Module *N+1*.

## 3. Workflow Integration
When invoked via `/module-completion-doc` or upon finishing code development for a module, the agent MUST write this report before proceeding to next tasks.
