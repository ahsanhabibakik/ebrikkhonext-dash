"use client";

import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import Image from "next/image";

export function ImageUploader({ value = [], onChange, maxImages = 5 }) {
  const onDrop = (acceptedFiles: File[]) => {
    // Handle file upload logic here
    console.log(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: maxImages,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${isDragActive ? 'border-primary' : 'border-muted-foreground'}`}
      >
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select files</p>
        <p className="text-sm text-muted-foreground">
          Maximum {maxImages} images allowed
        </p>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {value.map((image: string, index: number) => (
            <Card key={index} className="relative">
              <button
                onClick={() => {
                  const newImages = value.filter((_, i) => i !== index);
                  onChange(newImages);
                }}
                className="absolute top-2 right-2 p-1 bg-background/80 rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                width={200}
                height={200}
                className="object-cover rounded-lg"
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
