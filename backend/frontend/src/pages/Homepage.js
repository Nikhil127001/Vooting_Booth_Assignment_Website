import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return(
        <div>
            <Link to={'/login'}> go to login</Link>
        </div>
    );
}

export default HomePage;