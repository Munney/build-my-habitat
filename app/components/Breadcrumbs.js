"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs({ items }) {
  // Add home as first item if not present
  const breadcrumbs = items && items.length > 0 
    ? [{ label: 'Home', href: '/' }, ...items]
    : [{ label: 'Home', href: '/' }];

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-slate-400 flex-wrap">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-2">
              {index === 0 ? (
                <Link 
                  href={item.href} 
                  className="hover:text-white transition-colors flex items-center gap-1"
                  aria-label="Home"
                >
                  <Home size={16} />
                </Link>
              ) : (
                <>
                  <ChevronRight size={16} className="text-slate-600" />
                  {isLast ? (
                    <span className="text-white font-medium" aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link 
                      href={item.href} 
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

