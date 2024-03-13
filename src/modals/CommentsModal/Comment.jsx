import { useEffect, useState } from "react";
import { useAuth } from "../../features/AuthManager";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UserAvatar from "../../components/UserAvatar";




function Comment({comment}) {
    const { authState } = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/users/${comment.userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${authState.token}`
            },
        })
        .then((response) => response.json())
        .then((user) => {
            switch (user.result) {
                case 200:
                    setUser(user.data);
                    break;
                default:
                    // this should be used to display an error message
                    console.log(user.errors[0].msg);
            }
        });
    });

    return (
        <>
            {user && <>
                <Box sx={{m: "5px"}}>
                    <UserAvatar userData={user} size={30} />
                </Box>
                <Box>
                    <Typography variant="body1" component="p" sx={{
                        fontSize: "0.9rem",
                    }}>
                        <b>{user.name}: </b>
                        {comment.content}
                    </Typography>
                </Box>
            </>}
        </>
    );
}

export default Comment