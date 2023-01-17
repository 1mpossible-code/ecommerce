import React from 'react';

const Login = () => (
    <div>
        <h1>Login</h1>
        <form>
            <div>
                <input type='text' placeholder='Email' />
            </div>
            <div>
                <input type='password' placeholder='Password' />
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
        </form>
    </div>
);

export default Login;