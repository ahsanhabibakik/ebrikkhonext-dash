import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, unique: true },
    brand: String,
    shortDescription: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    discountedPrice: Number,
    tags: [String],
    image: String,
    images: [String],
    category: String,
    subCategory: [String],
    stock: { type: Number, default: 0 },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const product = await Product.create(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
