import React, { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    CircularProgress,
} from "@mui/material";

import Navbar from './Navbar';
import MyMap from './MyMap';

const HomeView = () => {

    const url = "http://gtrac.in:8080/trackingdashboard/getListVehicles?token=53096";

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
    const [openDriverDetails, setOpenDriverDetails] = useState(false);
    const [openVehicleDetails, setOpenVehicleDetails] = useState(false);
    const [apiListData, setApiListData] = useState(null);
    const [progressBar, setProgressBar] = useState(false);

    const handleClickOpenDriverDetails = (data) => {
        setApiListData([data]);
        setOpenDriverDetails(true);
    };
    const handleClickOpenVehicleDetails = () => {
        setOpenVehicleDetails(true);
    };

    const handleClose = () => {
        setOpenDriverDetails(false);
        setOpenVehicleDetails(false);
    };

    useEffect(() => {
        setProgressBar(true);
        fetchData();
    }, []);

    return (<>
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

        <Box sx={{ width: "100%" }}>
            <TableContainer component={Paper} sx={{ height: "100vh" }}>
                <Table sx={{ minWidth: 700 }}
                    aria-label="customized table"
                    stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center"><strong>S.No.</strong></StyledTableCell>
                            <StyledTableCell align="center"><strong>Vehicle Id</strong></StyledTableCell>
                            <StyledTableCell align="center"><strong>Registration No.</strong></StyledTableCell>
                            <StyledTableCell align="center"><strong>Driver Details</strong></StyledTableCell>
                            <StyledTableCell align="center"><strong>Distance Travelled</strong></StyledTableCell>
                            <StyledTableCell align="center"><strong>Vehicle Details</strong></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.list.map((item, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center" component="th" scope="row"><strong>{index + 1}</strong></StyledTableCell>
                                <StyledTableCell align="center"><strong>{item.vId}</strong></StyledTableCell>
                                <StyledTableCell align="center"><strong>{item.vehReg}</strong></StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button variant="contained"
                                        onClick={() => handleClickOpenDriverDetails(item)}
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
                                <StyledTableCell align="center"><strong>{item.disInKM === "" ? "0 km" : item.disInKM + " km"}</strong></StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button variant="contained"
                                        onClick={() => handleClickOpenVehicleDetails(item.vehicleTrip)}
                                        sx={{
                                            textTransform: "none",
                                            backgroundColor: "#2e7d32",
                                            "&:hover": {
                                                backgroundColor: "#4caf50",
                                            }
                                        }}>
                                        <strong>Show Details</strong>
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDriverDetails} onClose={handleClose}>
                <DialogContent sx={{ minWidth: "400px" }}>
                    {apiListData?.map((item) => (
                        <Box>

                            <Typography>Driver Name : {item.drivers.driverName}</Typography>
                            <Typography mt={2}>Driver Contact No. : {item.drivers.phoneNumber}</Typography>
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="error" size="small">
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openVehicleDetails} onClose={handleClose}>
                <DialogContent sx={{ minWidth: '600px' }}>
                    {apiListData?.map((item) => (
                        <Box>
                            <MyMap data={item}
                                status={item.mode}
                                speed={item.speed} />
                                
                        </Box>
                    ))}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="error" size="small">
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    </>
    )
}

export default HomeView


