import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../../store";
import Container from "@mui/material/Container";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="login">
      <Container sx={{ pt: 20, pb:10 }}>
        <br />
        <br />

        <form onSubmit={handleSubmit} name={name}>
          <div>
            <input
              placeholder="Username"
              className="input"
              name="username"
              type="text"
            />
          </div>
          <br/>
     
          <div>
            <input
              placeholder="Password"
              className="input"
              name="password"
              type="password"
            />
          </div>
          
          <br/>
          <br/>

          <div>
            <button type="submit">
              <span>{displayName}</span>
            </button>
          </div>
          <br/>

          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </Container>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.auth.error
//   }
// }

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
