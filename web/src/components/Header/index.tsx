import React, {FC} from 'react';

const Header: FC = () => (
    <>
        <div>Logo</div>
        <div>
            <div>Search</div>
            <div>
                <input type='text' />
            </div>
        </div>
        <button>Login</button>
        <button>Signup</button>
    </>
);

export default Header;