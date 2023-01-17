import React, {FC} from 'react';
import {Link} from 'react-router-dom';

const Header: FC = () => (
    <>
        <div>Logo</div>
        <div>
            <div>Search</div>
            <div>
                <input type='text' />
            </div>
        </div>
        <Link to='login'>Login</Link>
        <Link to='signup'>Signup</Link>
    </>
);

export default Header;