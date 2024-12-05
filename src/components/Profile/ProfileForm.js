import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const passwordRef =useRef(null);
  const authCtx = useContext(AuthContext);

  const submitFormHandler  = async (event)=>{
    event.preventDefault();
    const enteredPass = passwordRef.current.value;

    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIRE_BASE_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
            idToken: authCtx.token,
            password:enteredPass,
            returnSecureToken: false, 
        }),
        headers: {
          'Content-Type':'application/json'
        }
      }
    )


  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
