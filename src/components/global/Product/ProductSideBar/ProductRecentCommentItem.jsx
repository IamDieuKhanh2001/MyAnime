import React from 'react'
import { useNavigate } from 'react-router-dom';

function ProductRecentCommentItem({ data }) {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/details/${data.id}`)}
            className="product__sidebar__comment__item"
        >
            <div className="product__sidebar__comment__item__pic">
                <img src={data.image} alt="true" style={{ width: "100px" }} />
            </div>
            <div className="product__sidebar__comment__item__text">
                <ul>
                    {data?.movieData?.categoryData?.map((c) => (
                        <li>{c.name}</li>
                    ))}
                </ul>
                <h5>
                    <a href={`/details/${data.id}`}>{data.name}</a>
                </h5>
                <span>
                    <i className="fa fa-eye" />
                    {data.totalViewOfSeries} Viewes
                </span>
            </div>
        </div>
    )
}

export default ProductRecentCommentItem