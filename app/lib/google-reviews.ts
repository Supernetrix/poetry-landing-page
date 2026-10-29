import { GOOGLE_MAPS_URL, httpsUrl, type GoogleReviews } from "./social";

type GooglePlace = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    name?: string;
    rating?: number;
    originalText?: { text?: string };
    text?: { text?: string };
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
    googleMapsUri?: string;
    relativePublishTimeDescription?: string;
  }>;
};

export function normalizeGoogleReviews(place: GooglePlace): GoogleReviews {
  return {
    rating: typeof place.rating === "number" ? place.rating : null,
    count: typeof place.userRatingCount === "number" ? place.userRatingCount : null,
    url: httpsUrl(place.googleMapsUri) ?? GOOGLE_MAPS_URL,
    reviews: (Array.isArray(place.reviews) ? place.reviews : []).flatMap((review, index) => {
      const text = review.originalText?.text || review.text?.text;
      const author = review.authorAttribution?.displayName;
      if (!text || !author || typeof review.rating !== "number") return [];
      return [{
        id: review.name || String(index),
        text,
        rating: review.rating,
        author,
        authorUrl: httpsUrl(review.authorAttribution?.uri),
        authorPhoto: httpsUrl(review.authorAttribution?.photoUri),
        url: httpsUrl(review.googleMapsUri),
        relativeTime: review.relativePublishTimeDescription || "",
      }];
    }).slice(0, 3),
  };
}

export async function fetchGoogleReviews(
  { apiKey, placeId }: { apiKey?: string; placeId?: string },
  fetcher: typeof fetch = fetch,
): Promise<GoogleReviews | null> {
  if (!apiKey || !placeId) return null;

  try {
    const response = await fetcher(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Google Places returned ${response.status}`);
    return normalizeGoogleReviews(await response.json());
  } catch {
    console.warn("Google reviews are unavailable. Check the Places API configuration.");
    return null;
  }
}
