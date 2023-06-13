import '../styles/Auth.css';

export default function Signup() {
  return (
    <form>
        <div>
            <h1>Sign Up</h1>
            <p>Please complete this form to create an account.</p>

            <label htmlFor="email"><b>Name</b></label>
            <input type="text" placeholder="Name" name="email" required />

            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Email" name="email" required />

            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Password" name="password" required />

            <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
            <input type="password" placeholder="Password" name="password-repeat" required/>

            <div>
            <button type="button">Cancel</button>
            <button type="submit">Sign Up</button>
            </div>
        </div>
    </form>
  );
}
