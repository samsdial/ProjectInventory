import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar, Typography, Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";

const drawerWidth = 240;

export interface INavLink {
  navItemText: string;
  to: string;
}

interface SideBarProps {
  items: INavLink[];
}

export const SideBar: React.FC<SideBarProps> = ({ items }) => {
  const theme = useTheme(); // Obtener el tema actual
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detectar pantallas pequeñas

  return (
    <>
      {!isMobile && ( // Mostrar el SideBar solo en pantallas grandes
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "linear-gradient(to top right, #1E3A8A, #6B21A8)",
              color: "#fff",
            },
          }}
        >
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: 2,
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img src="" alt="logo" style={{ height: "40px" }} />
              <Typography variant="h6" component="div">
                Inventory
              </Typography>
            </Box>
          </Toolbar>
          <Divider />
          <List>
            {items.map((item, index) => (
              <ListItem
                key={index}
                component={Link}
                to={item.to}
                sx={{
                  "&:hover": {
                    backgroundColor: "#5C6BC0",
                    color: "#ffffff",
                  },
                  color: "#C5CAE9",
                  borderRadius: 1,
                  width: "90%",
                  margin: "0 auto",
                }}
              >
                <ListItemText primary={item.navItemText} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
};
