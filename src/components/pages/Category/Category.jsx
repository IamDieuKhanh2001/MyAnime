import React from 'react'
import BreadcrumbOption from '../../global/BreadcrumbOption/BreadcrumbOption'
import Footer from '../../global/Footer/Footer'
import Header from '../../global/Header/Header'
import Product from '../../global/Product/Product'

export default function Category() {
  return (
    <div className='category'>
      <Header/>
      <BreadcrumbOption/>
      <Product/>
      <Footer/>
    </div>
  )
}
