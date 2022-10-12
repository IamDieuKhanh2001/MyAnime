import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProductSideBarItem from '../ProductSideBarItem';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function ViewTabPanel() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <AppBar position="static" sx={{ bgcolor: '#0B0C2A' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Day" {...a11yProps(0)} />
                    <Tab label="Week" {...a11yProps(1)} />
                    <Tab label="Month" {...a11yProps(2)} />
                    <Tab label="Year" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0}>
                    <ProductSideBarItem />
                    <ProductSideBarItem />
                    <ProductSideBarItem />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <ProductSideBarItem />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <ProductSideBarItem />
                    <ProductSideBarItem />
                    <ProductSideBarItem />
                    <ProductSideBarItem />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <ProductSideBarItem />
                    <ProductSideBarItem />
                    <ProductSideBarItem />
                    <ProductSideBarItem />
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}
