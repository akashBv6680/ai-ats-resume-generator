# Migrations

This project uses MongoDB. Schema changes are primarily managed via Mongoose
models in the backend service.

If you need data migrations (e.g., backfilling fields), add one script per
migration in this folder, named with an increasing timestamp, for example:

- 20260131_add_template_active_flag.js
- 20260210_backfill_resume_atsScore.js

Each script should be idempotent and safe to run multiple times.
