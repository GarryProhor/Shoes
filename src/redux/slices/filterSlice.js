import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    category: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action){
            state.category =  action.payload;
        },
        setSort(state, action){
            state.sort =  action.payload;
        },
        setCurrentPage(state, action){
            state.currentPage =  action.payload;
        },
    }
});

export const selectSort = state=>state.filter.sort;
export const selectSortProperty = (state)=>state.filter.sort.sortProperty;
export const selectCategory = (state)=>state.filter.category;
export const selectCurrentPage = (state)=>state.filter.currentPage;

export const  { setCategoryId, setSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;