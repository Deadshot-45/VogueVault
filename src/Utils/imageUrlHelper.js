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

  if (!isProduction) {
    // In development, return URL as-is
    return imageUrl;
  }

  // If it's already a relative URL or already using proxy, return as-is
  if (
    imageUrl.startsWith("/") ||
    imageUrl.startsWith("./") ||
    imageUrl.startsWith("../")
  ) {
    return imageUrl;
  }

  // If it's a backend URL, convert to proxy URL
  const backendUrl = "https://vault-vogue-expressjs.vercel.app";
  if (imageUrl.startsWith(backendUrl)) {
    // Extract the path (everything after the domain)
    const path = imageUrl.replace(backendUrl, "");
    // Convert to proxy path
    return `/api${path}`;
  }

  // If it's just a filename or path (like "hero_img.png" or "/hero_img.png")
  if (imageUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    // If it starts with /, use it directly; otherwise add /
    const cleanPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
    return `/api${cleanPath}`;
  }

  // Return as-is for other cases
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

  return transformed;
};

/**
 * Transforms image URLs in an array of products
 */
export const transformProductsImages = (products) => {
  if (!Array.isArray(products)) return products;
  return products.map(transformProductImages);
};
