import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity, clearCart } from "../store/slices/cartSlice";
import Header from "../componenets/header";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id, quantity: parseInt(newQuantity) }));
        }
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const handlePlaceOrder = () => {
        // In a real app, this would process the order
        alert("Order placed successfully! Thank you for your purchase.");
        dispatch(clearCart());
        navigate("/");
    };

    const getItemPrice = (item) => {
        if (item.discountPercentage) {
            return item.price - (item.price * item.discountPercentage / 100);
        }
        return item.price;
    };

    const getItemTotal = (item) => {
        return getItemPrice(item) * item.quantity;
    };

    if (cartItems.length === 0) {
        return (
            <div>
                <Header />
                <div style={{ 
                    paddingTop: "100px", 
                    minHeight: "calc(100vh - 80px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px"
                }}>
                    <div style={{
                        textAlign: "center",
                        padding: "40px",
                        background: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        maxWidth: "500px"
                    }}>
                        <svg 
                            width="80" 
                            height="80" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginBottom: "20px", opacity: 0.5 }}
                        >
                            <path 
                                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 17.9 19 19 19C20.1 19 21 18.1 21 17V13M9 19.5C9.8 19.5 10.5 20.2 10.5 21C10.5 21.8 9.8 22.5 9 22.5C8.2 22.5 7.5 21.8 7.5 21C7.5 20.2 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21C21.5 21.8 20.8 22.5 20 22.5C19.2 22.5 18.5 21.8 18.5 21C18.5 20.2 19.2 19.5 20 19.5Z" 
                                stroke="#333" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                        <h2 style={{ margin: "0 0 10px 0", fontSize: "1.5rem", color: "#333" }}>
                            Your cart is empty
                        </h2>
                        <p style={{ margin: "0 0 20px 0", color: "#666" }}>
                            Add some products to your cart to continue shopping.
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            style={{
                                padding: "12px 24px",
                                background: "#1875f2",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "1rem",
                                transition: "background 0.2s"
                            }}
                            onMouseEnter={(e) => e.target.style.background = "#1565c0"}
                            onMouseLeave={(e) => e.target.style.background = "#1875f2"}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div style={{ 
                paddingTop: "80px", 
                minHeight: "calc(100vh - 80px)",
                background: "#f5f5f5",
                padding: "40px 20px"
            }}>
                <div style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "1fr 400px",
                    gap: "30px"
                }}>
                    {/* Cart Items Section */}
                    <div>
                        <div style={{
                            background: "#fff",
                            borderRadius: "12px",
                            padding: "24px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            marginBottom: "20px"
                        }}>
                            <h2 style={{
                                margin: "0 0 24px 0",
                                fontSize: "1.5rem",
                                fontWeight: "600",
                                color: "#333"
                            }}>
                                Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                            </h2>
                            
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px"
                            }}>
                                {cartItems.map((item) => {
                                    const itemPrice = getItemPrice(item);
                                    const itemTotal = getItemTotal(item);
                                    const imageSrc = item.thumbnail || (Array.isArray(item.images) && item.images[0]) || "";

                                    return (
                                        <div 
                                            key={item.id}
                                            style={{
                                                display: "flex",
                                                gap: "20px",
                                                padding: "20px",
                                                border: "1px solid #e0e0e0",
                                                borderRadius: "12px",
                                                background: "#fafafa"
                                            }}
                                        >
                                            <img
                                                src={imageSrc}
                                                alt={item.title}
                                                style={{
                                                    width: "120px",
                                                    height: "120px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                    border: "1px solid #e0e0e0"
                                                }}
                                                onError={(e) => {
                                                    e.target.style.display = "none";
                                                }}
                                            />
                                            <div style={{
                                                flex: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "8px"
                                            }}>
                                                <h3 style={{
                                                    margin: 0,
                                                    fontSize: "1.1rem",
                                                    fontWeight: "600",
                                                    color: "#333"
                                                }}>
                                                    {item.title}
                                                </h3>
                                                {item.brand && (
                                                    <div style={{ color: "#666", fontSize: "0.9rem" }}>
                                                        Brand: {item.brand}
                                                    </div>
                                                )}
                                                <div style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                    marginTop: "auto"
                                                }}>
                                                    <div style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "8px",
                                                        border: "1px solid #e0e0e0",
                                                        borderRadius: "6px",
                                                        padding: "4px"
                                                    }}>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            style={{
                                                                width: "28px",
                                                                height: "28px",
                                                                border: "none",
                                                                background: "#f0f0f0",
                                                                borderRadius: "4px",
                                                                cursor: "pointer",
                                                                fontSize: "1.2rem",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                transition: "background 0.2s"
                                                            }}
                                                            onMouseEnter={(e) => e.target.style.background = "#e0e0e0"}
                                                            onMouseLeave={(e) => e.target.style.background = "#f0f0f0"}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                            min="1"
                                                            style={{
                                                                width: "50px",
                                                                textAlign: "center",
                                                                border: "none",
                                                                fontSize: "1rem",
                                                                fontWeight: "600"
                                                            }}
                                                        />
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            style={{
                                                                width: "28px",
                                                                height: "28px",
                                                                border: "none",
                                                                background: "#f0f0f0",
                                                                borderRadius: "4px",
                                                                cursor: "pointer",
                                                                fontSize: "1.2rem",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                transition: "background 0.2s"
                                                            }}
                                                            onMouseEnter={(e) => e.target.style.background = "#e0e0e0"}
                                                            onMouseLeave={(e) => e.target.style.background = "#f0f0f0"}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        style={{
                                                            padding: "6px 12px",
                                                            background: "transparent",
                                                            color: "#e74c3c",
                                                            border: "1px solid #e74c3c",
                                                            borderRadius: "6px",
                                                            cursor: "pointer",
                                                            fontSize: "0.9rem",
                                                            fontWeight: "500",
                                                            transition: "all 0.2s"
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.background = "#e74c3c";
                                                            e.target.style.color = "#fff";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.background = "transparent";
                                                            e.target.style.color = "#e74c3c";
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-end",
                                                justifyContent: "space-between",
                                                minWidth: "120px"
                                            }}>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-end",
                                                    gap: "4px"
                                                }}>
                                                    {item.discountPercentage ? (
                                                        <>
                                                            <span style={{
                                                                fontWeight: "700",
                                                                fontSize: "1.2rem",
                                                                color: "#1875f2"
                                                            }}>
                                                                ${itemTotal.toFixed(2)}
                                                            </span>
                                                            <span style={{
                                                                textDecoration: "line-through",
                                                                color: "#999",
                                                                fontSize: "0.85rem"
                                                            }}>
                                                                ${(item.price * item.quantity).toFixed(2)}
                                                            </span>
                                                            <span style={{
                                                                color: "#00834e",
                                                                fontSize: "0.85rem",
                                                                fontWeight: "600"
                                                            }}>
                                                                Save ${((item.price * item.discountPercentage / 100) * item.quantity).toFixed(2)}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span style={{
                                                            fontWeight: "700",
                                                            fontSize: "1.2rem",
                                                            color: "#333"
                                                        }}>
                                                            ${itemTotal.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                                <div style={{
                                                    color: "#999",
                                                    fontSize: "0.85rem"
                                                }}>
                                                    ${itemPrice.toFixed(2)} each
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        
                        <button
                            onClick={() => navigate("/")}
                            style={{
                                padding: "12px 24px",
                                background: "transparent",
                                color: "#1875f2",
                                border: "2px solid #1875f2",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "1rem",
                                transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = "#1875f2";
                                e.target.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = "transparent";
                                e.target.style.color = "#1875f2";
                            }}
                        >
                            ← Continue Shopping
                        </button>
                    </div>

                    {/* Order Summary Section */}
                    <div style={{
                        position: "sticky",
                        top: "100px",
                        height: "fit-content"
                    }}>
                        <div style={{
                            background: "#fff",
                            borderRadius: "12px",
                            padding: "24px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        }}>
                            <h2 style={{
                                margin: "0 0 20px 0",
                                fontSize: "1.3rem",
                                fontWeight: "600",
                                color: "#333"
                            }}>
                                Order Summary
                            </h2>
                            
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                                marginBottom: "20px",
                                paddingBottom: "20px",
                                borderBottom: "1px solid #e0e0e0"
                            }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: "0.95rem",
                                    color: "#666"
                                }}>
                                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: "0.95rem",
                                    color: "#666"
                                }}>
                                    <span>Shipping</span>
                                    <span style={{ color: "#00834e", fontWeight: "600" }}>Free</span>
                                </div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: "0.95rem",
                                    color: "#666"
                                }}>
                                    <span>Tax</span>
                                    <span>${(total * 0.1).toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "24px",
                                paddingTop: "20px",
                                borderTop: "2px solid #e0e0e0"
                            }}>
                                <span style={{
                                    fontSize: "1.2rem",
                                    fontWeight: "600",
                                    color: "#333"
                                }}>
                                    Total
                                </span>
                                <span style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "700",
                                    color: "#1875f2"
                                }}>
                                    ${(total + total * 0.1).toFixed(2)}
                                </span>
                            </div>
                            
                            <button
                                onClick={handlePlaceOrder}
                                style={{
                                    width: "100%",
                                    padding: "14px",
                                    background: "#1875f2",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    fontSize: "1.1rem",
                                    transition: "background 0.2s",
                                    marginBottom: "12px"
                                }}
                                onMouseEnter={(e) => e.target.style.background = "#1565c0"}
                                onMouseLeave={(e) => e.target.style.background = "#1875f2"}
                            >
                                Place Order
                            </button>
                            
                            <div style={{
                                fontSize: "0.85rem",
                                color: "#666",
                                textAlign: "center",
                                lineHeight: "1.5"
                            }}>
                                🔒 Secure checkout. Your payment information is safe and encrypted.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

