import React from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function HistoryItemDropdown({ data }) {
    const navigate = useNavigate();

    const totalSeconds = data.lastSecond;

    // 👇️ get number of full minutes
    const minutes = Math.floor(totalSeconds / 60);
    
    // 👇️ get remainder of seconds
    const seconds = totalSeconds % 60;
    
    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }

    return (
        <Card onClick={() => navigate(`/details/${data.series_id}`)} sx={{ display: 'flex', alignItems: 'center' }} key={data.id}>
            <CardMedia
                component="img"
                sx={{ width: 151, height: 110 }}
                image={data.image}
                alt="series img"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {data.seriesName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Last watched: Ep {data.episodeNumber} {padTo2Digits(minutes)}:{padTo2Digits(seconds)}
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
