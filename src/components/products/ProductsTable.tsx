"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, ImageOff } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export function ProductsTable({ products }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                {product.images?.[0] ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <ImageOff className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">{product.name || "Unnamed Product"}</TableCell>
              <TableCell>
                {product.category || "Uncategorized"}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">
                    ৳{formatPrice(product.price || 0)}
                  </span>
                  {product.discountedPrice && product.discountedPrice < product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ৳{formatPrice(product.discountedPrice)}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={
                    !product.stock ? "destructive" :
                    product.stock <= 5 ? "warning" : "success"
                  }
                >
                  {product.stock || 0} in stock
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={
                    !product.status || product.status === 'inactive' ? "secondary" :
                    product.status === 'out-of-stock' ? "destructive" : "success"
                  }
                >
                  {product.status || "inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/products/${product._id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/products/edit/${product._id}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-red-500"
                  onClick={() => {
                    // Add delete confirmation dialog
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
