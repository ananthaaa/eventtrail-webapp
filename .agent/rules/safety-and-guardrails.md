# Safety & Guardrails — EventTrail (CampusPulse)

## 1. Unattended Execution Limits
An autonomous agent must never perform the following high-risk actions without explicit user review and approval:
- **Production Infrastructure Deletion**: Running `sam delete`, `cloudformation delete-stack`, or terminating RDS database instances / DynamoDB tables in production environments.
- **Destructive Database DDL**: Executing `DROP TABLE`, `TRUNCATE TABLE`, or destructive schema migrations on populated production databases without verifying backup snapshots.
- **Billing & Compute Escalation**: Provisioning non-Free Tier AWS resources (e.g., Multi-AZ RDS deployments, large EC2/ECS clusters, high Provisioned IOPS DynamoDB tables) without explicitly stating cost implications to the user.

## 2. AWS Secret Safety & Credentials
Per master `AGENTS.md` rules:
- **Never Hardcode Secrets**: NEVER write API keys, database passwords, Cognito client secrets, or JWT secret keys directly into source code, git commits, or environment configuration files committed to version control.
- **AWS Secrets Manager**: Must load the `aws-secrets-manager` skill or use AWS Secrets Manager dynamic references (`{{resolve:secretsmanager:secret-id:SecretString:json-key}}`) in CloudFormation/SAM templates for database credentials.
- **No Direct Secret Printouts**: Never output raw secret values or passwords in console logs, terminal output, or markdown reports.

## 3. Deployment Safety
- Always validate AWS SAM templates using `sam validate` before attempting deployment.
- Ensure all Lambda functions are configured with reasonable memory limits (e.g., 128MB–256MB for API microservices) and timeouts (3s–5s for synchronous API Gateway handlers; up to 30s for async batch processing) to prevent runaway billing under infinite loops.
- Use path-based routing in API Gateway (`/auth/*`, `/events/*`, `/rsvp/*`) and ensure CORS headers (`Access-Control-Allow-Origin`, `Access-Control-Allow-Headers`, `Access-Control-Allow-Methods`) are explicitly configured for authorized frontend origins.
