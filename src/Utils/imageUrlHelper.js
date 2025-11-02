/**
 * Converts backend image URLs to proxy URLs for production
 * This ensures images go through the Vercel proxy to avoid CORS issues
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== "string") {
    return imageUrl;
  }
  const isProduction =
    import.meta.env.PROD ||
    (typeof window !== "undefined" &&
      window.location.hostname.includes("vercel.app"));

  // If it's already using the proxy paths, return as-is
  if (imageUrl.startsWith("/images/") || imageUrl.startsWith("/api/")) {
    return imageUrl;
  }

  // If it's already a full backend URL, convert it
  const backendUrl = "https://vault-vogue-expressjs.vercel.app";
  if (imageUrl.startsWith(backendUrl)) {
    // In development, return as-is (full backend URL works)
    if (!isProduction) {
      return imageUrl;
    }
    // In production, convert to proxy path
    const path = imageUrl.replace(backendUrl, "");
    // Convert to proxy path - images go through /images proxy, API goes through /api
    if (path.startsWith("/api")) {
      return path; // Already has /api prefix
    }
    // Root level images (like /hero_img.png) - route through /images proxy
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `/images/${cleanPath}`;
  }

  // If it's a relative path starting with /, check if it needs transformation
  if (
    imageUrl.startsWith("/") &&
    imageUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
  ) {
    // Relative path like /quality_icon.png
    if (!isProduction) {
      // Development: return full backend URL
      const backendUrl = "https://vault-vogue-expressjs.vercel.app";
      return `${backendUrl}${imageUrl}`;
    }
    // Production: route through /images proxy
    const cleanPath = imageUrl.substring(1); // Remove leading slash
    return `/images/${cleanPath}`;
  }

  // If it's a relative path not starting with /, also route through /images
  if (imageUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    // In development, use full backend URL. In production, use /images proxy
    if (!isProduction) {
      // Development: return full backend URL
      const backendUrl = "https://vault-vogue-expressjs.vercel.app";
      const cleanPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
      return `${backendUrl}${cleanPath}`;
    }
    // Production: use /images proxy
    return `/images/${imageUrl}`;
  }

  // If it's other relative paths (./ or ../), return as-is for development
  if (
    !isProduction &&
    (imageUrl.startsWith("./") || imageUrl.startsWith("../"))
  ) {
    return imageUrl;
  }

  // Return as-is for other cases (non-image URLs)
  return imageUrl;
};

/**
 * Transforms image URLs in product data
 */
export const transformProductImages = (product) => {
  if (!product) return product;

  const transformed = { ...product };

  if (Array.isArray(transformed.image)) {
    transformed.image = transformed.image.map((img) => getImageUrl(img));
  } else if (typeof transformed.image === "string") {
    transformed.image = getImageUrl(transformed.image);
  }

  console.log("transformed", transformed);

  return transformed;
};

/**
 * Transforms image URLs in an array of products
 */
export const transformProductsImages = (products) => {
  if (!products) {
    console.warn("transformProductsImages: products is null/undefined");
    return [];
  }
  if (!Array.isArray(products)) {
    console.warn("transformProductsImages: products is not an array", products);
    return [];
  }
  if (products.length === 0) {
    console.warn("transformProductsImages: products array is empty");
    return [];
  }
  return products.map(transformProductImages);
};
