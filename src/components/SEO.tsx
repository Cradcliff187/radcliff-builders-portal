import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

const SEO = ({ title, description, image, url }: SEOProps) => {
  const location = useLocation();
  const currentUrl = url || `${window.location.origin}${location.pathname}`;
  const defaultImage = `${window.location.origin}/favicon-rcg.png`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = "name") => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Update description
    updateMetaTag("description", description);

    // Open Graph tags
    updateMetaTag("og:title", title, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:image", image || defaultImage, "property");
    updateMetaTag("og:url", currentUrl, "property");
    updateMetaTag("og:type", "website", "property");

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image || defaultImage);
  }, [title, description, image, currentUrl, defaultImage]);

  return null;
};

export default SEO;

