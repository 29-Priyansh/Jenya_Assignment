import { getPageNumbers } from "../utils/helpers";
import { colors } from "../utils/styles";

const Pagination = ({ currentPage, totalPages, total, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = getPageNumbers(currentPage, totalPages);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "40px",
            padding: "20px"
        }}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                    padding: "8px 16px",
                    background: currentPage === 1 ? "#ccc" : colors.primary,
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    fontWeight: "600",
                    fontSize: "0.95rem"
                }}
            >
                Previous
            </button>
            
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                {pages.map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        style={{
                            padding: "8px 12px",
                            background: currentPage === pageNum ? colors.primary : "#fff",
                            color: currentPage === pageNum ? "#fff" : "#000",
                            border: `1px solid ${colors.border}`,
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: currentPage === pageNum ? "600" : "400",
                            fontSize: "0.95rem",
                            minWidth: "40px"
                        }}
                    >
                        {pageNum}
                    </button>
                ))}
            </div>
            
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                    padding: "8px 16px",
                    background: currentPage === totalPages ? "#ccc" : colors.primary,
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    fontWeight: "600",
                    fontSize: "0.95rem"
                }}
            >
                Next
            </button>
            
            <span style={{
                marginLeft: "15px",
                color: colors.textLight,
                fontSize: "0.9rem"
            }}>
                Page {currentPage} of {totalPages} ({total} products)
            </span>
        </div>
    );
};

export default Pagination;

