import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/thunks/authThunk";
import { selectAuthLoading, selectAuthError, selectIsAuthenticated } from "../store/slices/authSlice";
import { useEffect } from "react";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && password) {
            await dispatch(loginUser({ username, password }));
        }
    }
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f5f5",
            padding: "20px"
        }}>
            <div style={{
                background: "#fff",
                padding: "40px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                width: "100%",
                maxWidth: "400px"
            }}>
                <h1 style={{
                    margin: "0 0 30px 0",
                    fontSize: "2rem",
                    fontWeight: "600",
                    color: "#333",
                    textAlign: "center"
                }}>
                    Login
                </h1>
                {error && (
                    <div style={{
                        padding: "12px",
                        background: "#fee",
                        color: "#c33",
                        borderRadius: "6px",
                        marginBottom: "20px",
                        fontSize: "0.9rem"
                    }}>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "20px" }}>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                            style={{
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #e0e0e0",
                                borderRadius: "6px",
                                fontSize: "1rem",
                                boxSizing: "border-box"
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            style={{
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #e0e0e0",
                                borderRadius: "6px",
                                fontSize: "1rem",
                                boxSizing: "border-box"
                            }}
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={loading || !username || !password}
                        style={{
                            width: "100%",
                            padding: "12px",
                            background: loading || !username || !password ? "#ccc" : "#1875f2",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "1rem",
                            fontWeight: "600",
                            cursor: loading || !username || !password ? "not-allowed" : "pointer",
                            transition: "background 0.2s"
                        }}
                        onMouseEnter={(e) => {
                            if (!loading && username && password) {
                                e.target.style.background = "#1565c0";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading && username && password) {
                                e.target.style.background = "#1875f2";
                            }
                        }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;