import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../componenets/header";
import ProductCard from "../componenets/productCard";
import CategoryFilter from "../componenets/CategoryFilter";
import Pagination from "../componenets/Pagination";
import { 
    selectProducts, 
    selectProductsLoading, 
    selectCurrentPage, 
    selectTotalPages, 
    selectProductsTotal,
    selectItemsPerPage,
    setCurrentPage,
    resetPage
} from "../store/slices/productsSlice";
import { selectSelectedCategory } from "../store/slices/categorySlice";
import { fetchProducts } from "../store/thunks/productsThunk";
import { layoutStyles } from "../utils/styles";

const Landing = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const loading = useSelector(selectProductsLoading);
    const currentPage = useSelector(selectCurrentPage);
    const totalPages = useSelector(selectTotalPages);
    const total = useSelector(selectProductsTotal);
    const itemsPerPage = useSelector(selectItemsPerPage);
    const selectedCategory = useSelector(selectSelectedCategory);

    useEffect(() => {
        dispatch(resetPage());
    }, [selectedCategory, dispatch]);

    useEffect(() => {
        dispatch(fetchProducts({ category: selectedCategory, page: currentPage, itemsPerPage }));
    }, [selectedCategory, currentPage, itemsPerPage, dispatch]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            dispatch(setCurrentPage(newPage));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const contentStyle = {
        flex: 1,
        padding: "20px",
        paddingBottom: "40px",
        maxWidth: "calc(100vw - 220px)"
    };

    return (
        <div>
            <Header />
            <div style={{ display: "flex", ...layoutStyles.container }}>
                <CategoryFilter />
                <div style={contentStyle}>
                    {loading ? (
                        <div style={{ textAlign: "center", padding: "40px" }}>
                            Loading products...
                        </div>
                    ) : (
                        <>
                            <div style={{ ...layoutStyles.grid, padding: "0 10px" }}>
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <ProductCard key={product.id} data={product} />
                                    ))
                                ) : (
                                    <div style={{ textAlign: "center", padding: "40px", width: "100%" }}>
                                        <div>No products found</div>
                                    </div>
                                )}
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                total={total}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Landing;

