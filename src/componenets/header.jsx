import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartCount } from "../store/slices/cartSlice";

const Header = () => {
    const cartCount = useSelector(selectCartCount);
    const navigate = useNavigate();

    return (
        <header style={{ 
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            background: "#f2f2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 2rem",
            zIndex: 1000,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
            <h1 style={{
                margin: 0,
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#333"
            }}>
                Product Store
            </h1>
            <div 
                onClick={() => navigate("/checkout")}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    position: "relative",
                    cursor: "pointer",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    transition: "background 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#e0e0e0"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
                <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 17.9 19 19 19C20.1 19 21 18.1 21 17V13M9 19.5C9.8 19.5 10.5 20.2 10.5 21C10.5 21.8 9.8 22.5 9 22.5C8.2 22.5 7.5 21.8 7.5 21C7.5 20.2 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21C21.5 21.8 20.8 22.5 20 22.5C19.2 22.5 18.5 21.8 18.5 21C18.5 20.2 19.2 19.5 20 19.5Z" 
                        stroke="#333" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
                {cartCount > 0 && (
                    <span style={{
                        position: "absolute",
                        top: "4px",
                        left: "28px",
                        background: "#1875f2",
                        color: "#fff",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        minWidth: "20px",
                        border: "2px solid #f2f2f2"
                    }}>
                        {cartCount > 99 ? '99+' : cartCount}
                    </span>
                )}
                <span style={{
                    fontSize: "0.9rem",
                    color: "#333",
                    fontWeight: "500"
                }}>
                    Cart
                </span>
            </div>
        </header>
    );
};

export default Header;
