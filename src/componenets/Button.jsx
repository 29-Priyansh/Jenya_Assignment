import { colors, buttonStyles } from "../utils/styles";

const Button = ({ 
    children, 
    onClick, 
    variant = "primary", 
    size = "medium",
    disabled = false,
    style = {},
    ...props 
}) => {
    const baseStyle = size === "small" ? buttonStyles.small : buttonStyles[variant];
    const finalStyle = {
        ...baseStyle,
        ...(disabled && buttonStyles.disabled),
        ...style,
    };

    const handleMouseEnter = (e) => {
        if (!disabled && variant === "primary") {
            e.target.style.background = colors.primaryHover;
        } else if (!disabled && variant === "secondary") {
            e.target.style.background = colors.primary;
            e.target.style.color = "#fff";
        }
    };

    const handleMouseLeave = (e) => {
        if (!disabled && variant === "primary") {
            e.target.style.background = colors.primary;
        } else if (!disabled && variant === "secondary") {
            e.target.style.background = "transparent";
            e.target.style.color = colors.primary;
        }
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={finalStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

