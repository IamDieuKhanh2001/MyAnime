import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

function SourceErrorPlaceholder() {
    return (
        <React.Fragment>
            <div className='text-center col-12'>
                <img src="/img/404.png" alt={true} />
            </div>
            <Alert severity="warning">
                <AlertTitle><strong>Something when wrong ...</strong></AlertTitle>
                Can not find resources, Try change another server !!
            </Alert>
        </React.Fragment>
    )
}

export default SourceErrorPlaceholder
