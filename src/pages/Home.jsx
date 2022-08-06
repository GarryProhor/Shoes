import React from 'react'
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/ShoeBlock/Skeleton";
import ShoeBlock from "../components/ShoeBlock";

const Home = () => {
    const [shoes, setShoes] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeCategories, setActiveCategories] = React.useState(0);
    const [activeSort, setActiveSort] = React.useState({
        name: 'популярности',
        sortProperty: 'rating'
    });

    React.useEffect(()=>{
        setIsLoading(true) //для отображения скелетона при выборе катенгории

        const order = activeSort.sortProperty.includes('-') ? 'asc' : 'desc'//при наличии "-" выбираем тип сортировки
        const sortBy = activeSort.sortProperty.replace('-','')//удаляем "-" из запроса
        const cat = activeCategories > 0 ? `category=${activeCategories}` : ``//выбираеи категорию

        fetch(`https://62da700d9eedb699636e2d90.mockapi.io/shoes?${cat}&sortBy=${sortBy}&order=${order}`)
            .then(response => response.json())
            .then(shoe=>
            {
                setShoes(shoe);
                setIsLoading(false);
            })
    },[activeCategories, activeSort]);



    return (
        <>
            <div className="content__top">
                <Categories activeCategories={activeCategories} onClickCategories={(id)=>setActiveCategories(id)}/>
                <Sort activeSort={activeSort} onClickSort={(id)=>setActiveSort(id)}/>
            </div>
            <h2 className="content__title">Вся обувь</h2>
            <div className="content__items">
                {isLoading ? [...new Array(6)].map((_, index)=><Skeleton key={index}/>) :
                    shoes.map(shoe => <ShoeBlock key={shoe.id} {...shoe}/>)//вместо написания всех полей(спреад оператор)

                }
            </div>
        </>
    )
}

export default Home
