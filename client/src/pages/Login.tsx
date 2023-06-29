import { useState, ChangeEvent, FormEvent } from 'react';
import '../styles/Auth.css';

const login = async (user: {email: string, password: string}) => {
  const resp = await fetch("/api/auth/login", {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(user)
  });

  if (resp.ok) {
    return resp.json();
  } else {
    console.log(resp)
    throw new Error('something went wrong');
  }
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
    
  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    login({
      email,
      password
    }).then(res => {
      // accept, store tokens, and reroute to appropriate page
      console.log(res)
      setLoading(false);
    })
    .catch(error => {
      console.log(error)
      setError(error.message)
      setLoading(false);
    });
  }

  return (
    <form className='auth-form login-form' onSubmit={handleSubmit}>
        <div>
            <h1>Log In</h1>
            <p>Please complete this form to log in to your account.</p>

            <div className="auth-field required">
              <label htmlFor="email"><b>Email</b></label>
              <br/>
              <input type="text" name="email" value={email || ""} required onChange={handleTextInputChange} />
            </div>

            <div className="auth-field required">
              <label htmlFor="password"><b>Password</b></label>
              <br/>
              <input type="password" name="password" value={password || ""} required onChange={handleTextInputChange} />
            </div>

            <div className='footer'>
              <button
                className="primary-btn"
                type="submit"
                disabled={loading || !email.length || !password.length}
              >
                {loading ? "Loading..." : "Log In"}
              </button>
            </div>
            {/* temp error position */}
            {error && <p>{error}</p>} 
            {/* no account? sign up */}
        </div>
    </form>
  );
}
