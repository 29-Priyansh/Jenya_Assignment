import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { getImageSrc, calculateDiscountedPrice, formatDiscount, formatPrice } from "../utils/helpers";
import { colors, cardStyles } from "../utils/styles";
import Button from "./Button";

const ProductCard = ({ data }) => {
    const dispatch = useDispatch();

    if (!data) return null;

    const handleAddToCart = () => dispatch(addToCart(data));
    const discountedPrice = calculateDiscountedPrice(data.price, data.discountPercentage);

    const cardStyle = {
        ...cardStyles.container,
        maxWidth: "260px",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    };

    return (
        <div style={cardStyle}>
            <img
                src={getImageSrc(data)}
                alt={data.title || "Product image"}
                style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    marginBottom: "10px",
                    borderRadius: "8px"
                }}
                onError={(e) => e.target.style.display = "none"}
            />
            <h3 style={{ margin: "8px 0 4px", fontSize: "1.1rem", textAlign: "center" }}>
                {data.title}
            </h3>
            {data.brand && (
                <div style={{ color: colors.textLight, fontSize: "0.92rem", marginBottom: "3px" }}>
                    {data.brand}
                </div>
            )}
            {data.category && (
                <div style={{ color: colors.textLighter, fontSize: "0.9rem", marginBottom: "6px" }}>
                    {data.category}
                </div>
            )}
            <p style={{
                color: "#444",
                fontSize: "0.97rem",
                minHeight: "40px",
                marginBottom: "11px",
                textAlign: "center"
            }}>
                {data.description}
            </p>
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "5px",
                flexWrap: "wrap",
                justifyContent: "center"
            }}>
                {discountedPrice ? (
                    <>
                        <span style={{ fontWeight: "700", fontSize: "1.15rem", color: colors.primary }}>
                            ${discountedPrice}
                        </span>
                        <span style={{ textDecoration: "line-through", color: colors.textLighter, fontSize: "0.9rem" }}>
                            ${formatPrice(data.price)}
                        </span>
                        {data.discountPercentage && (
                            <span style={{ color: colors.success, fontWeight: 600, fontSize: "0.98rem" }}>
                                -{formatDiscount(data.discountPercentage)}%
                            </span>
                        )}
                    </>
                ) : (
                    <span style={{ fontWeight: "700", fontSize: "1.15rem" }}>
                        ${formatPrice(data.price)}
                    </span>
                )}
            </div>
            <div style={{
                margin: "0 0 5px 0",
                fontSize: "0.9rem",
                color: colors.textLighter,
                display: "flex",
                alignItems: "center",
                gap: "12px"
            }}>
                {data.rating && <span>⭐ {data.rating.toFixed(1)}</span>}
                {typeof data.stock === "number" && <span>Stock: {data.stock}</span>}
            </div>
            {data.availabilityStatus && (
                <div style={{
                    fontSize: "0.85rem",
                    color: data.availabilityStatus === "In Stock" ? colors.success : colors.textLighter,
                    marginBottom: "8px",
                    fontWeight: "500"
                }}>
                    {data.availabilityStatus}
                </div>
            )}
            <Button
                onClick={handleAddToCart}
                style={{ marginTop: "auto", padding: "7px 0", width: "100%", fontSize: "0.98rem" }}
            >
                Add to Cart
            </Button>
        </div>
    );
};

export default ProductCard;
