/**
 * Image Data API Service
 * Service for fetching image data from Cloudinary and other sources
 */

class ImageDataApiService {
    constructor() {
        // Default cloud name - can be overridden in method calls
        this.defaultCloudName = 'dkmd7ojil';
    }

    /**
     * Fetch Cloudinary image URLs for multiple tags
     * @param {string[]} tags - Array of tags (or folder/tag names)
     * @param {object} options - Optional transformation options
     * @returns {Promise<string[]>} - Combined array of image URLs
     */
    async getCloudinaryImagesByTags(tags, options = {}) {
        const cloudName = this.defaultCloudName;
        const transform = options.transform || ""; // e.g. "w_400,q_auto,f_auto"
        const timeout = options.timeout || 10000; // 10 second timeout

        // Helper function to add timeout to fetch
        const fetchWithTimeout = (url, timeoutMs) => {
            return Promise.race([
                fetch(url),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
                )
            ]);
        };

        // Create an array of fetch promises for each tag
        const fetches = tags.map(async (tag) => {
            try {
                const res = await fetchWithTimeout(
                    `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`,
                    timeout
                );
                
                if (!res.ok) {
                    console.warn(`Tag ${tag} returned status ${res.status}`);
                    return [];
                }
                
                const data = await res.json();
                
                if (!data.resources || !Array.isArray(data.resources)) {
                    console.warn(`Tag ${tag} returned invalid data structure`);
                    return [];
                }
                
                return data.resources.map(photo =>
                    transform
                        ? `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${photo.public_id}.${photo.format}`
                        : `https://res.cloudinary.com/${cloudName}/image/upload/${photo.public_id}.${photo.format}`
                );
            } catch (error) {
                console.error(`Failed to fetch images for tag ${tag}:`, error);
                return [];
            }
        });

        // Wait for all fetches and flatten the results
        const results = await Promise.all(fetches);
        // console.log('Cloudinary API results:', results);
        return results.flat();
    }

    /**
     * Fetch Cloudinary images with metadata for multiple tags
     * @param {string[]} tags - Array of tags (or folder/tag names)
     * @param {object} options - Optional transformation options
     * @returns {Promise<object[]>} - Combined array of image objects with metadata
     */
    async getCloudinaryImagesWithMetadata(tags, options = {}) {
        const cloudName = this.defaultCloudName;
        const transform = options.transform || ""; // e.g. "w_400,q_auto,f_auto"
        const timeout = options.timeout || 10000; // 10 second timeout

        // Helper function to add timeout to fetch
        const fetchWithTimeout = (url, timeoutMs) => {
            return Promise.race([
                fetch(url),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
                )
            ]);
        };

        // Create an array of fetch promises for each tag
        const fetches = tags.map(async (tag) => {
            try {
                const res = await fetchWithTimeout(
                    `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`,
                    timeout
                );
                
                if (!res.ok) {
                    console.warn(`Tag ${tag} returned status ${res.status}`);
                    return [];
                }
                
                const data = await res.json();
                
                if (!data.resources || !Array.isArray(data.resources)) {
                    console.warn(`Tag ${tag} returned invalid data structure`);
                    return [];
                }
                
                return data.resources.map(photo => ({
                    url: transform
                        ? `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${photo.public_id}.${photo.format}`
                        : `https://res.cloudinary.com/${cloudName}/image/upload/${photo.public_id}.${photo.format}`,
                    created_at: photo.created_at,
                    public_id: photo.public_id,
                    format: photo.format,
                    tag: tag
                }));
            } catch (error) {
                console.error(`Failed to fetch images for tag ${tag}:`, error);
                return [];
            }
        });

        // Wait for all fetches and flatten the results
        const results = await Promise.all(fetches);
        return results.flat();
    }

    /**
     * Get optimized image transformations for different use cases
     * @param {string} useCase - 'thumbnail', 'gallery', 'full', or custom
     * @returns {string} - Transformation string
     */
    getTransformation(useCase) {
        const transformations = {
            thumbnail: 'w_300,h_300,c_fill,q_auto,f_auto',
            gallery: 'w_800,q_auto,f_auto',
            full: 'q_auto,f_auto',
            hero: 'w_1200,h_600,c_fill,q_auto,f_auto'
        };

        return transformations[useCase] || transformations.gallery;
    }

    /**
     * Fetch images with predefined transformation
     * @param {string[]} tags - Array of tags
     * @param {string} useCase - Transformation use case
     * @returns {Promise<string[]>} - Array of transformed image URLs
     */
    async getTransformedImages(tags, useCase = 'gallery') {
        const options = {
            transform: this.getTransformation(useCase)
        };
        return this.getCloudinaryImagesByTags(tags, options);
    }
}

// Create and export singleton instance
const imageDataApi = new ImageDataApiService();

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = imageDataApi;
} else if (typeof window !== 'undefined') {
    window.imageDataApi = imageDataApi;
}

// Export the class as well for potential instantiation
if (typeof module !== 'undefined' && module.exports) {
    module.exports.ImageDataApiService = ImageDataApiService;
} else if (typeof window !== 'undefined') {
    window.ImageDataApiService = ImageDataApiService;
}
