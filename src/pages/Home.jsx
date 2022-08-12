import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import Categories from "../components/Categories";
import Sort, {popup} from "../components/Sort";
import Skeleton from "../components/ShoeBlock/Skeleton";
import ShoeBlock from "../components/ShoeBlock";
import Pagination from "../components/Pagination";
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import {SearchContext} from "../App";
import {
    selectCategory,
    selectCurrentPage,
    selectSortProperty,
    setCategoryId,
    setCurrentPage,
    setFilters
} from "../redux/slices/filterSlice";
import axios from "axios";

const Home = () => {
    const dispatch = useDispatch();
    const category = useSelector(selectCategory);
    const sort = useSelector(selectSortProperty);
    const currentPage = useSelector(selectCurrentPage)
    const {searchValue} = React.useContext(SearchContext)
    const [shoes, setShoes] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const navigate = useNavigate();

    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const onChangePages = (page) =>{
        dispatch(setCurrentPage(page));
    }

    const fetchShoes = ()=>{
        setIsLoading(true) //для отображения скелетона при выборе катенгории

        const order = sort.includes('-') ? 'asc' : 'desc'//при наличии "-" выбираем тип сортировки
        const sortBy = sort.replace('-','')//удаляем "-" из запроса
        const cat = category > 0 ? `category=${category}` : ``//выбираеи категорию
        const search = searchValue ? `&search=${searchValue}` : ``

        axios.get(`https://62da700d9eedb699636e2d90.mockapi.io/shoes?page=${currentPage}&limit=4&${cat}&sortBy=${sortBy}&order=${order}${search}`)
            .then((response) =>{
                setShoes(response.data);
                setIsLoading(false);
            });

        window.scroll(0,0);
        };

    // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = popup.find((obj) => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort,
                }),
            );
            isSearch.current = true;
        }
    }, []);


    React.useEffect(() => {
        window.scrollTo(0, 0);
        if(!isSearch.current){
            fetchShoes();
        }
        isSearch.current=false;

    }, [category, sort, searchValue, currentPage])


    // Если изменили параметры и был первый рендер
    React.useEffect(()=>{
        if(isMounted.current){
            const queryString = qs.stringify({
                sort: sort,
                category,
                currentPage,
            });
            navigate(`?${queryString}`)
        }
        isMounted.current=true;
    }, [category, sort, currentPage]);



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
