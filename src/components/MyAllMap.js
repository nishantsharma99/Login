// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-------------Using Pigeon Maps------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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






import { GoogleMap, MarkerClusterer, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box, Card, CardContent } from "@mui/material";
import {
    Grid,
    Button,
    CircularProgress
} from "@mui/material";
import Navbar from "./Navbar";


const styles = {
    key: {
      fontSize: "12px",
      fontWeight: 800,
      color: "#FD6A02",
    },
  
    values: {
      fontWeight: 500,
      color: "#303030",
    },
  };

function MyAllMap() {
    const containerStyle = {
        width: '200vh',
        height: '100vh'
    };

    const center = {
        lat: 21.1458,
        lng: 79.0882
    };

    const [data, setData] = useState(null);
    const [progressBar, setProgressBar] = useState(false);
    const [map, setMap] = useState(null)
    const [selectedMarker, setSelectedMarker] = useState(null)

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

  


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: ""
    })

    const onLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }

    const onUnmount = (map) => {
        setMap(null)
    }



    useEffect(() => {
        
    document.title = "Show all map";
        getData();

    }, []);

    

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
            {/* <Box sx={{width:'100vh', position:'relative', padding: '0', margin: '0'}}> */}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={3}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <MarkerClusterer>
                    {(clusterer) =>
                        <div>{
                            data?.list.map((item) => (
                                <Marker
                                    position={
                                        {
                                            lat: item.gpsDtl.latLngDtl.lat,
                                            lng: item.gpsDtl.latLngDtl.lng
                                        }

                                    }
                                    key={item.gpsDtl.latLngDtl.latlong}
                                    clusterer={clusterer}
                                    onClick={() => setSelectedMarker(item)}

                                />))
                        }
                        {selectedMarker && (
                    <InfoWindow
                      position={{
                        lat: selectedMarker.gpsDtl.latLngDtl.lat,
                        lng: selectedMarker.gpsDtl.latLngDtl.lng,
                      }}
                      onCloseClick={() => setSelectedMarker(null)}>
                    
                      <Box sx={{ width: "400px", color: "black" }}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography
                              sx={{ fontSize: "20px", fontWeight: 700 }}>
                              {selectedMarker.vehReg}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography sx={styles.key}>
                              Location :{" "}
                              <Box component="span" sx={styles.values}>
                                {selectedMarker.gpsDtl.latLngDtl.addr}
                              </Box>
                            </Typography>
                            <Typography sx={styles.key}>
                              Speed :{" "}
                              <Box component="span" sx={styles.values}>
                                {selectedMarker.gpsDtl.speed
                                  ? "0"
                                  : selectedMarker.gpsDtl.speed}{" "}
                                km/hr
                              </Box>
                            </Typography>
                            <Typography sx={styles.key}>
                              Date Time :{" "}
                              <Box component="span" sx={styles.values}>
                                {selectedMarker.gpsDtl.latLngDtl.gpstime}
                              </Box>
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sx={{ textAlign: "end", paddingTop: "10px" }}>
                            <Button sx={{ color: "#404040" }}>More Info</Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </InfoWindow>
                  )}</div>}
                </MarkerClusterer>
   
    
            </GoogleMap> 
            {/* </Box> */}
            </>
    )
}

export default React.memo(MyAllMap)