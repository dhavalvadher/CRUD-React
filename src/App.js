import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Route, Routes } from 'react-router-dom';
import Facility from './admin/container/Facility/Facility';
import { configstore } from './redux/store';

function App() {
    const { store, persistor } = configstore();

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routes>
                    <Route path="/facility" element={<Facility />} />
                    {/* Add more routes as needed */}
                </Routes>
            </PersistGate>
        </Provider>
    );
}

export default App;
