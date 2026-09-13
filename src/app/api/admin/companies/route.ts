import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const companies = await db.company.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(companies);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const company = await db.company.create({ data: { name: body.name, slug: body.slug, brandName: body.brandName, description: body.description } });
  return NextResponse.json(company, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const body = await req.json();
  const company = await db.company.update({ where: { id: id! }, data: { name: body.name, slug: body.slug, brandName: body.brandName, description: body.description } });
  return NextResponse.json(company);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await db.company.delete({ where: { id: id! } });
  return NextResponse.json({ success: true });
}
