import * as React from "react";
// import dayjs from "dayjs";
// import TextField from "@mui/material/TextField";
// import * as BS from "react-bootstrap";
// import Box from "@mui/material/Box";
// import Badge from "@mui/material/Badge";
// import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// const isWeekend = (date) => {
//   const day = date.day();
//   return day === 0 || day === 6;
// };

// const Monthly = () => {
//   const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
//   const [value, setValue] = React.useState(dayjs(new Date()));

// console.log(highlightedDays)

//   return (
//     <BS.Container>
//       <Box
//         sx={{
//           pt: 13,
//           display: "flex",
//           justifyContent: "left",
//         }}
//       >
//         {/* <div>{value}</div> */}
//         <BS.Col lg={6} md={6} sm={6} xs={6}>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <StaticDatePicker
//               orientation="portrait"
//               openTo="day"
//               value={value}
//               // shouldDisableDate={isWeekend}
//               onChange={(newValue) => {
//                 setValue(newValue);
//               }}
//               renderInput={(params) => <TextField {...params} />}
//               renderDay={(day, _value, DayComponentProps) => {
//                 const isSelected =
//                   !DayComponentProps.outsideCurrentMonth &&
//                   highlightedDays.indexOf(day.date()) >= 0;

//                 return (
//                   <Badge
//                     key={day.toString()}
//                     overlap="circular"
//                     badgeContent={isSelected ? <EventAvailableIcon/> : undefined}
//                   >
//                     <PickersDay {...DayComponentProps} />
//                   </Badge>
//                 );
//               }}
//             />
//           </LocalizationProvider>

//           {/* <BS.Row></BS.Row> */}
//         </BS.Col>
//       </Box>
//     </BS.Container>
//   );
// };
// export default Monthly;

// import { Calendar } from '@fullcalendar/core';
// import interactionPlugin from '@fullcalendar/interaction';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
// import './main.css';

const tits = () => {
  return(
  <div>butt</div>
  )
}

export default tits;

// document.addEventListener('DOMContentLoaded', function() {
//   var calendarEl = document.getElementById('calendar');

  // var calendar = new Calendar(calendarEl, {
  //   plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin ],
  //   headerToolbar: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  //   },
  //   initialDate: '2018-01-12',
  //   navLinks: true, // can click day/week names to navigate views
  //   editable: true,
  //   dayMaxEvents: true, // allow "more" link when too many events
  //   events: [
  //     {
  //       title: 'All Day Event',
  //       start: '2018-01-01',
  //     },
  //     {
  //       title: 'Long Event',
  //       start: '2018-01-07',
  //       end: '2018-01-10'
  //     },
  //     {
  //       groupId: 999,
  //       title: 'Repeating Event',
  //       start: '2018-01-09T16:00:00'
  //     },
  //     {
  //       groupId: 999,
  //       title: 'Repeating Event',
  //       start: '2018-01-16T16:00:00'
  //     },
  //     {
  //       title: 'Conference',
  //       start: '2018-01-11',
  //       end: '2018-01-13'
  //     },
  //     {
  //       title: 'Meeting',
  //       start: '2018-01-12T10:30:00',
  //       end: '2018-01-12T12:30:00'
  //     },
  //     {
  //       title: 'Lunch',
  //       start: '2018-01-12T12:00:00'
  //     },
  //     {
  //       title: 'Meeting',
  //       start: '2018-01-12T14:30:00'
  //     },
  //     {
  //       title: 'Happy Hour',
  //       start: '2018-01-12T17:30:00'
  //     },
  //     {
  //       title: 'Dinner',
  //       start: '2018-01-12T20:00:00'
  //     },
  //     {
  //       title: 'Birthday Party',
  //       start: '2018-01-13T07:00:00'
  //     },
  //     {
  //       title: 'Click for Google',
  //       url: 'http://google.com/',
  //       start: '2018-01-28'
  //     }
  //   ]
  // });

//   calendar.render();
// });