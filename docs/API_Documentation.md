# AI ATS Resume Generator – API Documentation

Base URL (backend): `https://<your-domain>/api`

## Auth

### POST /auth/register
Create a new user.

Request body:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
