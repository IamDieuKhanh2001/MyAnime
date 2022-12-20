import React from 'react'
import LoadingSkeletionItem from './LoadingSkeletionItem';
import "./LoadingSkeletonProductAnimation.scss";

function LoadingSkeletonProductAnimation({numberOfItem = 9}) {

    return (
        <div className='row'>
            {Array(numberOfItem).fill(0).map((item, index) => <LoadingSkeletionItem key={index} />)}          
        </div>
    )
}

export default LoadingSkeletonProductAnimation