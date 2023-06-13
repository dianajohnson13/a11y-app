import '../styles/Auth.css';

export default function Signup() {
  return (
    <form className='auth-form'>
        <div>
            <h1>Sign Up</h1>
            <p>Please complete this form to create an account.</p>

            <div className="auth-field required">
              <label htmlFor="email"><b>Name</b></label>
              <br/>
              <input type="text" name="email" required />
            </div>

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
              <button className="primary-btn" type="submit">Sign Up</button>
            </div>
        </div>
    </form>
  );
}
