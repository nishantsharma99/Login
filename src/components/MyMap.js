import React, { useState } from "react";
import { Map, Marker, Draggable, Overlay } from "pigeon-maps";
import { Typography, Box, Card, CardContent } from "@mui/material";

export default function MyMap(props) {
  const [hue, setHue] = useState(0);
  const [a, setA] = useState(false);
  const color = `hsl(${hue % 360}deg 39% 70%)`;
  const [anchor, setAnchor] = useState([props.data.gpsDtl.latLngDtl.lat, props.data.gpsDtl.latLngDtl.lng]);
  

  const card = (
    <React.Fragment>
      <CardContent sx={{ pr: 2 }}>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          Vehicle Information
        </Typography>
        <Typography sx={{ fontWeight: 700, fontSize: 10 }} gutterBottom>Vehicle No.&nbsp;:&nbsp;
          <Box component="span" sx={{ fontWeight: 300, fontSize: 10 }} variant="subtitle2" gutterBottom>
            {props.data.vehReg}
          </Box>
        </Typography>
        <Typography sx={{ fontWeight: 700, fontSize: 10 }} gutterBottom>Status&nbsp;:&nbsp;
          <Box component="span" sx={{ fontWeight: 300, fontSize: 10 }} variant="subtitle2" gutterBottom>
            {props.data.gpsDtl.mode}
          </Box>
        </Typography>
        <Typography sx={{ fontWeight: 700, fontSize: 10 }} gutterBottom>Speed&nbsp;:&nbsp;
          <Box component="span" sx={{ fontWeight: 300, fontSize: 10 }} variant="subtitle2" gutterBottom>
            {props.data.gpsDtl.speed}
          </Box>
        </Typography>
        <Typography sx={{ fontWeight: 700, fontSize: 10 }} gutterBottom>Last Update&nbsp;:&nbsp;
          <Box component="span" sx={{ fontWeight: 300, fontSize: 10 }} variant="subtitle2" gutterBottom>
            {props.data.gpsDtl.latLngDtl.gpstime}
          </Box>
        </Typography>
        <Typography sx={{ fontWeight: 700, fontSize: 10 }} gutterBottom>Last Known Location&nbsp;:&nbsp;
          <Box component="span" sx={{ width: 265, wordBreak: 'break-word', fontWeight: 300, fontSize: 10 }} variant="subtitle2" gutterBottom>
            {props.data.gpsDtl.latLngDtl.addr}
          </Box>
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  console.log("mapData", props.data);
  return (
    <Box>
      <Map height={500} defaultCenter={[props.data.gpsDtl.latLngDtl.lat, props.data.gpsDtl.latLngDtl.lng]} defaultZoom={10}>
        <Marker
          width={50}
          anchor={[props.data.gpsDtl.latLngDtl.lat, props.data.gpsDtl.latLngDtl.lng]}
          color={color}
          onClick={() => {
            setA(!a);
            setHue(a?hue - 100:hue + 100);
          }}
        />

        {!a ? (
          <></>
        ) : (
          <Overlay anchor={[props.data.gpsDtl.latLngDtl.lat, props.data.gpsDtl.latLngDtl.lng]} offset={[150, 250]}>
            <Box sx={{ maxWidth: 300}}>
              {/*           
          <Draggable
            offset={[60, 87]}
            anchor={anchor}
            onDragEnd={setAnchor}> */}

              <Card variant="outlined">{card}</Card>


              {/* </Draggable> */}
            </Box></Overlay>

        )}


      </Map>

    </Box>


  );
}