import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: String,
  image: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  status: { type: String, default: "active" },
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find({}).populate('parent');
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const category = await Category.create(data);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
