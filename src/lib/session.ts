export const SESSION_COOKIE = "admin_session";
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

const enc = new TextEncoder();

function toBase64Url(input: string | Uint8Array) {
  const str = typeof input === "string" ? btoa(input) : btoa(String.fromCharCode(...input));
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string) {
  return atob(input.replace(/-/g, "+").replace(/_/g, "/"));
}

function hexToKey(hex: string) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

function secret() {
  return process.env.ADMIN_SECRET || "local-dev-secret-change-me";
}

async function sign(data: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    hexToKey(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return toBase64Url(new Uint8Array(sig));
}

export function sessionPayload(userId: string) {
  return toBase64Url(JSON.stringify({ uid: userId, exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS }));
}

export async function createSessionToken(userId: string) {
  const payload = sessionPayload(userId);
  const sig = await sign(payload);
  return `${payload}.${sig}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<string | null> {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = await sign(payload);
  if (sig.length !== expected.length) return null;
  let equal = true;
  for (let i = 0; i < expected.length; i++) {
    if (sig.charCodeAt(i) !== expected.charCodeAt(i)) {
      equal = false;
      break;
    }
  }
  if (!equal) return null;
  try {
    const data = JSON.parse(fromBase64Url(payload));
    if (typeof data.uid !== "string" || typeof data.exp !== "number") return null;
    if (data.exp < Math.floor(Date.now() / 1000)) return null;
    return data.uid;
  } catch {
    return null;
  }
}