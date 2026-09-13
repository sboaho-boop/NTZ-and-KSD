import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [companies, news, projects, messages, activities] = await Promise.all([
      db.company.count(),
      db.news.count(),
      db.project.count(),
      db.message.count(),
      db.activity.count(),
    ]);
    return NextResponse.json({ companies, news, projects, messages, activities });
  } catch {
    return NextResponse.json({ companies: 0, news: 0, projects: 0, messages: 0, activities: 0 });
  }
}
