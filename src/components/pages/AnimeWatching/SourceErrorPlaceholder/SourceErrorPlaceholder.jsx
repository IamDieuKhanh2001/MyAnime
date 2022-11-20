import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

function SourceErrorPlaceholder() {
    return (
        <React.Fragment>
            <div className='w-50'>
                <img src="/img/404.png" alt='true' />
                <Alert severity="warning">
                    <AlertTitle><strong>Something when wrong ...</strong></AlertTitle>
                    Can not find resources, Try change another server !!
                </Alert>
            </div>
        </React.Fragment>
    )
}

export default SourceErrorPlaceholder
