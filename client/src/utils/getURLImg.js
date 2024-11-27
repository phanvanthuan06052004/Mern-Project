const API_URL = import.meta.env.VITE_API_URL
function getURL(name) {
    return `${API_URL}/images/books/${name}`
}
export { getURL }