import {
    Avatar,
    Box,
    Button,
    Collapse,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer,
} from "@mui/material";
import i18next from "i18next";
import "./MobileNavBar.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../api/redux/slices/userSlice";
import { HistoryActions } from "../../../../api/redux/slices/HistoryWatchingSlice";

function MobileNavBar() {
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        left: false,
    });
    const [openCategoryCollapse, setOpenCategoryCollapse] =
        React.useState(false);
    const [openLanguageCollapse, setOpenLanguageCollapse] =
        React.useState(false);

    const categoryList = useSelector((state) => state.categorySeries.list);

    const login = window.sessionStorage.getItem("jwt");
    const username = window.sessionStorage.getItem("username");
    const avatar = window.sessionStorage.getItem("avatar");

    const dispatch = useDispatch();

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
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

    const handleLogout = () => {
        window.sessionStorage.clear();
        window.localStorage.clear();
        const logoutAction = userActions.resetUserInfo();
        dispatch(logoutAction);
        const clearUserHistory = HistoryActions.clearUserHistory();
        dispatch(clearUserHistory);
        navigate("/login");
    };

    const list = (anchor) => (
        <Box
            sx={{
                width: 250,
                height: 5000,
                backgroundColor: "#070720",
                color: "#fff",
            }}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List sx={{ mt: "1.5rem" }}>
                <ListItem
                    sx={{ ml: "3rem", mb: "1rem", cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    <img src="/img/logo.png" alt="logo" />
                </ListItem>
                <ListItem
                    onClick={() => {
                        navigate("/");
                    }}
                    disablePadding
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <i className="bx bx-home bx-sm text-white"></i>
                        </ListItemIcon>
                        <ListItemText primary={"Homepage"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={handleCategoryClick}>
                        <ListItemIcon>
                            <i className="bx bxs-category bx-sm text-white"></i>
                        </ListItemIcon>
                        <ListItemText primary={"Category"} />
                        {openCategoryCollapse ? (
                            <i className="bx bxs-chevron-up"></i>
                        ) : (
                            <i className="bx bxs-chevron-down"></i>
                        )}
                    </ListItemButton>
                </ListItem>
                <Collapse
                    in={openCategoryCollapse}
                    timeout="auto"
                    unmountOnExit
                >
                    {categoryList?.map((c) => (
                        <List
                            key={c.id}
                            component="div"
                            disablePadding
                            onClick={() => {
                                navigate(`/category/${c.id}`);
                            }}
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary={c.name} />
                            </ListItemButton>
                        </List>
                    ))}
                </Collapse>

                <ListItem
                    onClick={() => {
                        navigate("/blog");
                    }}
                    disablePadding
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <i className="bx bxl-blogger bx-sm text-white"></i>
                        </ListItemIcon>
                        <ListItemText primary={"Blog"} />
                    </ListItemButton>
                </ListItem>

                <ListItem
                    onClick={() => {
                        navigate("/history");
                    }}
                    disablePadding
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <i className="bx bx-history bx-sm text-white"></i>
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
                            <i className="bx bx-globe bx-sm text-white"></i>
                        </ListItemIcon>
                        <ListItemText primary={"Language"} />
                        {openLanguageCollapse ? (
                            <i className="bx bxs-chevron-up"></i>
                        ) : (
                            <i className="bx bxs-chevron-down"></i>
                        )}
                    </ListItemButton>
                </ListItem>
                <Collapse
                    in={openLanguageCollapse}
                    timeout="auto"
                    unmountOnExit
                >
                    {languages.map(({ code, name, country_code }) => (
                        <List
                            key={country_code}
                            component="div"
                            disablePadding
                            onClick={() => {
                                i18next.changeLanguage(code);
                            }}
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <i
                                        className={`flag-icon flag-icon-${country_code} mx-2`}
                                    ></i>
                                </ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItemButton>
                        </List>
                    ))}
                </Collapse>
                {login !== null ? (
                    <React.Fragment>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    navigate("/profile");
                                }}
                            >
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp" src={avatar} />
                                </ListItemIcon>
                                <ListItemText primary={username} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleLogout()}>
                                <ListItemIcon>
                                    <i className="bx bx-log-out bx-sm text-white"></i>
                                </ListItemIcon>
                                <ListItemText primary={"Log out"} />
                            </ListItemButton>
                        </ListItem>
                    </React.Fragment>
                ) : (
                    <ListItem
                        onClick={() => {
                            navigate("/login");
                        }}
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <i className="bx bx-log-in bx-sm text-white"></i>
                            </ListItemIcon>
                            <ListItemText primary={"Sign in"} />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </Box>
    );

    return (
        <div className="mobile__nav pt-2">
            <Button onClick={toggleDrawer("left", true)}>
                <i
                    style={{ color: "#e53637" }}
                    className="bx bx-menu bx-md"
                ></i>
            </Button>
            <SwipeableDrawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
            >
                {list("left")}
            </SwipeableDrawer>
        </div>
    );
}

export default MobileNavBar;
