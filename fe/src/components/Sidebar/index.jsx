import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";

import { useEffect, useState } from "react";

import logo from "../../assets/logo_dark.png";

import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = ({
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const theme = useTheme();

  const { isUserAdm } = useAuth();

  const navItems = isUserAdm
    ? [
        {
          text: "Home",
          navText: "home",
          icon: <HomeOutlined />,
        },
        {
          text: "Management",
          icon: null,
        },
        {
          text: "Admin",
          icon: <AdminPanelSettingsOutlined />,
        },
        {
          text: "Performance",
          icon: <TrendingUpOutlined />,
        },
        {
          text: "MENU SONDA",
          icon: null,
        },
        {
          text: "Sonda",
          navText: "rig",
          icon: <ShoppingCartOutlined />,
        },
        {
          text: "Customers",
          icon: <Groups2Outlined />,
        },
        {
          text: "Sub Menu 2",
          icon: null,
        },
        {
          text: "Overview",
          icon: <PointOfSaleOutlined />,
        },
        {
          text: "Daily",
          icon: <TodayOutlined />,
        },
      ]
    : [
        {
          text: "Home",
          navText: "home",
          icon: <HomeOutlined />,
        },
        {
          text: "MENU SONDA",
          icon: null,
        },
        {
          text: "Sonda",
          navText: "rig",

          icon: <ShoppingCartOutlined />,
        },
        {
          text: "Customers",
          icon: <Groups2Outlined />,
        },
        {
          text: "Sub Menu 2",
          icon: null,
        },
        {
          text: "Overview",
          icon: <PointOfSaleOutlined />,
        },
        {
          text: "Daily",
          icon: <TodayOutlined />,
        },
      ];

  const handleToggleMenuItem = (lowerCaseText) => {
    navigate(`/user/${lowerCaseText}`);
    setActive(lowerCaseText);
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.primary[500],
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <img src={logo} alt="CONTERP" width="100%" height="50%" />
                </Box>

                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <ChevronLeft />
                </IconButton>
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, navText }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => handleToggleMenuItem(navText)}
                      sx={{
                        backgroundColor:
                          active === navText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === navText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === navText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === navText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
