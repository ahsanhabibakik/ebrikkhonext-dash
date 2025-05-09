import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    // Get product
    const product = await mongoose.models.Product.findById(id);
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Get order count for this product
    const orderCount = await mongoose.models.Order.countDocuments({
      "products.productId": id
    });

    return NextResponse.json({
      ...product.toObject(),
      totalOrders: orderCount
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
