import React from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function HistoryItemDropdown({ data }) {
    return (
        <Card sx={{ display: 'flex' }} key={data.id}>
            <CardMedia
                component="img"
                sx={{ width: 151, height: 100 }}
                image={data.image}
                alt="series img"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {data.seriesName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Đã xem tới tập {data.episodeNumber} {data.lastSecond}s
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {data.createAt}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    )
}

export default HistoryItemDropdown
