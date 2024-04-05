import { Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

const PrivateRoute = (props) => {
    const { isAuthenticated } = useAuth0();
    const { Component } = props;
    const navigate = useNavigate();

    useEffect(() => {
        const login = localStorage.getItem("loggedIn");
        if (!isAuthenticated && !login) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    return isAuthenticated || localStorage.getItem("loggedIn") ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
