import React from 'react'
import PaymentPackageModal from "../../../global/PaymentPackageModal/PaymentPackageModal"
import './PremiumPlaceholder.scss'


function PremiumPlaceholder({ enable }) {
    return (
        <div className='premium__overlay w-100 h-100 bg-dark'>
            <p className='text-white'>
                Get Premium and enjoy the Premium-exclusive video!
            </p>
            <PaymentPackageModal />
        </div>
    )
}

export default PremiumPlaceholder
