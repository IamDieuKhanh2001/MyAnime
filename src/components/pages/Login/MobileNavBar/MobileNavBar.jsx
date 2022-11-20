import { Avatar, Box, Button, Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material';
import i18next from 'i18next';
import "./MobileNavBar.scss";
import React from 'react'
import { useNavigate } from 'react-router-dom';

function MobileNavBar() {
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        left: false,
    });
    const [openCategoryCollapse, setOpenCategoryCollapse] = React.useState(true);
    const [openLanguageCollapse, setOpenLanguageCollapse] = React.useState(true);

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const handleCategoryClick = () => {
        setOpenCategoryCollapse(!openCategoryCollapse);
    };
    const handleLanguageClick = () => {
        setOpenLanguageCollapse(!openLanguageCollapse);
    };
    const languages = [
        {
            code: "en",
            name: "English",
            country_code: "gb",
        },
        {
            code: "vn",
            name: "Việt Nam",
            country_code: "vn",
        },
        {
            code: "jp",
            name: "日本語",
            country_code: "jp",
        },
    ];

    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem onClick={() => { navigate("/") }} disablePadding>
                    <ListItemButton onClick={
                        toggleDrawer(anchor, false)}>
                        <ListItemIcon>
                            <i className='bx bx-home bx-sm'></i>
                        </ListItemIcon>
                        <ListItemText primary={"Home page"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={handleCategoryClick}>
                        <ListItemIcon>
                            <i className='bx bxs-category bx-sm' ></i>
                        </ListItemIcon>
                        <ListItemText primary={"Category"} />
                        {openCategoryCollapse ? <i className='bx bxs-chevron-up' ></i> : <i className='bx bxs-chevron-down'></i>}
                    </ListItemButton>
                </ListItem>
                <Collapse in={openCategoryCollapse} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Cate item 1" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItem onClick={() => { navigate("/blog") }} disablePadding>
                    <ListItemButton onClick={toggleDrawer(anchor, false)}>
                        <ListItemIcon>
                            <i className='bx bxl-blogger bx-sm'></i>
                        </ListItemIcon>
                        <ListItemText primary={"About"} />
                    </ListItemButton>
                </ListItem>

                <ListItem onClick={() => { navigate("/history") }} disablePadding>
                    <ListItemButton onClick={toggleDrawer(anchor, false)}>
                        <ListItemIcon>
                            <i className='bx bx-history bx-sm' ></i>
                        </ListItemIcon>
                        <ListItemText primary={"History"} />
                    </ListItemButton>
                </ListItem>

            </List>

            <Divider />

            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLanguageClick}>
                        <ListItemIcon>
                            <i className='bx bx-globe bx-sm'></i>
                        </ListItemIcon>
                        <ListItemText primary={"Language"} />
                        {openLanguageCollapse ? <i className='bx bxs-chevron-up' ></i> : <i className='bx bxs-chevron-down'></i>}
                    </ListItemButton>
                </ListItem>
                <Collapse in={openLanguageCollapse} timeout="auto" unmountOnExit>
                    {languages.map(
                        ({ code, name, country_code }) => (
                            <List
                                key={country_code}
                                component="div" disablePadding
                                onClick={() =>
                                    i18next.changeLanguage(
                                        code
                                    )
                                }>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <i
                                            className={`flag-icon flag-icon-${country_code} mx-2`}
                                        ></i>
                                    </ListItemIcon>
                                    <ListItemText primary={name} />
                                </ListItemButton>
                            </List>
                        )
                    )}

                </Collapse>

                <ListItem onClick={() => { navigate("/login") }} disablePadding>
                    <ListItemButton onClick={toggleDrawer(anchor, false)}>
                        <ListItemIcon>
                            <i className='bx bx-log-in bx-sm'></i>
                        </ListItemIcon>
                        <ListItemText primary={"Sign in"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={toggleDrawer(anchor, false)}>
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="/img/avatar/avatar.jpg" />
                        </ListItemIcon>
                        <ListItemText primary={"quachkhanh2"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={toggleDrawer(anchor, false)}>
                        <ListItemIcon>
                            <i className='bx bx-log-out bx-sm'></i>
                        </ListItemIcon>
                        <ListItemText primary={"Log out"} />
                    </ListItemButton>
                </ListItem>
            </List >
        </Box >
    );

    return (
        <div className='mobile__nav pt-2'>
            <Button onClick={toggleDrawer('left', true)}>
                <i style={{ color: '#e53637' }} className='bx bx-menu bx-md'></i>
            </Button>
            <SwipeableDrawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {list('left')}
            </SwipeableDrawer>
        </div>
    )
}

export default MobileNavBar