export const normalizeText = (text: string): string => {
    if (!text) return "";
    return text
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
};

export const capitalizeText = (text: string): string => {
    if (!text) return "";
    return text
        .trim()
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};