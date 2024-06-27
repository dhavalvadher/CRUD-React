import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Facility from './Facility';

function AdminRoutes(props) {
    return (
        <div>
            <Routes>
                <Route exact path="/Facility" element={<Facility />} />
            </Routes>
        </div>
    );
}

export default AdminRoutes;
