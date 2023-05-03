import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ReactBingmaps } from 'react-bingmaps';
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    CircularProgress,
} from "@mui/material";

import Navbar from './Navbar';
import { MyMap } from './MyMap';

const HomeView = () => {
    const fetchData = () => {
        return fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .then(() => setProgressBar(false));
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.info.dark,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.info.light,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));

    const [data, setData] = useState(null);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [drivers, setDrivers] = useState(null);
    const [progressBar, setProgressBar] = useState(false);
    const [vehicleData, setVehicleData] = useState(null);

    const handleClickOpen = (data) => {
        const temp = [data];
        setDrivers(temp);
        setOpen(true);
    };
    const handleClickOpen1 = (data) => {
        setVehicleData(data);
        setOpen1(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpen1(false);
    };

    const pushpinClicked = (e) => {
        //Set the infobox options with the metadata of the pushpin.


    }

    const url =
        "http://gtrac.in:8080/trackingdashboard/getListVehicles?token=53096";

    

    useEffect(() => {
        setProgressBar(true);
        fetchData();
    }, []);

  return ( <>
    <Navbar />
    {progressBar && (
        <Box
            sx={{
                position: "absolute",
                margin: "50% 50%",
                backdropFilter: "blur(8px)"
            }}>
            <CircularProgress />
        </Box>
    )}

    <Box sx={{ width: "100%", margin: "0px" }}>
        <TableContainer component={Paper} sx={{ height: "100vh" }}>
            <Table
                sx={{ minWidth: 700 }}
                aria-label="customized table"
                stickyHeader>
                <TableHead>
                    <TableRow>
                        <StyledTableCell><strong>Sr. No.</strong></StyledTableCell>
                        <StyledTableCell align="center"><strong>Vehicle Id</strong></StyledTableCell>
                        <StyledTableCell align="center">
                            <strong>Registration No.</strong>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <strong>ControllerMerge Id</strong>
                        </StyledTableCell>
                        <StyledTableCell align="center"><strong>Drivers</strong></StyledTableCell>
                        <StyledTableCell align="center"><strong>Distance</strong></StyledTableCell>
                        <StyledTableCell align="center"><strong>Vehicle State</strong></StyledTableCell>
                        <StyledTableCell align="center"><strong>Vehicle Trip</strong></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.list.map((item, index) => (
                        <StyledTableRow key={index + 1}>
                            <StyledTableCell component="th" scope="row">
                                <strong>{index + 1}</strong>
                            </StyledTableCell>
                            <StyledTableCell align="center"><strong>{item.vId}</strong></StyledTableCell>
                            <StyledTableCell align="center">
                                <strong>{item.vehReg}</strong>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <strong>{item.controllermergeId === ""
                                    ? "0"
                                    : item.controllermergeId}</strong>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    variant="contained"
                                    onClick={() => handleClickOpen(item)}
                                    sx={{
                                        textTransform: "none",
                                        backgroundColor: "#2e7d32",
                                        "&:hover": {
                                            backgroundColor: "#4caf50",
                                        },
                                    }}>
                                    <strong>Show Details</strong>
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <strong>{item.disInKM === "" ? "0 km" : item.disInKM + " km"}</strong>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <strong>{item.vehicleState}</strong>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    variant="contained"
                                    onClick={() => setOpen1(item.vehicleTrip)}
                                    sx={{
                                        textTransform: "none",
                                        backgroundColor: "#2e7d32",
                                        "&:hover": {
                                            backgroundColor: "#4caf50",
                                        },
                                    }}>
                                    <strong>Show Details</strong>
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>


            <DialogContent sx={{ minWidth: "400px" }}>
                {drivers?.map((details) => (
                    <Box>
                        <MyMap lat={details.gpsDtl.latLngDtl.lat} lng={details.gpsDtl.latLngDtl.lng} />
                        <Typography>Driver Name : {details.drivers.driverName}</Typography>
                        <Typography mt={2}>
                            Driver Contact No. : {details.drivers.phoneNumber}
                        </Typography>
                    </Box>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={open1} onClose={handleClose}>
            <DialogContent sx={{ minWidth: "400px" }}>
                <Box>

                    <Typography>
                        Current Status :{" "}
                        {vehicleData?.currentStatus === ""
                            ? "Unavailable"
                            : vehicleData?.currentStatus}
                    </Typography>
                    <Typography mt={2}>Source :</Typography>
                    <Typography mt={2}>Destination :</Typography>
                    <Typography mt={2}>Start Time :</Typography>
                    <Typography mt={2}>Total Time :</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </Box>
</>
  )
}

export default HomeView


