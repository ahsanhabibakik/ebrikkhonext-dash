"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { useCategoryStore } from "@/store/useCategoryStore";
import Link from "next/link";
import { Category } from "@/services/categoryService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface CategoriesTableProps {
  categories: Category[];
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const { deleteCategory } = useCategoryStore();
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    setCategoryToDelete(null);
  };

  const getCategoryPath = (category: Category): string[] => {
    const path: string[] = [category.name];
    let currentCategory = category;

    while (currentCategory.parent) {
      const parentCategory = categories.find(
        (c) => c._id === currentCategory.parent
      );
      if (parentCategory) {
        path.unshift(parentCategory.name);
        currentCategory = parentCategory;
      } else {
        break;
      }
    }

    return path;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Parent Path</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => {
            const path = getCategoryPath(category);
            const level = path.length;

            return (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>Level {level}</TableCell>
                <TableCell>
                  {level > 1 ? path.slice(0, -1).join(" > ") : "-"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      category.status === "active" ? "success" : "secondary"
                    }
                  >
                    {category.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/categories/edit/${category._id}`}>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <AlertDialog open={categoryToDelete === category._id}>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500"
                          onClick={() => setCategoryToDelete(category._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the category "
                            {category.name}". This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setCategoryToDelete(null)}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleDelete(category._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
