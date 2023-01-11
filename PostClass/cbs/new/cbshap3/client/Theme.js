import { createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    primary: {
      light: "#D8F1F6",
      main: '#cd4a04',
      dark: "#196170",
      contrastText: "#fff",
    },
    secondary: {
      //secondary is pink
      light: "#ff80ab",
      main: "#C54B7B",
      dark: "#a62859",
      contrastText: "#fff",
    },
    white: {
      main: "#FFFFFF",
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: "subtitle1",
          },
          style: {
            fontSize: 15,
          },
        },
        {
          props: {
            variant: "h2",
          },
          style: {
            fontSize: 60,
          },
        },
        {
          props: {
            variant: "h3",
          },
          style: {
            fontSize: 40,
            marginBottom: 10,
          },
        },
        {
          props: {
            variant: "link",
            
          },
          style: {
          color:"primary",
          fontSize: 40
          },
        },
        {
          props: {
            variant: "h11",
          },
          style: {
            fontSize: 40,
            marginBottom: 10,
          },
        },
      ],
    },
  },
});

export default theme;
