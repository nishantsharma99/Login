import React, { useState } from "react"
import { Map, Marker, Draggable, Overlay } from "pigeon-maps"
import truck from "./truck.svg"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export function MyMap(props) {
  
  const [hue, setHue] = useState(0)
  const [msgDisplay, setMsgDisplay] = useState(false)
  const color = `hsl(${hue % 360}deg 39% 70%)`
  const [anchor, setAnchor] = useState([props.lat, props.lng]);

  return (
    <Map height={300} defaultCenter={[props.lat, props.lng]} defaultZoom={11}>
      <Marker
        width={50}
        anchor={[props.lat, props.lng]}
        color={color}
        onClick={() => {
          setMsgDisplay(!msgDisplay)
          setHue(hue + 20)
        }}
      />

      {!msgDisplay ?
        (<></>) :
        (<Overlay anchor={[props.lat, props.lng]} offset={[120, 79]}>
          <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
            <Button>Save</Button>
          </Box>
        </Overlay>)}

      <Draggable offset={[60, 87]} anchor={anchor} onDragEnd={setAnchor}>
        <img src={truck} width={100} height={95} alt="" />
      </Draggable>
    </Map>
  )
}