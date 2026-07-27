# Backend Development Standards — EventTrail (CampusPulse)

## 1. Lambda Function Architecture & Structure
- **Single Responsibility**: Each Lambda handler must serve a distinct API route or event trigger. Do not combine multiple unrelated routes into a monolithic Lambda handler unless using a router framework explicitly defined in the module spec.
- **Async/Await**: Use Node.js `async/await` patterns. Avoid raw callback patterns or `.then()` chaining.
- **Structured Logging**: Always log input event metadata (excluding passwords, tokens, or sensitive user PII) at DEBUG/INFO levels using `console.info` or JSON structured loggers. Every module must output logs to dedicated AWS CloudWatch Log Groups.
- **Error Handling**: Wrap all async handler logic in `try/catch` blocks. Return standard HTTP status codes (`200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, `500 Internal Server Error`) with JSON payloads structured as `{ "error": "Descriptive message", "code": "ERROR_CODE" }`.

## 2. IAM Least-Privilege Scoping
- **Function-Level Roles**: Never use wildcard (`*`) resource policies or grant full `AdministratorAccess` to Lambda execution roles.
- **Table & Queue Isolation**: A Lambda function belonging to Module *N* must only be granted `dynamodb:GetItem`, `dynamodb:PutItem`, `dynamodb:UpdateItem`, etc., on the specific DynamoDB tables or RDS Secrets Manager secrets it owns or explicitly consumes.
- **Cross-Module Boundaries**: No Lambda in Module *N* may directly modify database tables owned by another module. Cross-module data operations must occur via HTTP API invocations or internal SDK/Lambda invocations.

## 3. Database Conventions
- **RDS MySQL (Relational)**:
  - Use `snake_case` for all table names and column names (e.g., `user_id`, `created_at`).
  - Every relational table must include `id` (VARCHAR UUID or INT AUTO_INCREMENT primary key), `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), and `updated_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP).
  - Use connection pooling (`mysql2/promise`) and never hold open idle connections outside execution scope.
- **DynamoDB (NoSQL)**:
  - Use explicit partition keys (`PK`) and sort keys (`SK`), or semantic names (`event_id`, `position`, `timestamp`) as defined in `ProjectET.md` and `BackendArchitecture.md`.
  - For high-concurrency seat counting or waitlist positioning, MUST use DynamoDB atomic counters (`ADD` expressions) or conditional writes (`attribute_not_exists` or version checking) to prevent race conditions. Do NOT use MySQL row locks for high-speed RSVP seat counters.

## 4. Testing Bar (Non-Negotiable)
- **Zero-Stubbing Rule**: An agent must never build against a stub of a prior module. Confirm that the previous module's exit criteria are met before starting development.
- **Automated Integration Suite**: Every module must ship with an automated integration test suite (using Jest / Supertest / Postman collections) before frontend wiring begins.
- **Exit Criteria Verification**: Every module must pass all its exit criteria defined in `BackendArchitecture.md` §2 before being marked complete.
