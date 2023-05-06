import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import { useTheme } from '@mui/material/styles';


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
            backgroundColor: '#cffafa',
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

    // Avoid a layout jump when reaching the last page with empty rows.

    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(10);

    function handleChangePage(event, newpage) {
        setpg(newpage);
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }
    const handleClickOpenDriverDetails = (data) => {
        setApiListData([data]);
        setOpenDriverDetails(true);
    };
    const handleClickOpenVehicleDetails = (data) => {
        setApiListData([data]);
        setOpenVehicleDetails(true);
    };

    const handleClose = () => {
        setOpenDriverDetails(false);
        setOpenVehicleDetails(false);
    };
    const openAllMaps = () => {

        window.open("http://localhost:3000/allMap", "_blank")
    };

    const getData = async () => {
        try {
            setProgressBar(true);
            await axios.get(url).then((res) => {
                setData(res.data);
                setProgressBar(false);
                setApiListData([res.data]);


            });
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        
    document.title = "Home";
        getData();

    }, []);

    console.log(data);
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
            <TableContainer component={Paper} >
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
                        {data?.list.slice(pg * rpg, pg * rpg + rpg).map((item, index) => (
                            <StyledTableRow key={Math.random().toString()}>
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
                                        onClick={() => handleClickOpenVehicleDetails(item)}
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
            <TablePagination
            sx={{ backgroundColor: "#d45050", color: "#fff" }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data?.list.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog open={openDriverDetails} onClose={handleClose}>
                <DialogContent sx={{ minWidth: "400px" }}>
                    {apiListData?.map((item) => (
                        <Box>

                            <Typography>Driver Name : {item?.drivers?.driverName}</Typography>
                            <Typography mt={2}>Driver Contact No. : {item?.drivers?.phoneNumber}</Typography>
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
                            <MyMap data={item} />
                        </Box>
                    ))}

                </DialogContent>
                <DialogActions>

                    <Button onClick={openAllMaps} variant="contained" color="success" size="small">
                        SHOW ALL
                    </Button>
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


