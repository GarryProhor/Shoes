import React from 'react'
import Categories from './components/Categories';
import Header from './components/Header';
import Sort from './components/Sort';
import ShoeBlock from './components/ShoeBlock';
import './scss/app.scss';
import Skeleton from './components/ShoeBlock/Skeleton';
// import shoes from './assets/shoes.json';

function App() {  
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
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
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
        </div>
      </div>
    </div>
  );
}

export default App;
