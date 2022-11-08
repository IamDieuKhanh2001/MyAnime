import React from 'react'

function RedeemHeader( {avatarUrl} ) {
    return (
        <div className='d-flex align-items-center py-3 col-12 col-sm-12'>
            <div className='position-relative d-block' style={{ width: '60px', height: '60px' }}>
                <img className='d-block w-100 h-100 rounded-circle position-absolute' style={{ top: 0, left: 0 }} 
                src={avatarUrl} alt="true" />
            </div>
            <div className='ml-4 w-0' style={{ flex: 1 }}>
                <div className='d-flex align-items-center w-100' style={{ fontWeight: '700' }}>
                    <span>Quach Dieu Khanh</span>
                </div>
                <p style={{ fontSize: '14px', lineHeight: '15px', fontWeight: '400', color: '#999', wordBreak: 'break-word' }} className='mt-1'>
                    Mua VIP để xem hàng nghìn bộ anime phiển phí
                </p>
            </div>
        </div>
    )
}

export default RedeemHeader