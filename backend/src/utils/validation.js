export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function requireFields(body, fields) {
  const missing = [];
  for (const field of fields) {
    if (!Object.prototype.hasOwnProperty.call(body, field) || body[field] == null) {
      missing.push(field);
    }
  }
  return missing;
}
