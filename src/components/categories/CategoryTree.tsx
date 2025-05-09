"use client";

import { useState } from "react";
import { Category } from "@/services/categoryService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { useCategoryStore } from "@/store/useCategoryStore";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CategoryTreeProps {
  categories: Category[];
}

export function CategoryTree({ categories }: CategoryTreeProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { deleteCategory } = useCategoryStore();

  const getChildCategories = (parentId: string) => {
    return categories.filter(cat => cat.parent === parentId);
  };

  const getCategoryLevel = (category: Category): number => {
    let level = 0;
    let current = category;
    
    while (current.parent) {
      level++;
      current = categories.find(c => c._id === current.parent) || current;
      // Prevent infinite loops
      if (level > 20) break;
    }
    
    return level;
  };

  const getCategoryPath = (category: Category): string[] => {
    const path: string[] = [];
    let current = category;

    while (current) {
      path.unshift(current.name);
      current = categories.find(c => c._id === current.parent) || null;
    }

    return path;
  };

  const getCategoryPathString = (category: Category): string => {
    const path = getCategoryPath(category);
    return path.join(' > ');
  };

  const buildCategoryTree = (parentId: string | null = null) => {
    const categoryItems = categories.filter(cat => 
      parentId ? cat.parent === parentId : !cat.parent
    );

    if (!categoryItems.length) {
      return parentId ? (
        <div className="p-4 text-sm text-muted-foreground italic">
          No subcategories
        </div>
      ) : null;
    }

    return (
      <div className="space-y-2">
        {categoryItems.map(category => {
          const path = getCategoryPath(category);
          const level = path.length;
          const hasChildren = getChildCategories(category._id).length > 0;

          return (
            <Card key={category._id} className={cn(
              "p-4",
              level > 1 && "ml-6 border-l-2"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => setExpandedItems(prev => 
                      prev.includes(category._id)
                        ? prev.filter(id => id !== category._id)
                        : [...prev, category._id]
                    )}
                  >
                    <ChevronRight className={cn(
                      "h-4 w-4 transition-transform",
                      expandedItems.includes(category._id) && "rotate-90"
                    )} />
                  </Button>
                  <div>
                    <span className="font-medium">{category.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      Level {level}
                    </span>
                    {level > 1 && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Path: {path.slice(0, -1).join(' > ')}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/dashboard/categories/new?parent=${category._id}`}>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Subcategory
                    </Button>
                  </Link>
                  <Link href={`/dashboard/categories/edit/${category._id}`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500"
                    onClick={async () => {
                      if (hasChildren) {
                        toast.error("Cannot delete category with subcategories");
                        return;
                      }
                      if (confirm("Are you sure you want to delete this category?")) {
                        await deleteCategory(category._id);
                        toast.success("Category deleted successfully");
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {expandedItems.includes(category._id) && (
                <div className="mt-4">
                  {buildCategoryTree(category._id)}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Category Structure</h2>
        <Link href="/dashboard/categories/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Root Category
          </Button>
        </Link>
      </div>
      {buildCategoryTree()}
    </div>
  );
}
