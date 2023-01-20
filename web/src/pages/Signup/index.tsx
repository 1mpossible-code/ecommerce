import React from 'react';
import {gql, useMutation} from '@apollo/client';
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

const SIGNUP = gql`
mutation Mutation($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
  signup(email: $email, firstName: $firstName, lastName: $lastName, password: $password)
}
`;

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').max(80, 'Email cannot exceed 80 symbols').required('Required'),
    firstName: Yup.string().max(80, 'First name cannot exceed 80 symbols').required('Required'),
    lastName: Yup.string().max(80, 'Last name cannot exceed 80 symbols').required('Required'),
    password: Yup.string().min(8, 'Password should be at least 8 symbols').max(80, 'Password cannot be longer than 80 symbols').required('Required'),
    confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Signup = () => {
    const navigate = useNavigate();

    const [signup, {loading, error}] = useMutation(SIGNUP, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.signup);
            navigate('/');
        },
    });

    return <div>
        <h1>Signup</h1>
        {error && <div>{error.graphQLErrors.map(message => (
            <div key={message.message}>{message.message}</div>
        ))}</div>}
        <Formik initialValues={{email: '', firstName: '', lastName: '', password: '', confirmPassword: ''}} onSubmit={
            async (values) => {
                const {email, firstName, lastName, password} = values;
                await signup({variables: {email, firstName, lastName, password}});
                navigate('/');
            }
        } validationSchema={SignupSchema}>
            {({isSubmitting}) => (
                <Form>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <Field type='email' name='email' placeholder='Email' />
                        <ErrorMessage name={'email'} component={'div'} />
                    </div>
                    <div>
                        <label htmlFor='firstName'>First Name</label>
                        <Field type='text' name='firstName' placeholder='First Name' />
                        <ErrorMessage name={'firstName'} component={'div'} />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name</label>
                        <Field type='text' name='lastName' placeholder='Last Name' />
                        <ErrorMessage name={'lastName'} component={'div'} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <Field type='password' name='password' placeholder='Password' />
                        <ErrorMessage name={'password'} component={'div'} />
                    </div>
                    <div>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <Field type='password' name='confirmPassword' placeholder='Confirm Password' />
                        <ErrorMessage name={'confirmPassword'} component={'div'} />
                    </div>
                    <button type='submit' disabled={isSubmitting}>Submit</button>
                </Form>
            )}
        </Formik>
    </div>;
};

export default Signup;