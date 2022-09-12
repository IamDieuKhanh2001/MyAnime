import React from 'react'
import { Layout } from '../../global/Layout/Layout'
import NormalBreadcrumb from '../../global/NormalBreadcrumb/NormalBreadcrumb'

function History() {
    return (
        <Layout>
            <NormalBreadcrumb title={"Recent history"} 
            description={"Your recent watching series."} />
            
        </Layout>
    )
}

export default History
