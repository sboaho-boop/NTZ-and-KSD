import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const articles = await db.news.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const article = await db.news.create({ data: { title: body.title, slug: body.slug, category: body.category, author: body.author || "NTZ SPRL & KSD SARL", content: body.content, summary: body.summary, published: body.published || false, companyId: body.companyId || null } });
  return NextResponse.json(article, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const body = await req.json();
  const article = await db.news.update({ where: { id: id! }, data: { title: body.title, slug: body.slug, category: body.category, content: body.content, summary: body.summary, published: body.published } });
  return NextResponse.json(article);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await db.news.delete({ where: { id: id! } });
  return NextResponse.json({ success: true });
}
