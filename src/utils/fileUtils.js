/**
 * Utility to trigger a browser download from a URL.
 * Bypasses cross-origin restrictions by fetching as a Blob.
 * 
 * @param {string} url - The URL of the file to download
 * @param {string} filename - The name to save the file as
 */
export const downloadFile = async (url, filename = 'pixora-download') => {
    try {
        const response = await fetch(url);
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
        const isInternalStream = url.includes('/api/content/stream/');
        const downloadUrl = isInternalStream
            ? `${url}${url.includes('?') ? '&' : '?'}download=true`
            : url;

        if (isInternalStream) {
            // For internal streams, window.location.href is safe because the 
            // backend now sends Content-Disposition: attachment, 
            // which prevents page navigation.
            window.location.href = downloadUrl;
        } else {
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', filename);
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        return { success: false, error };
    }
};
