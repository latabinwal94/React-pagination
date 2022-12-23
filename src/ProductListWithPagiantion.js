import React, { useEffect, useState } from 'react'

const ProductListWithPagiantion = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const fetchList = async() => {
      const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`)
      const data = await response.json()
      setProductData(data.products)
      setTotal(data.total / 10)
    }
    fetchList()
  }, [page])

  const handlePage = (selectedPage) => {
    setPage(selectedPage)
  }

  const handleClickbtn = (selectedPage) => {
    if(selectedPage > 0 || selectedPage <= (productData.length / 10)) {
      setPage(selectedPage)
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        {productData.length > 0 && productData.map((product) => {
          return (
            <div className="col" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
            </div>
          )
        })}
      </div>
      {total > 0 &&
        <div className='pagination'>
          <span className='btn' onClick={() => handleClickbtn(page-1)}>Prev</span>
          {[...Array(total)].map((_, i) => {
            return (
              <span
                key={i}
                className={`number ${page === i+1 ? 'active' : ''}`}
                onClick={() => handlePage(i+1)}
              >
                {i+1}
              </span>
            )
          })}
          <span className='btn' onClick={() => handleClickbtn(page+1)}>Next</span>
        </div>
      }
    </div>
  )
}

export default ProductListWithPagiantion
