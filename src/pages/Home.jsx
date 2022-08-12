import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/ShoeBlock/Skeleton";
import ShoeBlock from "../components/ShoeBlock";
import Pagination from "../components/Pagination";

import {SearchContext} from "../App";
import {
    selectCategory,
    selectCurrentPage,
    selectSortProperty,
    setCategoryId,
    setCurrentPage
} from "../redux/slices/filterSlice";

const Home = () => {
    const dispatch = useDispatch();
    const category = useSelector(selectCategory);
    const sort = useSelector(selectSortProperty);
    const currentPage = useSelector(selectCurrentPage)
    const {searchValue} = React.useContext(SearchContext)
    const [shoes, setShoes] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const onChangePages = (page) =>{
        dispatch(setCurrentPage(page));
    }

    React.useEffect(()=>{
        setIsLoading(true) //для отображения скелетона при выборе катенгории

        const order = sort.includes('-') ? 'asc' : 'desc'//при наличии "-" выбираем тип сортировки
        const sortBy = sort.replace('-','')//удаляем "-" из запроса
        const cat = category > 0 ? `category=${category}` : ``//выбираеи категорию
        const search = searchValue ? `&search=${searchValue}` : ``

        fetch(`https://62da700d9eedb699636e2d90.mockapi.io/shoes?page=${currentPage}&limit=4&${cat}&sortBy=${sortBy}&order=${order}${search}`)
            .then(response => response.json())
            .then(shoe=>
            {
                setShoes(shoe);
                setIsLoading(false);
            })
        window.scroll(0,0);
    },[category, sort, currentPage, searchValue]);


    const skeleton = [...new Array(6)].map((_, index)=><Skeleton key={index}/>)
    const shoeses = shoes.map(shoe => <ShoeBlock key={shoe.id} {...shoe}/>)//вместо написания всех полей(спреад оператор)
    return (
        <>
            <div className="content__top">
                <Categories value={category} onClickCategories={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Вся обувь</h2>
            <div className="content__items">
                {isLoading ? skeleton : shoeses}
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePages}/>
        </>
    )
}

export default Home
