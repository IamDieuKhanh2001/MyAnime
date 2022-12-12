import React from 'react'
import LoadingSkeletionItem from './LoadingSkeletionItem';
import "./LoadingSkeletonProductAnimation.scss";

function LoadingSkeletonProductAnimation({numberOfItem = 9}) {

    const loadingSkeletionItemList = []
    for (let i = 0; i < numberOfItem; i++) {
        loadingSkeletionItemList.push(<LoadingSkeletionItem />);
    }
    return (
        <div className='row'>
            {loadingSkeletionItemList}
        </div>
    )
}

export default LoadingSkeletonProductAnimation