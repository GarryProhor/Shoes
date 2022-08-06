import React from 'react'
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/ShoeBlock/Skeleton";
import ShoeBlock from "../components/ShoeBlock";

const Home = () => {
    const [shoes, setShoes] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(()=>{
        fetch("https://62da700d9eedb699636e2d90.mockapi.io/shoes")
            .then(response => response.json())
            .then(shoe=>
            {
                setShoes(shoe);
                setIsLoading(false);
            })
    },[]);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Вся обувь</h2>
            <div className="content__items">
                {isLoading ? [...new Array(6)].map((_, index)=><Skeleton key={index}/>):
                    shoes.map(shoe => <ShoeBlock key={shoe.id} {...shoe}/>)
                }
            </div>
        </>
    )
}

export default Home
