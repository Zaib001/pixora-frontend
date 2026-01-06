/**
 * Utility to trigger a browser download from a URL.
 * Bypasses cross-origin restrictions by fetching as a Blob.
 * 
 * @param {string} url - The URL of the file to download
 * @param {string} filename - The name to save the file as
 */
export const downloadFile = async (url, filename = 'pixora-download') => {
    try {
        // Sanitize URL: Force HTTPS if it's our backend
        let sanitizedUrl = url;
        if (url.startsWith('http://pixora-backend-one.vercel.app')) {
            sanitizedUrl = url.replace('http://', 'https://');
        }

        const response = await fetch(sanitizedUrl);
        if (!response.ok) throw new Error('Network response was not ok');

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
        return { success: true };
    } catch (error) {
        console.error('Download failed:', error);

        // Fallback: Try native browser download with force-download parameter
        // Ensure the fallback URL also uses HTTPS if it's our backend
        let fallbackUrl = url;
        if (url.startsWith('http://pixora-backend-one.vercel.app')) {
            fallbackUrl = url.replace('http://', 'https://');
        }

        const isInternalStream = fallbackUrl.includes('/api/content/stream/');
        const downloadUrl = isInternalStream
            ? `${fallbackUrl}${fallbackUrl.includes('?') ? '&' : '?'}download=true`
            : fallbackUrl;

        // Create a hidden link and click it
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', filename);

        // If it's an external URL (like Azure blob), target='_blank' 
        // will at least open it in a new tab if download fails.
        // For internal streams, we prefer the current window to trigger the attachment download.
        if (!isInternalStream) {
            link.setAttribute('target', '_blank');
        }

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return { success: false, error };
    }
};
