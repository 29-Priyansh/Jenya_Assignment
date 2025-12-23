import { colors } from "../utils/styles";

const CategoryItem = ({ category, isSelected, onClick }) => {
    const isAllProducts = category === null;
    const displayText = isAllProducts ? "All Products" : category.replace(/-/g, " ");

    const baseStyle = {
        padding: "8px 12px",
        background: isSelected ? colors.primary : "#f5f5f5",
        color: isSelected ? "#fff" : colors.text,
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all 0.2s",
        fontWeight: isSelected ? "600" : "400",
        border: isSelected ? "none" : `1px solid ${colors.border}`,
        fontSize: isAllProducts ? "0.9rem" : "0.85rem",
        textTransform: isAllProducts ? "none" : "capitalize",
    };

    const handleMouseEnter = (e) => {
        if (!isSelected) {
            e.target.style.background = "#e8e8e8";
        }
    };

    const handleMouseLeave = (e) => {
        if (!isSelected) {
            e.target.style.background = "#f5f5f5";
        }
    };

    return (
        <div
            onClick={onClick}
            style={baseStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {displayText}
        </div>
    );
};

export default CategoryItem;

