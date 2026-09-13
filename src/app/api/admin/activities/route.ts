import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const activities = await db.activity.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(activities);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const activity = await db.activity.create({ data: { title: body.title, slug: body.slug, description: body.description, order: body.order || 0, companyId: body.companyId || null, status: body.status || "active" } });
  return NextResponse.json(activity, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const body = await req.json();
  const activity = await db.activity.update({ where: { id: id! }, data: { title: body.title, slug: body.slug, description: body.description, order: body.order, companyId: body.companyId || null, status: body.status } });
  return NextResponse.json(activity);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await db.activity.delete({ where: { id: id! } });
  return NextResponse.json({ success: true });
}
