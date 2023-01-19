import React, {ChangeEvent, FormEvent, useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {useNavigate} from 'react-router-dom';

const SIGNUP = gql`
mutation Mutation($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
  signup(email: $email, firstName: $firstName, lastName: $lastName, password: $password)
}
`;


const Signup = () => {
    type Values = {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        confirmPassword: string;
    };

    const [values, setValues] = useState<Values>({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const [signup] = useMutation(SIGNUP, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.signup);
            navigate('/');
        },
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const {email, firstName, lastName, password} = values;
        await signup({variables: {email, firstName, lastName, password}});
        navigate('/');
    };

    return <div>
        <h1>Signup</h1>
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor='email'>Email</label>
                <input type='text' placeholder='Email' name='email' onChange={onChange} />
            </div>
            <div>
                <label htmlFor='first-name'>First name</label>
                <input type='text' placeholder='First name' name='firstName' onChange={onChange} />
            </div>
            <div>
                <label htmlFor='last-name'>Last name</label>
                <input type='text' placeholder='Last name' name='lastName' onChange={onChange} />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='Password' name='password' onChange={onChange} />
            </div>
            <div>
                <label htmlFor='confirm-password'>Confirm password</label>
                <input type='password' placeholder='Confirm password' name='confirmPassword' onChange={onChange} />
            </div>
            <div>
                <input type='submit' name='submit' placeholder='Submit' />
            </div>
        </form>
    </div>;
};

export default Signup;