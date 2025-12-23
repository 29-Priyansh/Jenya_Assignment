import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
    selectCategories, 
    selectSelectedCategory, 
    selectCategoriesLoading 
} from "../store/slices/categorySlice";
import { setSelectedCategory, clearSelectedCategory } from "../store/slices/categorySlice";
import { fetchCategories } from "../store/thunks/categoryThunk";
import CategoryItem from "./CategoryItem";
import { colors } from "../utils/styles";

const CategoryFilter = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const loading = useSelector(selectCategoriesLoading);
    const selectedCategory = useSelector(selectSelectedCategory);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const sidebarStyle = {
        width: "180px",
        background: colors.background,
        borderRight: `1px solid ${colors.border}`,
        padding: "12px",
        height: "calc(100vh - 80px)",
        position: "sticky",
        top: "80px",
        overflowY: "auto",
        boxShadow: "2px 0 4px rgba(0,0,0,0.05)"
    };

    return (
        <div style={sidebarStyle}>
            <h2 style={{
                margin: "0 0 12px 0",
                fontSize: "1rem",
                fontWeight: "600",
                color: colors.text
            }}>
                Categories
            </h2>
            {loading ? (
                <div style={{ padding: "12px", textAlign: "center", color: colors.textLight, fontSize: "0.85rem" }}>
                    Loading...
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <CategoryItem
                        category={null}
                        isSelected={selectedCategory === null}
                        onClick={() => dispatch(clearSelectedCategory())}
                    />
                    {categories.map((category, index) => (
                        <CategoryItem
                            key={index}
                            category={category}
                            isSelected={selectedCategory === category}
                            onClick={() => dispatch(setSelectedCategory(category))}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryFilter;

