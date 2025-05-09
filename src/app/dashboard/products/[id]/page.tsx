"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProductStore } from "@/store/useProductStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { getProduct, loading } = useProductStore();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (params.id) {
        const data = await getProduct(params.id as string);
        setProduct(data);
      }
    };
    loadProduct();
  }, [params.id, getProduct]);

  if (loading || !product) return <div>Loading...</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="text-3xl font-bold">{product.name}</h2>
        </div>
        <Link href={`/dashboard/products/edit/${product._id}`}>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Product
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
          </CardHeader>
          <CardContent>
            {product.images && product.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {product.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="rounded-lg object-cover w-full aspect-square"
                  />
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground">No images available</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {product.price && (
              <div>
                <h3 className="font-medium">Price</h3>
                <p className="text-2xl font-bold">৳{product.price}</p>
                {product.discountedPrice && (
                  <p className="text-muted-foreground line-through">
                    ৳{product.discountedPrice}
                  </p>
                )}
              </div>
            )}

            {product.category && (
              <div>
                <h3 className="font-medium">Category</h3>
                <p>{product.category}</p>
              </div>
            )}

            <div>
              <h3 className="font-medium">Stock</h3>
              <Badge variant={product.stock > 0 ? "success" : "destructive"}>
                {product.stock || 0} in stock
              </Badge>
            </div>

            <div>
              <h3 className="font-medium">Status</h3>
              <Badge variant={product.status === "active" ? "success" : "secondary"}>
                {product.status}
              </Badge>
            </div>

            {product.shortDescription && (
              <div>
                <h3 className="font-medium">Short Description</h3>
                <p>{product.shortDescription}</p>
              </div>
            )}

            {product.description && (
              <div>
                <h3 className="font-medium">Full Description</h3>
                <div className="prose max-w-none" 
                  dangerouslySetInnerHTML={{ __html: product.description }} 
                />
              </div>
            )}

            {product.totalOrders !== undefined && (
              <div>
                <h3 className="font-medium">Total Orders</h3>
                <p className="text-2xl font-bold">{product.totalOrders}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
