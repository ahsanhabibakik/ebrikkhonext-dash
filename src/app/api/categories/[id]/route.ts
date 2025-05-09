import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { type NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const category = await mongoose.models.Category.findById(params.id).populate('parent');
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const category = await mongoose.models.Category.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const hasChildren = await mongoose.models.Category.findOne({ parent: id });
    if (hasChildren) {
      return NextResponse.json({ 
        error: "Cannot delete category with subcategories" 
      }, { status: 400 });
    }
    await mongoose.models.Category.findByIdAndDelete(id);
    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
