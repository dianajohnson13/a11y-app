import '../styles/Auth.css';

export default function Login() {
  return (
    <form className='auth-form login-form'>
        <div>
            <h1>Log In</h1>
            <p>Please complete this form to log in to your account.</p>

            <div className="auth-field required">
              <label htmlFor="email"><b>Email</b></label>
              <br/>
              <input type="text" name="email" required />
            </div>

            <div className="auth-field required">
              <label htmlFor="password"><b>Password</b></label>
              <br/>
              <input type="password" name="password" required />
            </div>

            <div className='footer'>
              <button className="primary-btn" type="submit">Log In</button>
            </div>
            {/* no account? sign up */}
        </div>
    </form>
  );
}
