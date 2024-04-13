import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                if(isMounted){
                    console.error(err);
                    navigate('/login', { state: { from: location }, replace: true });
                }

                // React v18 due to strictMode this is mounted and unmounted once and then remount that's why problem happens also....
                // if (err.name === 'CanceledError') {
                //     console.log('Request was aborted'); 
                // } else {
                //     console.error(err);
                //     navigate('/login', { state: { from: location }, replace: true });
                // }
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display.</p>
            }
        </article>
    );
};

export default Users;