import React from "react";
import Customers from "./FirstPage/Feature";
import Desc from "./FirstPage/Desc";
import EmailForm from "./FirstPage/EmailForm";
import Map from "./FirstPage/Map";
import Faq from "./FirstPage/Faq";
import Form from "./FirstPage/Form";
import Contact from "./FirstPage/Contact";
import Title from "./FirstPage/Title";
import Carousel from "./FirstPage/Carousel";
import FirstContact from "./FirstPage/FirstContact";
import { Divider } from "@mui/material";
import CalendarOver from "./FirstPage/CalendarOver";
import WeekCalendar from "./FirstPage/WeekCalendar";
import { inject } from '@vercel/analytics';



<Divider sx={{ m: 0, p: 0 }} />;

inject();


export const Main = () => (
  <div>
    <Title />

    <div className="dfirstbutton">
      <FirstContact />
    </div>
    <EmailForm />
    <CalendarOver />
    {/* <WeekCalendar /> */}
    <div className="gray">

      {/* <Customers /> */}
      <Form />
    </div>

    {/* <Map /> */}
    {/* </div> */}
    {/* <Carousel /> */}


    <div className="gray">
      <Faq />
    </div>
    <Contact />
  </div>
);



