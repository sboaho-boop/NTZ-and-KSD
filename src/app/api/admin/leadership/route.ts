import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const leaders = await db.leadership.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(leaders);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const leader = await db.leadership.create({ data: { name: body.name, slug: body.slug, position: body.position, biography: body.biography } });
  return NextResponse.json(leader, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const body = await req.json();
  const leader = await db.leadership.update({ where: { id: id! }, data: { name: body.name, slug: body.slug, position: body.position, biography: body.biography } });
  return NextResponse.json(leader);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await db.leadership.delete({ where: { id: id! } });
  return NextResponse.json({ success: true });
}
