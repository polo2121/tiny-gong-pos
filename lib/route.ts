export const ROUTES = {
  login: "/login",
  workspace: "/workspace",
} as const;

export const AUTH_PATHS = [ROUTES.login];
export const PROTECTED_PATHS = [ROUTES.workspace];
