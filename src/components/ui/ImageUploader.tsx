"use client";

import { useState } from "react";
import { Button } from "./button";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export function ImageUploader({ value = [], onChange, maxImages = 5 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement actual upload logic
    console.log("Upload files:", e.target.files);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {value.map((url, index) => (
          <div key={index} className="relative w-24 h-24">
            <Image
              src={url}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
            <button
              title="Remove image"
              onClick={() => {
                const newUrls = value.filter((_, i) => i !== index);
                onChange(newUrls);
              }}
              className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {value.length < maxImages && (
        <Button
          type="button"
          variant="outline"
          disabled={uploading}
          onClick={() => document.getElementById("image-upload")?.click()}
        >
          <ImagePlus className="w-4 h-4 mr-2" />
          Add Image
        </Button>
      )}
      
      <label htmlFor="image-upload" className="sr-only">
        Upload images
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleUpload}
        title="Upload images"
      />
    </div>
  );
}
