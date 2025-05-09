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
  request: NextRequest,
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
  _request: Request,
  context: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const id = context.params.id;
    const categoryToDelete = await mongoose.models.Category.findById(id);
    
    if (!categoryToDelete) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    await mongoose.models.Category.findByIdAndDelete(id);
    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
