import { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

export const useAuth = () => {
    const user = useSelector((state) => state.user)

    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isUserAdm, setIsUserAdm] = useState(false)

    useEffect(() => {
        if (user) {

            if (user.access_level === "adm") {
                setIsUserAdm(true)
            } else {
                setIsUserAdm(false)
            }
            setAuth(true);

        } else {
            setAuth(false);
        }

        setLoading(false);
    }, [user]);

    return { auth, loading, isUserAdm };
}