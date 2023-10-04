import DashBoardTemplate from "../containers/dashboard_template";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  FormControl,
  MenuItem,
  InputLabel,
  Autocomplete,
  IconButton,
} from "@mui/material";
import { useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import axios from 'axios';
import * as React from "react";
import {
  selectedStyle,
  unselectedStyle,
  modalHeaderStyle,
  modalStyle,
  ButtonStyle1,
  ButtonStyle2,
  StyledTableCell,
  StyledTableRow,
} from "./userstyles";

// const events = [
//   {
//     title: "Meeting",
//     date: "05/20/2023",
//     start: "7:00",
//     end: "10:00",
//     venue: "Coworking Space",
//     reference: "12",
//     computers: "2",
//   },
//   {
//     title: "Meeting",
//     date: "05/20/2023",
//     start: "8:00",
//     end: "11:00",
//     venue: "Conference A",
//     reference: "12",
//     computers: "2",
//   },
// ];
  const maxComputers = 10;
export default function UserMyReservations(props) {
  const [bookingsRefresher, setBookingsRefresher] = useState(true);
  const [fakeUserDb, setFakeUserDb] = useState([]);
  const [eventData,setEventData]=useState([]);
  const [refresh, setRefresh] = useState(true);
  const [attendeeName, setAttendeeName] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [viewDetails, setViewDetails] = useState({});
  const found = (element) => element.name === attendeeName;
  const deleteUser = (index) => {
    setAttendeeList([
      ...attendeeList.slice(0, index),
      ...attendeeList.slice(index + 1),
    ]);
  };

  const [user, setUser] = useState({
    id: 1,
    username: "joe",
  });

  const handleView = (title) => {
    setViewModal(true);
    let a = events.find((item) => {
      return item.title === title;
    });
    setViewDetails(a);
    console.log(a);
  };

  const handleEdit = (title) => {
    setEditModal(true);
    let b = events.find((item) => {
      return item.title === title;
    });
    setViewDetails(b);
    console.log(b);
  };
    //init page
    React.useEffect(() => {
      axios.get("http://127.0.0.1:8000/api/users/").then((res) => {
        setFakeUserDb(res?.data);
      });
    }, []);

  //display bookings
  const [events, setEvents] = useState([]);
  React.useEffect(() => {
    axios
      .get("http://localhost:8000/api/currentBookings/")
      .then((res) => {
        setEventData(res.data)
        setEvents(
          res?.data.map((item) => {
            return {
              id: item?.id,
              title: item?.description,
              start: item?.date + "T" + item?.startTime,
              end: item?.date + "T" + item?.endTime,
              venue: item?.venue,
            };
          })
        );
      })
      ;
  }, [bookingsRefresher]);

  // const fakeUserDb = [
  //   { name: "127-2242-290", id: 2 },
  //   { name: "225-5224-280", id: 3 },
  //   { name: "Celine", id: 4 },
  // ];

  const [statusSelected, setStatusSelected] = useState("Upcoming");
  const [attendeeList, setAttendeeList] = useState([
    { name: "127-2242-290", id: 2 },
    { name: "225-5224-280", id: 3 },
    { name: "Celine", id: 4 },
  ]);

  const booking = useRef({
    purpose: "",
    title: "",
    description: "",
    startTime: "",
    venue: "",
    endTime: "",
    date: "",
    computers: 0,
    participants: 0,
    coins: 0,
    points: 0,
    user: 0,
  });

  return (
    <div>
      <DashBoardTemplate title="My Reservations">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        ></div>
        <br></br>
        <Box
          backgroundColor="white"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Box
            sx={{
              p: "0px 0px 0px 0px",
            }}
            maxWidth="90%"
          >
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <ButtonGroup>
                <Button
                  sx={
                    statusSelected === "Upcoming"
                      ? selectedStyle
                      : unselectedStyle
                  }
                  onClick={() => setStatusSelected("Upcoming")}
                >
                  Upcoming
                </Button>
                <Button
                  sx={
                    statusSelected === "History"
                      ? selectedStyle
                      : unselectedStyle
                  }
                  onClick={() => setStatusSelected("History")}
                >
                  History
                </Button>
              </ButtonGroup>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Title</StyledTableCell>
                    <StyledTableCell align="left">Date</StyledTableCell>
                    <StyledTableCell align="left">Start</StyledTableCell>
                    <StyledTableCell align="left">End</StyledTableCell>
                    <StyledTableCell align="left">Venue</StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((event) => (
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        {event.title}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {event.date}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {event.start}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {event.end}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {event.venue}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button
                          sx={ButtonStyle1}
                          onClick={() => {
                            handleView(event.title);
                          }}
                        >
                          View
                        </Button>
                      </StyledTableCell>

                      {statusSelected === "Upcoming" ? (
                        <StyledTableCell align="right">
                          <Button
                            sx={ButtonStyle2}
                            onClick={() => {
                              handleEdit(event.title);
                            }}
                          >
                            Edit
                          </Button>
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell align="right">
                          <Button sx={ButtonStyle2}>Review</Button>
                        </StyledTableCell>
                      )}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </DashBoardTemplate>

      <Modal
        disableAutoFocus={true}
        open={viewModal}
        onClose={() => setViewModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ width: "100%", overflow: "auto" }}
      >
        <Box sx={modalStyle}>
          <Box sx={modalHeaderStyle}>
            <Typography
              sx={{ fontWeight: "bold" }}
              id="modal-modal-title"
              variant="h5"
              component="h2"
              fontFamily="Oswald"
              color="white"
            >
              Booking Enrollment
            </Typography>
          </Box>

          <Box p={4}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                fontWeight="bold"
                marginBottom="5px"
                fontFamily="Roboto Slab"
              >
                Title:
              </Typography>
              <Typography
                fontWeight="bold"
                marginBottom="5px"
                fontFamily="Roboto Slab"
              >
                {viewDetails.title}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                fontWeight="bold"
                marginBottom="5px"
                fontFamily="Roboto Slab"
              >
                Reference No:
              </Typography>
              <Typography
                fontWeight="bold"
                marginBottom="5px"
                fontFamily="Roboto Slab"
              >
                {viewDetails.reference}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                fontWeight="bold"
                marginBottom="5px"
                fontFamily="Roboto Slab"
              >
                Computers:
              </Typography>
              <Typography
                fontWeight="bold"
                marginBottom="5px"
                fontFamily="Roboto Slab"
              >
                {viewDetails.computers}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                fontWeight="bold"
                marginBottom="5px"
                fontFamily="Roboto Slab"
              >
                Start Time:
              </Typography>
              <Typography
                fontWeight="bold"
                marginBottom="5px"
                fontFamily="Roboto Slab"
              >
                {viewDetails.start}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                fontWeight="bold"
                marginBottom="5px"
                fontFamily="Roboto Slab"
              >
                End Time:
              </Typography>
              <Typography
                fontWeight="bold"
                marginBottom="5px"
                fontFamily="Roboto Slab"
              >
                {viewDetails.end}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                fontWeight="bold"
                marginBottom="5px"
                fontFamily="Roboto Slab"
              >
                Venue:
              </Typography>
              <Typography
                fontWeight="bold"
                marginBottom="5px"
                fontFamily="Roboto Slab"
              >
                {viewDetails.venue}
              </Typography>
            </Box>

            <br></br>
            <Typography
              fontWeight="bold"
              marginTop="0px"
              fontFamily="Oswald"
              backgroundColor="black"
              sx={{ float: "left", transform: "rotate(-5deg)" }}
              p="5px 10px 5px 10px"
              color="white"
            >
              Attendees
            </Typography>
            <List
              className="userList"
              dense={true}
              style={{ maxHeight: "150px", width: "100%", overflow: "auto" }}
            >
              {attendeeList.map((item, i) => (
                <React.Fragment key={i}>
                  <ListItem m={0} key={i}>
                    <ListItemText
                      fontSize="12px"
                      primary={item.name}
                      // secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Typography
              sx={{ paddingLeft: 2, color: "darkred" }}
              fontFamily="Roboto"
            >
              Note: 30% of cost as cancellation fee
            </Typography>
          </Box>
          <Box
            sx={{
              margin: "10px 15px 15px 10px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={ButtonStyle1}
              variant="contained"
              onClick={() => {
                setCancelModal(true);
                setViewModal(false);
              }}
            >
              Cancel Booking
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Are you sure you want to cancel */}
      <Modal
        disableAutoFocus={true}
        open={cancelModal}
        onEn
        onClose={() => setCancelModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ width: "100%", overflow: "auto" }}
      >
        <Box sx={modalStyle}>
          <Box sx={modalHeaderStyle}>
            <Typography
              sx={{ fontWeight: "bold" }}
              id="modal-modal-title"
              variant="h5"
              component="h2"
              fontFamily="Oswald"
              color="white"
            >
              Are you sure you want to cancel?
            </Typography>
          </Box>
          <Box p={4}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                fontWeight="bold"
                marginBottom="5px"
                fontFamily="Roboto Slab"
              >
                Cost of Cancellation: 10
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained">Yes</Button>
              <Button
                variant="contained"
                onClick={() => {
                  setViewModal(true);
                  setCancelModal(false);
                }}
              >
                No
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/*EDIT Modal */}
      <Modal
        disableAutoFocus={true}
        open={editModal}
        onClose={() => setEditModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ width: "100%", overflow: "auto" }}
      >
        <Box sx={modalStyle}>
          <Box sx={modalHeaderStyle}>
            <Typography
              sx={{ fontWeight: "bold" }}
              id="modal-modal-title"
              variant="h5"
              component="h2"
              fontFamily="Oswald"
              color="white"
            >
              Edit Booking Details
            </Typography>
          </Box>
          <Box p={4}>
            <TextField
              name="description"
              onChange={(e) => props.handleChange(e)}
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Title"
              variant="standard"
              inputProps={{ maxLength: 50 }}
            />
            <FormControl variant="standard" sx={{ minWidth: "100%" }}>
              <InputLabel id="demo-simple-select-filled-label">
                Purpose
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Purpose"
                name="purpose"
              >
                {/* <MenuItem value="Purpose">
              <em>None</em>
             </MenuItem> */}
                <MenuItem value={"Studying"}>Studying</MenuItem>
                <MenuItem value={"Playing"}>Playing</MenuItem>
                <MenuItem value={"Meeting"}>Meeting</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>

            
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                name="computers"
                type="number"
                sx={{ width: "40%" }}
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: maxComputers,
                  },
                }}
                id="outlined-basic"
                label="Computers"
                variant="standard"
                autoFocus={false}
              />

            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
