import React from 'react';

const Signup = () => (
    <div>
        <h1>Signup</h1>
        <form>
            <div>
                <label htmlFor='email'>Email</label>
                <input type='text' placeholder='Email' />
            </div>
            <div>
                <label htmlFor='first-name'>First name</label>
                <input type='text' placeholder='First name' />
            </div>
            <div>
                <label htmlFor='last-name'>Password</label>
                <input type='text' placeholder='Last name' />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='Password' />
            </div>
            <div>
                <label htmlFor='confirm-password'>Confirm password</label>
                <input type='password' placeholder='Confirm password' />
            </div>
            <div>
                <button type='submit'>Signup</button>
            </div>
        </form>
    </div>
);

export default Signup;