
"use client";

import { getSiteSettings } from "@/lib/actions";
import { useEffect, useState } from "react";

interface SeoPreviewProps {
  title: string;
  description: string;
  slug: string;
}

export function SeoPreview({ title, description, slug }: SeoPreviewProps) {
  const [siteUrl, setSiteUrl] = useState("https://example.com");

  useEffect(() => {
    async function fetchUrl() {
      try {
        const settings = await getSiteSettings();
        setSiteUrl(settings.seo.siteURL || "https://example.com");
      } catch (error) {
        console.error("Failed to fetch site settings for SEO preview.");
      }
    }
    fetchUrl();
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-muted/30">
      <h4 className="text-sm font-semibold mb-2 sr-only">پیش‌نمایش در نتایج گوگل</h4>
      <div className="space-y-1 font-sans">
        <p 
            className="text-[#1a0dab] dark:text-[#8ab4f8] text-lg truncate" 
            dir="auto"
        >
            {title || "Meta Title Preview"}
        </p>
        <p className="text-[#006621] dark:text-[#90ee90] text-sm truncate" dir="ltr">{`${siteUrl}/${slug}`}</p>
        <p className="text-sm text-muted-foreground line-clamp-2" dir="auto">{description || "Meta description preview will appear here once you start typing."}</p>
      </div>
    </div>
  );
}

    