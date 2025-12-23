// Common styles used across components
export const colors = {
    primary: "#1875f2",
    primaryHover: "#1565c0",
    success: "#00834e",
    error: "#e74c3c",
    text: "#333",
    textLight: "#666",
    textLighter: "#999",
    border: "#e0e0e0",
    background: "#fff",
    backgroundLight: "#f5f5f5",
    backgroundLighter: "#fafafa",
};

export const buttonStyles = {
    primary: {
        padding: "12px 24px",
        background: colors.primary,
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "1rem",
        transition: "background 0.2s",
    },
    secondary: {
        padding: "12px 24px",
        background: "transparent",
        color: colors.primary,
        border: `2px solid ${colors.primary}`,
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "1rem",
        transition: "all 0.2s",
    },
    small: {
        padding: "8px 16px",
        background: colors.primary,
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "0.95rem",
    },
    disabled: {
        background: "#ccc",
        cursor: "not-allowed",
    },
};

export const cardStyles = {
    container: {
        border: `1px solid ${colors.border}`,
        borderRadius: "12px",
        padding: "18px",
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
        background: colors.background,
    },
};

export const layoutStyles = {
    container: {
        paddingTop: "80px",
        minHeight: "calc(100vh - 80px)",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "20px",
    },
};

