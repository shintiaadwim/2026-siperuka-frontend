export async function getBookingStatuses() {
    const baseUrl = import.meta.env.VITE_API_URL;
    if (!baseUrl) throw new Error('VITE_API_URL is not defined');
    const url = baseUrl.replace(/\/+$/, '') + '/booking/status';
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch booking statuses');
    return await response.json();
}
