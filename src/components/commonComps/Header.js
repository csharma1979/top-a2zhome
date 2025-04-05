"use client";

import React, { useState, useMemo, lazy, Suspense } from "react";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Button,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import { useTheme, useMediaQuery } from "@mui/material";
import { navbarFeatures } from "../../Data/Navbar";
import { styled } from '@mui/material/styles';

const MobileDrawer = lazy(() => import('./MobileDrawer'));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const PhoneButton = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  backgroundColor: '#0d6aa3',
  padding: '8px 16px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '#115580',
  },
}));

const NavButton = React.memo(({ href, active, children, ...props }) => (
  <Button
    component={Link}
    href={href}
    color="inherit"
    className={`nav-button ${active ? "active" : ""}`}
    sx={{
      color: '#333',
      '&:hover': {
        color: '#0d6aa3',
      },
      '&.active': {
        color: '#0d6aa3',
        fontWeight: 'bold',
      },
    }}
    {...props}
  >
    {children}
  </Button>
));

const ServicesMenu = React.memo(({ anchorEl, open, onClose }) => (
  <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={onClose}
    sx={{ mt: 1 }}
    MenuListProps={{ 
      disablePadding: true,
      sx: { maxHeight: '80vh' }
    }}
  >
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={0.3} sx={{ width: 670 }}>
        {navbarFeatures.map((feature, index) => (
          <Grid item xs={3} key={feature.title}>
            <MenuItem
              component={Link}
              href={feature.link}
              onClick={onClose}
              className="service-navitem"
              sx={{
                "&:hover": { 
                  backgroundColor: "#f0f0f0",
                  
                },
                textDecoration: "none",
                padding: "8px 6px",
                gap: "5px",
              }}
            >
              {feature.icon} <Typography>{feature.title}</Typography>
            </MenuItem>
          </Grid>
        ))}
      </Grid>
    </Paper>
  </Menu>
));

const Header = () => {
  const [featuresAnchor, setFeaturesAnchor] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleFeaturesClick = (event) => {
    setFeaturesAnchor(event.currentTarget);
  };

  const handleFeaturesClose = () => {
    setFeaturesAnchor(null);
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const desktopNav = useMemo(() => (
    <Box className="nav-container" sx={{ ml: 4 }}>
      <NavButton href="/" active={pathname === "/"}>
        Home
      </NavButton>
      <Button
        color="inherit"
        onClick={handleFeaturesClick}
        endIcon={<KeyboardArrowDownIcon />}
        className="nav-button"
        sx={{ color: '#333' }}
      >
        Services
      </Button>
      <ServicesMenu
        anchorEl={featuresAnchor}
        open={Boolean(featuresAnchor)}
        onClose={handleFeaturesClose}
      />
      <NavButton href="/gallery" active={pathname === "/gallery"}>
        Gallery
      </NavButton>
      <NavButton href="/blog" active={pathname === "/blog"}>
        Blog
      </NavButton>
      <NavButton href="/contact" active={pathname === "/contact"}>
        Contact
      </NavButton>
    </Box>
  ), [pathname, featuresAnchor]);

  return (
    <StyledAppBar position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
          <Link href="/" style={{ 
            display: 'block', 
            width: '220px',     // Increased logo width
            height: '70px',     // Increased logo height
            position: 'relative',
            marginLeft: '-16px' // Remove gap from left
          }}>
            <Image
              src="/assets/white-logo.webp"
              alt="A2Zhome-solutions"
              fill
              priority
              style={{ objectFit: 'contain' }}
            />
          </Link>

          {!isMobile && desktopNav}

          {!isMobile && (
            <PhoneButton component="a" href="tel:+1-832-312-5501">
              Call now: +1- 832-312-5501
            </PhoneButton>
          )}

          {isMobile && (
            <IconButton
              edge="end"
              onClick={toggleDrawer}
              sx={{ color: '#0d6aa3' }}
            >
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {isMobile && (
        <Suspense fallback={null}>
          <MobileDrawer
            open={mobileOpen}
            onClose={toggleDrawer}
            features={navbarFeatures}
          />
        </Suspense>
      )}
    </StyledAppBar>
  );
};

export default React.memo(Header);
