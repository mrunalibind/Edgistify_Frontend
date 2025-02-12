import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {    
                localStorage.removeItem("token");
                setIsLoggedIn(false)
                // Redirect to home page
                navigate("/");    
            } catch (error) {
                console.error("Error logging out:", error);
            }
        };

        handleLogout();
    }, [navigate]);

    return null;  // No UI needed, it's handled by the effect
};

export default Logout;
