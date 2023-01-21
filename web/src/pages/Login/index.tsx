import React from 'react';
import {gql, useMutation} from '@apollo/client';
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {HashLoader} from 'react-spinners';

const SIGNIN = gql`
mutation Signin($email: String!, $password: String!) {
  signin(email: $email, password: $password)
}
`;

const SigninSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').max(80, 'Email cannot exceed 80 symbols').required('Required'),
    password: Yup.string().min(8, 'Password should be at least 8 symbols').max(80, 'Password cannot be longer than 80 symbols').required('Required'),
});

const Login = () => {
    const navigate = useNavigate();

    const [signin, {loading, error}] = useMutation(SIGNIN, {
            onCompleted: (data) => {
                localStorage.setItem('token', data.signin);
                navigate('/');
            },
        },
    );

    if (loading) return <HashLoader color='#000' loading={loading} size={150} />;

    return (
        <div>
            <h1>Login</h1>
            {error && <div>{error.graphQLErrors.map(message => (
                <div key={message.message}>{message.message}</div>
            ))}</div>}
            <Formik initialValues={{email: '', password: ''}} onSubmit={
                async (values) => {
                    const {email, password} = values;
                    await signin({variables: {email, password}});
                    navigate('/');
                }
            } validationSchema={SigninSchema}>
                {({isSubmitting}) => (
                    <Form>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <Field type='email' name='email' placeholder='Email' />
                            <ErrorMessage name={'email'} component={'div'} />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <Field type='password' name='password' placeholder='Password' />
                            <ErrorMessage name={'password'} component={'div'} />
                        </div>
                        <button type='submit' disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;