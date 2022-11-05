import React from 'react'
import PaymentPackageModal from "../../../global/PaymentPackageModal/PaymentPackageModal"
import './PremiumPlaceholder.scss'


function PremiumPlaceholder({ enable }) {
    return (
        <div className='premium__overlay bg-dark'>
            <p className='text-white'>
                Get Premium and enjoy the Premium-exclusive video!
            </p>
            <PaymentPackageModal />
        </div>
    )
}

export default PremiumPlaceholder
