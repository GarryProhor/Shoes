import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header';

import './scss/app.scss';
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import {setSearch} from './redux/slices/filterSlice'
import {useSelector, useDispatch} from "react-redux";

// import shoes from './assets/shoes.json';

export const SearchContext = React.createContext();

function App() {
    const searchValue = useSelector((state) => state.filter.searchValue);
    const dispatch = useDispatch();

    const setSearchValue = (str) =>{
        dispatch(setSearch(str))
        console.log(dispatch(setSearch(str)))
    }

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header />
                <div className="content">
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />}/>
                            <Route path="/cart" element={<Cart />}/>
                            <Route path="*" element={<NotFound />}/>
                        </Routes>
                    </div>
                </div>
            </SearchContext.Provider>

        </div>
    );
}

export default App;
