import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const projects = await db.project.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const project = await db.project.create({ data: { name: body.name, slug: body.slug, location: body.location, sector: body.sector, status: body.status || "Planning", description: body.description, companyId: body.companyId || null, featured: body.featured || false, startDate: body.startDate || null } });
  return NextResponse.json(project, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const body = await req.json();
  const project = await db.project.update({ where: { id: id! }, data: { name: body.name, slug: body.slug, location: body.location, sector: body.sector, status: body.status, description: body.description, companyId: body.companyId || null, featured: body.featured, startDate: body.startDate } });
  return NextResponse.json(project);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await db.project.delete({ where: { id: id! } });
  return NextResponse.json({ success: true });
}
