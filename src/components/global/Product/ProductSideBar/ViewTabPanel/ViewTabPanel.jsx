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
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    const [value, setValue] = React.useState(0);

    const topProductViewInDay = useSelector((state) => state.products.topViewInDay);
    const topProductViewInWeek = useSelector((state) => state.products.topViewInWeek);
    const topProductViewInMonth = useSelector((state) => state.products.topViewInMonth);
    const topProductViewInYear = useSelector((state) => state.products.topViewInYear);

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
                    <Tab label={t("home.side_bar.day")} {...a11yProps(0)} />
                    <Tab label={t("home.side_bar.week")} {...a11yProps(1)} />
                    <Tab label={t("home.side_bar.month")} {...a11yProps(2)} />
                    <Tab label={t("home.side_bar.year")} {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0}>
                    {topProductViewInDay?.map((productInday, index) => (
                        <ProductSideBarItem data={productInday} key={index} />
                    ))}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    {topProductViewInWeek?.map((productInWeek, index) => (
                        <ProductSideBarItem data={productInWeek} key={index} />
                    ))}
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    {topProductViewInMonth?.map((productInMonth, index) => (
                        <ProductSideBarItem data={productInMonth} key={index} />
                    ))}
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    {topProductViewInYear?.map((productInYear, index) => (
                        <ProductSideBarItem data={productInYear} key={index} />
                    ))}
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}
