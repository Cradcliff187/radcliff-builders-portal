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
  const defaultImage = "https://teamradcliff.com/favicon-rcg.png";

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

    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", currentUrl);

    // Add LocalBusiness structured data (JSON-LD)
    let structuredDataScript = document.querySelector('script[type="application/ld+json"][data-schema="localbusiness"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement("script");
      structuredDataScript.setAttribute("type", "application/ld+json");
      structuredDataScript.setAttribute("data-schema", "localbusiness");
      document.head.appendChild(structuredDataScript);
    }

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Radcliff Construction Group",
      "alternateName": "RCG",
      "url": "https://teamradcliff.com",
      "logo": "https://teamradcliff.com/favicon-rcg.png",
      "telephone": "859-816-2314",
      "email": "info@radcliffconstructiongroup.com",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "KY",
        "addressCountry": "US"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Cincinnati"
        },
        {
          "@type": "City",
          "name": "Dayton"
        },
        {
          "@type": "City",
          "name": "Lexington"
        },
        {
          "@type": "State",
          "name": "Northern Kentucky"
        }
      ],
      "serviceType": [
        "Healthcare Renovations",
        "Commercial Construction",
        "Office Buildouts",
        "Retail Construction",
        "ICRA-Certified Construction",
        "OSHA 30 Certified Construction"
      ],
      "priceRange": "$25,000-$500,000",
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "OSHA 30 Certified"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "ICRA Certified"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "BBB Accredited Business (A- Rating)"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Fully Licensed"
        }
      ],
      "sameAs": [
        "https://www.bbb.org/us/ky/erlanger/profile/construction/radcliff-construction-group-llc-0292-90053745"
      ]
    };

    structuredDataScript.textContent = JSON.stringify(localBusinessSchema);
  }, [title, description, image, currentUrl, defaultImage]);

  return null;
};

export default SEO;

