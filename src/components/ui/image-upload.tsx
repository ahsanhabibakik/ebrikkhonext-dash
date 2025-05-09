"use client";

import { useDropzone } from "react-dropzone";
import { useState } from "react";
import Image from "next/image";
import { Button } from "./button";
import { ImagePlus, X } from "lucide-react";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove?: (value: string) => void;
  maxFiles?: number;
}

export function ImageUpload({
  value = [],
  onChange,
  onRemove,
  maxFiles = 1
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    setLoading(true);
    // TODO: Implement actual image upload to your storage service
    // For now, we'll use a placeholder URL
    const urls = acceptedFiles.map((file) => URL.createObjectURL(file));
    onChange([...value, ...urls]);
    setLoading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles,
    disabled: value.length >= maxFiles
  });

  const removeImage = (url: string) => {
    onChange(value.filter((v) => v !== url));
    if (onRemove) {
      onRemove(url);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
          ${isDragActive ? 'border-primary' : 'border-gray-300'}
          ${value.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <ImagePlus className="h-8 w-8 text-gray-500" />
          <p className="text-sm text-gray-600">
            Drag & drop images here, or click to select
          </p>
          {maxFiles > 1 && (
            <p className="text-xs text-gray-500">
              You can upload up to {maxFiles} images
            </p>
          )}
        </div>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {value.map((url) => (
            <div key={url} className="relative group">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={url}
                  alt="Uploaded image"
                  className="object-cover"
                  fill
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2"
                onClick={() => removeImage(url)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
