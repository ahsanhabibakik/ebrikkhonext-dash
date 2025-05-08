import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const category = await mongoose.models.Category.findById(params.id).populate('parent');
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const category = await mongoose.models.Category.findByIdAndUpdate(
      params.id,
      data,
      { new: true }
    );
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    await mongoose.models.Category.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
