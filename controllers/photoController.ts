import axios from "axios";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 7200 }); // 2 hrs
export const getRandomPhotos = async (number: number) => {
  const cacheKey = `photos-${number}`;
  if (cache.has(cacheKey)) {
    console.log('Returning cached data');
    return cache.get(cacheKey);
  }
  try {
    const validPerPage = Math.min(Math.max(number, 3), 200);
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: process.env.PIXABAY_ACCESS_KEY,
        image_type: "photo",
        per_page: validPerPage,
      },
    });

    const photoUrls = response.data.hits.map(
      (photo: any) => photo.webformatURL
    );
    cache.set(cacheKey, photoUrls);
    return photoUrls;
  } catch (error: any) {
    console.error("Error fetching photos from Pixabay:", error.message);
    return [];
  }
};
