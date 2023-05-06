// Using Pigeon Maps------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Cluster from "pigeon-cluster";
// import { Map, Marker, Overlay } from "pigeon-maps";
// import { Typography, Box, Card, CardContent } from "@mui/material";
// import {
//     CircularProgress
// } from "@mui/material";
// import Navbar from "./Navbar";


// export default function MyAllMap(props) {
//     const [hue, setHue] = useState(0);
//     const [data, setData] = useState(null);
//     const [details, setDetails] = useState(null);
//     const [progressBar, setProgressBar] = useState(false);
//     const [vehicleData, setVehicleData] = useState(false);

//     const color = `hsl(${hue % 360}deg 39% 70%)`;
//     const url = "http://gtrac.in:8080/trackingdashboard/getListVehicles?token=53096";

//     const getData = async () => {
//         try {
//             setProgressBar(true);
//             await axios.get(url).then((res) => {
//                 setProgressBar(false);
//                 setData(res.data);

//             });
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     const card = (
//         <React.Fragment>
//             <CardContent sx={{ pr: 5 }}>
//                 <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
//                     Vehicle Information
//                 </Typography>
//                 <Typography sx={{ fontWeight: 700, fontSize: 10 }} gutterBottom>Vehicle No.&nbsp;:&nbsp;
//                     <Box component="span" sx={{ fontWeight: 300, fontSize: 10 }} variant="subtitle2" gutterBottom>
//                         {details?.vehReg}
//                     </Box>
//                 </Typography>
//                 <Typography sx={{ fontWeight: 700, fontSize: 10 }} gutterBottom>Status&nbsp;:&nbsp;
//                     <Box component="span" sx={{ fontWeight: 300, fontSize: 10 }} variant="subtitle2" gutterBottom>
//                         {details?.mode}
//                     </Box>
//                 </Typography>
//                 <Typography sx={{ fontWeight: 700, fontSize: 10 }} gutterBottom>Speed&nbsp;:&nbsp;
//                     <Box component="span" sx={{ fontWeight: 300, fontSize: 10 }} variant="subtitle2" gutterBottom>
//                         {details?.speed}
//                     </Box>
//                 </Typography>
//                 <Typography sx={{ fontWeight: 700, fontSize: 10 }} gutterBottom>Last Update&nbsp;:&nbsp;
//                     <Box component="span" sx={{ fontWeight: 300, fontSize: 10 }} variant="subtitle2" gutterBottom>
//                         {details?.gpsDtl.latLngDtl.gpstime}
//                     </Box>
//                 </Typography>
//                 <Typography sx={{ fontWeight: 700, fontSize: 10 }} gutterBottom>Last Known Location&nbsp;:&nbsp;
//                     <Box component="span" sx={{ width: 265, wordBreak: 'break-word', fontWeight: 300, fontSize: 10 }} variant="subtitle2" gutterBottom>
//                         {details?.gpsDtl.latLngDtl.addr}
//                     </Box>
//                 </Typography>
//             </CardContent>
//         </React.Fragment>
//     );

//     useEffect(() => {
//         getData();
//     }, []);

//     return (
//         <>
//             <Navbar />
//             {progressBar && (
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         margin: "50% 50%",
//                         backdropFilter: "blur(8px)"
//                     }}>
//                     <CircularProgress />
//                 </Box>
//             )}

//             <Map height={1000} defaultCenter={[21.1458, 79.0882]} defaultZoom={6}>
//                 <Cluster>
//                     {data?.list.map((item) => (
//                         <Marker
//                             width={50}
//                             anchor={[item.gpsDtl.latLngDtl.lat, item.gpsDtl.latLngDtl.lng]}
//                             color={color}
//                             key={[item.gpsDtl.latLngDtl.lat, item.gpsDtl.latLngDtl.lng].toString()}
//                             payload={1}
//                             onClick={() => {
//                                 setVehicleData(!vehicleData)
//                                 setHue(hue + 20)
//                                 setDetails(item)
//                             }}
//                         />



//                     ))}
//                 </Cluster>
//                 {!vehicleData ? (
//                     <></>
//                 ) : (
//                     <Overlay anchor={[details?.gpsDtl.latLngDtl.lat, details?.gpsDtl.latLngDtl.lng]} offset={[200, 250]}>
//                         <Box sx={{ maxWidth: 400 }}>
//                             <Card variant="outlined">{card}</Card>
//                         </Box>
//                     </Overlay>

//                 )}

//             </Map>
//         </>

//     );
// }





////////////////////////////////////





// Drawer Component----------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import Navbar from './Navbar';

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

// export default function MyAllMap() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" >

//         {/* <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: 'none' }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Mini variant drawer
//           </Typography>
//         </Toolbar> */}
//         <Navbar/>
//       </AppBar>

//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//             <ListItem key={text} disablePadding sx={{ display: 'block' }}>
//               <ListItemButton
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? 'initial' : 'center',
//                   px: 2.5,
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         <List>
//           {['All mail', 'Trash', 'Spam'].map((text, index) => (
//             <ListItem key={text} disablePadding sx={{ display: 'block' }}>
//               <ListItemButton
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? 'initial' : 'center',
//                   px: 2.5,
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />
//         <Typography paragraph>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//           tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
//           enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
//           imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
//           Convallis convallis tellus id interdum velit laoreet id donec ultrices.
//           Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
//           adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
//           nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
//           leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
//           feugiat vivamus at augue. At augue eget arcu dictum varius duis at
//           consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
//           sapien faucibus et molestie ac.
//         </Typography>
//         <Typography paragraph>
//           Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
//           eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
//           neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
//           tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
//           sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
//           tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
//           gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
//           et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
//           tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
//           eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
//           posuere sollicitudin aliquam ultrices sagittis orci a.
//         </Typography>
//       </Box>
//     </Box>
//   );
// }


import { GoogleMap, MarkerClusterer, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box, Card, CardContent } from "@mui/material";
import {
    CircularProgress
} from "@mui/material";
import Navbar from "./Navbar";



function MyAllMap() {
    const containerStyle = {
        width: '2000px',
        height: '1000px'
    };

    const center = {
        lat: 21.1458,
        lng: 79.0882
    };

    const [data, setData] = useState(null);
    const [details, setDetails] = useState(null);
    const [progressBar, setProgressBar] = useState(false);
    const [vehicleData, setVehicleData] = useState(false);

    const url = "http://gtrac.in:8080/trackingdashboard/getListVehicles?token=53096";

    const getData = async () => {
        try {
            setProgressBar(true);
            await axios.get(url).then((res) => {
                setProgressBar(false);
                setData(res.data);
                data?.list.map((item) => (
                    console.log(
                        {
                            lat: item.gpsDtl.latLngDtl.lat,
                            lng: item.gpsDtl.latLngDtl.lng
                        })))
                    

            });
        } catch (err) {
            console.log(err);
        }
    };

    const card = (
        <React.Fragment>
            <CardContent sx={{ pr: 5 }}>
                <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                    Vehicle Information
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: 10 }} gutterBottom>Vehicle No.&nbsp;:&nbsp;
                    <Box component="span" sx={{ fontWeight: 300, fontSize: 10 }} variant="subtitle2" gutterBottom>
                        {details?.vehReg}
                    </Box>
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: 10 }} gutterBottom>Status&nbsp;:&nbsp;
                    <Box component="span" sx={{ fontWeight: 300, fontSize: 10 }} variant="subtitle2" gutterBottom>
                        {details?.mode}
                    </Box>
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: 10 }} gutterBottom>Speed&nbsp;:&nbsp;
                    <Box component="span" sx={{ fontWeight: 300, fontSize: 10 }} variant="subtitle2" gutterBottom>
                        {details?.speed}
                    </Box>
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: 10 }} gutterBottom>Last Update&nbsp;:&nbsp;
                    <Box component="span" sx={{ fontWeight: 300, fontSize: 10 }} variant="subtitle2" gutterBottom>
                        {details?.gpsDtl.latLngDtl.gpstime}
                    </Box>
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: 10 }} gutterBottom>Last Known Location&nbsp;:&nbsp;
                    <Box component="span" sx={{ width: 265, wordBreak: 'break-word', fontWeight: 300, fontSize: 10 }} variant="subtitle2" gutterBottom>
                        {details?.gpsDtl.latLngDtl.addr}
                    </Box>
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    useEffect(() => {
        getData();
    }, []);



    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: ""
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        <>
            <Navbar />
            {
                (progressBar || isLoaded) && (
                    <Box
                        sx={{
                            position: "absolute",
                            margin: "50% 50%",
                            backdropFilter: "blur(8px)"
                        }}>
                        <CircularProgress />
                    </Box>
                )
            }

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={4}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {/* {data?.list.map((item) => (
                    <Marker

                        position={
                            {
                                lat: item.gpsDtl.latLngDtl.lat,
                                lng: item.gpsDtl.latLngDtl.lng
                            }
                        }

                        key={item.gpsDtl.latLngDtl.latlong}
                    />))} */}

                <MarkerClusterer>
                    {(clusterer) => 
                    <div>{
                        data?.list.map((item) => (<Marker

                            position={
                                {
                                    lat: item.gpsDtl.latLngDtl.lat,
                                    lng: item.gpsDtl.latLngDtl.lng
                                }
                                
                            }

                            key={item.gpsDtl.latLngDtl.latlong}

                            clusterer={clusterer}
                        />))

                    }</div>}
                </MarkerClusterer>

            </GoogleMap>
        </>

    )
}



//             <Map height={1000} defaultCenter={[21.1458, 79.0882]} defaultZoom={6}>
//                 <Cluster>
//                     {data?.list.map((item) => (
//                         <Marker
//                             width={50}
//                             anchor={[item.gpsDtl.latLngDtl.lat, item.gpsDtl.latLngDtl.lng]}
//                             color={color}
//                             key={[item.gpsDtl.latLngDtl.lat, item.gpsDtl.latLngDtl.lng].toString()}
//                             payload={1}
//                             onClick={() => {
//                                 setVehicleData(!vehicleData)
//                                 setHue(hue + 20)
//                                 setDetails(item)
//                             }}
//                         />



//                     ))}
//                 </Cluster>
//                 {!vehicleData ? (
//                     <></>
//                 ) : (
//                     <Overlay anchor={[details?.gpsDtl.latLngDtl.lat, details?.gpsDtl.latLngDtl.lng]} offset={[200, 250]}>
//                         <Box sx={{ maxWidth: 400 }}>
//                             <Card variant="outlined">{card}</Card>
//                         </Box>
//                     </Overlay>

//                 )}

//             </Map>
//         </>




export default React.memo(MyAllMap)