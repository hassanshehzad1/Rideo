import { React, useContext } from 'react'

const UserContext = ({ children }) => {
    const UserDataContext = useContext();
    return (
        <div>
            <UserDataContext.Provider>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext