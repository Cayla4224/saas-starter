export type Role = "USER" | "ADMIN"

export const hasRole = (role: Role, required: Role | Role[]) => {
  const needs = Array.isArray(required) ? required : [required]
  return needs.includes(role)
}
