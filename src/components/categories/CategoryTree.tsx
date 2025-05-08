"use client";

import { Category } from "@/services/categoryService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CategoryTreeProps {
  categories: Category[];
}

export function CategoryTree({ categories }: CategoryTreeProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { deleteCategory } = useCategoryStore();

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const buildCategoryTree = (parentId: string | null = null, level: number = 0) => {
    const categoryItems = categories.filter(cat => 
      parentId ? cat.parent === parentId : !cat.parent
    );

    if (!categoryItems.length) return null;

    return (
      <div className="space-y-2">
        {categoryItems.map(category => (
          <div key={category._id} className={cn("pl-4", level > 0 && "ml-4 border-l")}>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => toggleExpand(category._id)}
                  >
                    <ChevronRight className={cn(
                      "h-4 w-4 transition-transform",
                      expandedItems.includes(category._id) && "rotate-90"
                    )} />
                  </Button>
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/dashboard/categories/edit/${category._id}`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteCategory(category._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {expandedItems.includes(category._id) && (
                buildCategoryTree(category._id, level + 1)
              )}
            </Card>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link href="/dashboard/categories/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </Link>
      </div>
      {buildCategoryTree()}
    </div>
  );
}
