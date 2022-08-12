import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    category: 0,
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
        }
    }
});

export const selectSort = state=>state.filter.sort;
export const selectSortProperty = (state)=>state.filter.sort.sortProperty;
export const selectCategory = (state)=>state.filter.category;

export const  { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;