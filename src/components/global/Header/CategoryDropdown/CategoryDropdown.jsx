import React from 'react'
import { useSelector } from 'react-redux';
import CategoryItemDropdown from './CategoryItemDropdown/CategoryItemDropdown'

function CategoryDropdown() {

    const categoryList = useSelector((state) => state.categorySeries.list);

    return (
        <React.Fragment>
            <ul className="dropdown">
                {categoryList.map((category, index) => (
                    <CategoryItemDropdown data={category} key={index} />
                ))}
            </ul>
        </React.Fragment>
    )
}

export default CategoryDropdown
