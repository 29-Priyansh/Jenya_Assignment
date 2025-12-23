// Helper functions for common calculations and formatting

export const getImageSrc = (data) => {
    if (data?.thumbnail) return data.thumbnail;
    if (Array.isArray(data?.images) && data.images.length > 0) return data.images[0];
    return "";
};

export const formatPrice = (price) => {
    return typeof price === "number" ? price.toFixed(2) : "0.00";
};

export const formatDiscount = (discount) => {
    return typeof discount === "number" ? discount.toFixed(1) : discount;
};

export const calculateDiscountedPrice = (price, discountPercentage) => {
    if (!price || !discountPercentage) return null;
    const discount = (price * discountPercentage) / 100;
    return (price - discount).toFixed(2);
};

export const getItemPrice = (item) => {
    if (item?.discountPercentage) {
        return item.price - (item.price * item.discountPercentage / 100);
    }
    return item.price || 0;
};

export const getItemTotal = (item) => {
    return getItemPrice(item) * (item.quantity || 1);
};

export const getPageNumbers = (currentPage, totalPages) => {
    const maxVisible = 5;
    const pages = [];
    
    if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
            pages.push(i);
        }
    } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
            pages.push(i);
        }
    }
    
    return pages;
};

