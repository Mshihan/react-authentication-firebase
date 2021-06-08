import classes from "./ProfileForm.module.css";
import { useRef, useContext } from "react";
import AuthContext from "./../../store/auth-context";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    // add validation

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAE9VRDagOX_8sIUNbfk4Lpioj-o6AbWnw",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
      }
    )
      .then((response) => {
        // Asumption always succeeds!
        history.replace("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <form className={classes.form} onSubmit={onFormSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
