import { hash, compare } from "bcryptjs";
import { db } from "./db";

const SESSION_KEY = "admin_session";

export async function authenticate(email: string, password: string) {
  const admin = await db.admin.findUnique({ where: { email } });
  if (!admin) return null;

  const valid = await compare(password, admin.password);
  if (!valid) return null;

  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  };
}

export function setSession(user: { id: string; email: string; name: string; role: string }) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }
}

export function getSession() {
  if (typeof window !== "undefined") {
    const data = sessionStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function clearSession() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

export async function hashPassword(password: string) {
  return hash(password, 12);
}
