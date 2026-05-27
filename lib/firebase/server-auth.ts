import { NextRequest } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";

export async function getServerUser(request: NextRequest) {
  const header = request.headers.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  if (!token) {
    return { uid: "demo", email: "demo@steilar.ai", demo: true };
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return { uid: decoded.uid, email: decoded.email, demo: false };
  } catch {
    return { uid: "demo", email: "demo@steilar.ai", demo: true };
  }
}
