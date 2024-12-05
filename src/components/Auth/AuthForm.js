
import { useState,useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitFormHandler =(event)=>{
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPass = emailRef.current.value;

    if(!isLogin){
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPRJELfaxLC3jK8kt-IKengIITf3hlHPM',
          {
            method:"POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPass,
              returnSecureToken : true,
            }),
            headers:{
              'Content-Type': 'application/json',
            }
          }
        ).then(res =>{
          if(res.ok){

          }else{
            return res.json().then(data =>{
              console.log(data);
            })
          }

        })
    }


  }

  return (
    

      <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form  onSubmit={submitFormHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required ref={emailRef}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input
              type='password'
              id='password'
              required
              ref={passwordRef}
            />
          </div>
          <div className={classes.actions}>
            <button 
                type='sumbit'
            >
              {isLogin? "Login" : "Sign Up"}
            </button>

          </div>
          <div className={classes.actions}>
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
    
  );
};

export default AuthForm;
