import React from 'react'

 const Categories = () => {
  const [activeCategories, setActiveCategories] = React.useState(0);
  const categories =['Все', 'Ботинки', 'Полуботики', 'Кеды', 'Кроссовки', 'Люферы', 'Сланцы']
  return (
    <div className="categories">
    <ul>
      {categories.map((cat, index)=>
        <li key={cat} onClick={()=>setActiveCategories(index)}
            className={activeCategories === index ? 'active':''}>
              {cat}
        </li>)}
    </ul>
  </div>
  )
}
export default Categories;