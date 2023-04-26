import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';
import { address } from '../utils/route';

const Logout = () => {

    const { state, dispatch } = useContext(userContext);

    const navigate = useNavigate(); 

    useEffect(() => {
        fetch(`${address}/logout`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include'
        }).then((res) => {
            dispatch({ type: "USER", payload: false });
            localStorage.removeItem('user');
            navigate('/');
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        })
    });

    return (
        <h1>Logging out...</h1>
    )
}

export default Logout