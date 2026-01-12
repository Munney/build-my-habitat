"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Package } from "lucide-react";

/**
 * ProductImage component with fallback support
 * Tries to load Amazon product image, falls back to placeholder
 */
export default function ProductImage({ 
  asin, 
  productLabel, 
  className = "",
  width = 200,
  height = 200,
  priority = false
}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!asin) {
      setImageError(true);
      setIsLoading(false);
      return;
    }

    // Try to get Amazon product image
    // Note: This is a placeholder - actual implementation would need:
    // 1. Amazon Product Advertising API access, OR
    // 2. A backend service to fetch image URLs, OR
    // 3. Pre-fetched image URLs stored in your database
    
    // For now, we'll use a placeholder
    // In production, you'd make an API call here to get the actual image URL
    setImageError(true);
    setIsLoading(false);
  }, [asin]);

  // Show placeholder if no image or error
  if (imageError || !imageUrl) {
    return (
      <div 
        className={`flex items-center justify-center bg-slate-800/50 border border-slate-700/50 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="text-center p-4">
          <Package size={32} className="text-slate-500 mx-auto mb-2" />
          <p className="text-xs text-slate-500 font-medium">{productLabel || "Product"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`} style={{ width, height }}>
      <Image
        src={imageUrl}
        alt={productLabel || "Product image"}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
        onLoad={() => setIsLoading(false)}
        priority={priority}
        unoptimized // Amazon images are already optimized
      />
      {isLoading && (
        <div className="absolute inset-0 bg-slate-800/50 animate-pulse flex items-center justify-center">
          <Package size={24} className="text-slate-500" />
        </div>
      )}
    </div>
  );
}

