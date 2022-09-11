import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignUpPage from './pages/signUp';
import AuthRoute from './components/autocomplete';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CreateSystem from './components/createSystem';
import Systems from './components/systems';
import SingleSystem from './components/system';
import { Wrapper } from '@googlemaps/react-wrapper';
import Marker from './components/marker';
import MapContainer from './components/map';
import NewMarker from './components/newMarker';
import EditSystemDetails from './pages/editSystemDetails';
import { useObserver } from 'mobx-react-lite';
import Locations from './components/locations';
import EditLocationDetails from './components/editLocationDetails';
import Request from './components/request';
import Requests from './components/requests';
import Begin from './components/begin';
import NavBar from './components/navBar';

 export default function App() {

    return useObserver(() =>(
        <BrowserRouter>
        <NavBar></NavBar>
            <Routes>
                {/* <Route path="/" element={<LoginPage/>}/> */}
                <Route path="/" element={<Begin/>}/>
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/HomePage/:uid" element={<HomePage />} />
                <Route path="/SignUp" element={<SignUpPage />} />
                <Route path="/CreateSystem/:userId" element={<CreateSystem />} />
                <Route path="/Systems/:userId" element={<Systems />} />
                <Route path="/MySystem/:systemUrl" element={<SingleSystem />} />
                <Route path="/MapContainer" element={<MapContainer />} />
                <Route path="/NewMarker/:systemUrl" element={<NewMarker />} />
                <Route path="/EditSystemDetails/:systemUrl" element={<EditSystemDetails />} />
                <Route path="/Locations/:systemUrl" element={<Locations />} />
                <Route path="/EditLocationDetails/:locationId" element={<EditLocationDetails />} />
                <Route path="/Request" element={<Request />} />
                <Route path="/Requests/:systemId" element={<Requests />} />
            </Routes>
        </BrowserRouter>
    )
    );
};