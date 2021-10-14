import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GiRocketFlight } from 'react-icons/gi';
const Header = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 border p-3 shadow-sm">
                    <h4><span className="fs-2 text-secondary"><GiRocketFlight /></span> SpaceX </h4>
                </div>
            </div>
        </>
    );
};

export default Header;