
import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPass = emailRef.current.value;
    setIsLoading(true);

    let url;
    if(!isLogin){
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIRE_BASE_API_KEY}`
    }else{  
      url =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIRE_BASE_API_KEY}`
    }


    try {
      const res = await fetch(url,
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPass,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error.message);
      }

      console.log(data);


    } catch (error) {
      alert(error)
    }
    setIsLoading(false);


  }

  return (


    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
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
          {!isLoading &&
            <button
              type='sumbit'
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>}

          {
            isLoading && <p>Loading data ...</p>
          }

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
