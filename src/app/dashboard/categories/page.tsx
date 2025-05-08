"use client";

import { useEffect } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CategoriesTable } from "@/components/categories/CategoriesTable";
import { Badge } from "@/components/ui/badge";

export default function CategoriesPage() {
  const { categories, loading, error, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const activeCategories = categories.filter(c => c.status === 'active').length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground mt-2">
            Manage your product categories and subcategories
          </p>
        </div>
        <Link href="/dashboard/categories/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="text-sm font-medium text-muted-foreground">
            Total Categories
          </div>
          <div className="mt-2 text-3xl font-bold">{categories.length}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm font-medium text-muted-foreground">
            Active Categories
          </div>
          <div className="mt-2 text-3xl font-bold">{activeCategories}</div>
        </div>
      </div>

      <CategoriesTable categories={categories} />
    </div>
  );
}
