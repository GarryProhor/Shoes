import React from 'react'

 const Categories = ({onClickCategories, value}) => {

  const categories =['Все', 'Ботинки', 'Полуботики', 'Кеды', 'Кроссовки', 'Люферы', 'Сланцы']
  return (
    <div className="categories">
    <ul>
      {categories.map((cat, index)=>
        <li key={cat} onClick={()=>onClickCategories(index)}
            className={value === index ? 'active':''}>
              {cat}
        </li>)}
    </ul>
  </div>
  )
}
export default Categories;