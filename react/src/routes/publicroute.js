import React from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

function PublicRoute({component:Component}){
    const[cookies]=useCookies(['user']);
    return(
        !cookies.auth_cookie ?<Component/> 
        :<Navigate to ={{pathname: '/'}}/>
    );
}
export default PublicRoute;
