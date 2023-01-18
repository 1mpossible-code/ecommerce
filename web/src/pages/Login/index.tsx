import React, {ChangeEvent, FormEvent, useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {useNavigate} from 'react-router-dom';

const SIGNIN = gql`
mutation Signin($email: String!, $password: String!) {
  signin(email: $email, password: $password)
}
`;

const Login = () => {
    const [values, setValues] = useState({});
    const navigate = useNavigate();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const [signIn] = useMutation(SIGNIN, {
            onCompleted: (data) => {
                localStorage.setItem('token', data.signin);
                navigate('/');
            },
        },
    );

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn({variables: values});
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <input type='text' placeholder='Email' name='email' onChange={onChange} />
                </div>
                <div>
                    <input type='password' placeholder='Password' name='password' onChange={onChange} />
                </div>
                <div>
                    <input type='submit' name='submit' placeholder='Submit' />
                </div>
            </form>
        </div>
    );
};

export default Login;