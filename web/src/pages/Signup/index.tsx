import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
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

    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState<boolean | 'not touched'>('not touched');

    const navigate = useNavigate();


    const [signup, {loading, error}] = useMutation(SIGNUP, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.signup);
            navigate('/');
        },
    });

    useEffect(() => {
        if (error) {
            setValues({
                ...values,
                password: '',
                confirmPassword: '',
            });
        }
    }, [error]);

    useEffect(() => {
        if (values.password !== values.confirmPassword) {
            setPasswordsDoNotMatch(true);
        } else {
            setPasswordsDoNotMatch(false);
        }
    }, [values.password, values.confirmPassword]);


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const {email, firstName, lastName, password, confirmPassword} = values;
        if (password !== confirmPassword) {
            return;
        }

        await signup({variables: {email, firstName, lastName, password}});
        navigate('/');
    };

    return <div>
        <h1>Signup</h1>
        {error && <div>{error.graphQLErrors.map(message => (
            <div key={message.message}>{message.message}</div>
        ))}</div>}
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor='email'>Email</label>
                <input type='text' placeholder='Email' name='email' onChange={onChange} value={values.email} />
            </div>
            <div>
                <label htmlFor='first-name'>First name</label>
                <input type='text' placeholder='First name' name='firstName' onChange={onChange}
                       value={values.firstName} />
            </div>
            <div>
                <label htmlFor='last-name'>Last name</label>
                <input type='text' placeholder='Last name' name='lastName' onChange={onChange}
                       value={values.lastName} />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='Password' name='password' onChange={onChange}
                       value={values.password} />
            </div>
            <div>
                {passwordsDoNotMatch && passwordsDoNotMatch !== 'not touched' && <div>Passwords do not match</div>}
                <label htmlFor='confirm-password'>Confirm password</label>
                <input type='password' placeholder='Confirm password' name='confirmPassword'
                       onChange={onChange} value={values.confirmPassword} />
            </div>
            <div>
                <input type='submit' name='submit' placeholder='Submit' />
            </div>
        </form>
    </div>;
};

export default Signup;