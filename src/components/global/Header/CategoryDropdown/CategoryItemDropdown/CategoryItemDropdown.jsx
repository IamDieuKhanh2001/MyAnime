import React from 'react'
import { Navigate } from 'react-router-dom'

function CategoryItemDropdown({ data }) {

    return (
        <React.Fragment>
            <li>
                <a className="sub-menu" href={`/category/${data.id}`}>
                    {data.name}
                </a>
            </li>
        </React.Fragment>
    )
}

export default CategoryItemDropdown
