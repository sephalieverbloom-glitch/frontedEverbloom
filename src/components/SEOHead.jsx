import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Lightweight dynamic SEO Title & Meta Manager
 * Updates document.title, description, and canonical on route transitions.
 */
export default function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
}) {
  const location = useLocation();

  useEffect(() => {
    // 1. Dynamic Page Titles with local SEO anchors
    const defaultTitle = "Everbloom Café | Best Café in Bhubaneswar & Near SUM Ultimate Medicare";
    document.title = title ? `${title} · Everbloom Café Bhubaneswar` : defaultTitle;

    // 2. Dynamic Meta Description
    const defaultDesc =
      "Everbloom Café is Bhubaneswar's top aesthetic café & coffee shop near SUM Ultimate Medicare, K8 Kalinga Nagar. Single-origin coffees, loaded wraps, pizzas, burgers & nature garden patio.";
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute("content", description || defaultDesc);
    }

    // 3. Dynamic Meta Keywords
    if (keywords) {
      const keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta) {
        keywordsMeta.setAttribute("content", keywords);
      }
    }

    // 4. Update Canonical Link
    const fullUrl = canonicalUrl || `https://everbloomcafe.in${location.pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute("href", fullUrl);
    }
  }, [title, description, keywords, canonicalUrl, location.pathname]);

  return null;
}
