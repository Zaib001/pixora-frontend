/**
 * Utility to trigger a browser download from a URL.
 * Bypasses cross-origin restrictions by fetching as a Blob.
 * 
 * @param {string} url - The URL of the file to download
 * @param {string} filename - The name to save the file as
 */
export const downloadFile = async (url, filename = 'pixora-download') => {
    try {
        // Sanitize URL
        let sanitizedUrl = url;

        // If it's an internal stream, add download=true to help backend set headers
        const isInternalStream = url.includes('/api/content/stream/');
        if (isInternalStream && !url.includes('download=true')) {
            sanitizedUrl = `${url}${url.includes('?') ? '&' : '?'}download=true`;
        }

        // Force HTTPS for production URLs if they come as HTTP
        if (sanitizedUrl.includes('vercel.app') && sanitizedUrl.startsWith('http:')) {
            sanitizedUrl = sanitizedUrl.replace('http:', 'https:');
        }

        console.log(`[Download] Fetching from: ${sanitizedUrl}`);

        const response = await fetch(sanitizedUrl);
        if (!response.ok) throw new Error(`Network response was not ok (${response.status})`);

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
        let fallbackUrl = url;
        if (fallbackUrl.includes('vercel.app') && fallbackUrl.startsWith('http:')) {
            fallbackUrl = fallbackUrl.replace('http:', 'https:');
        }

        const isInternalStream = fallbackUrl.includes('/api/content/stream/');
        const downloadUrl = isInternalStream && !fallbackUrl.includes('download=true')
            ? `${fallbackUrl}${fallbackUrl.includes('?') ? '&' : '?'}download=true`
            : fallbackUrl;

        console.log(`[Download] Falling back to direct link: ${downloadUrl}`);

        // Create a hidden link and click it
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', filename);

        // For internal streams, we prefer the current window to trigger the attachment download
        // without redirection if the browser supports it. 
        // For external URLs, we use _blank as a safety measure.
        if (!isInternalStream) {
            link.setAttribute('target', '_blank');
        }

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return { success: false, error };
    }
};
