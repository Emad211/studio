
"use client";

import { useState } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, UploadCloud } from "lucide-react";
import { FormDescription } from "../ui/form";

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
}

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
        toast({
            variant: "destructive",
            title: "فایل بزرگ",
            description: "حجم فایل نباید بیشتر از 5 مگابایت باشد.",
        });
        return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "خطا در آپلود فایل");
      }

      onChange(result.url);
      toast({ title: "موفقیت", description: "تصویر با موفقیت آپلود شد." });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "خطا در آپلود",
        description: error.message,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative w-full aspect-video rounded-md overflow-hidden border bg-muted">
          <Image
            src={value}
            alt="پیش‌نمایش تصویر"
            fill
            className="object-contain"
          />
        </div>
      )}
      <div className="flex items-center gap-2">
        <Input
          dir="ltr"
          placeholder="https://example.com/image.png"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="flex-grow"
          disabled={isUploading}
        />
        <Button asChild variant="outline" className="relative cursor-pointer">
          <div>
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <UploadCloud className="w-4 h-4" />
            )}
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileUpload}
              disabled={isUploading}
              accept="image/*,image/gif"
            />
          </div>
        </Button>
      </div>
      <FormDescription>
        می‌توانید یک URL را مستقیماً جای‌گذاری کنید یا فایل جدیدی (JPG, PNG, GIF) را از سیستم خود آپلود نمایید.
      </FormDescription>
    </div>
  );
}
