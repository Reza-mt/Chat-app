import React, { useState,useEffect, useContext } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import axios from 'axios';

//component
import Navbar from './Navbar';

//Styles
import styles from './Chats.module.css';

//context
import { AuthContext } from '../context/AuthContextProvider';

const Chats = () => {

    const [loading, setLoading] = useState(true);
    const user = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if(!user){
            history.push('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me',{
            headers: {
                "project-id": "d52d885d-5c69-41ad-b843-f98148132eb3",
                "user-name": user.email,
                "user-secret": user.uid
            }
        })
        .then(()=>{
            setLoading(false)
        })
        .catch(()=>{
            let formData = new FormData();
            formData.append("email", user.email);
            formData.append('username', user.email);
            formData.append('secret', user.uid);
            getFile(user.photoURL)
                .then(avatar=>{
                    formData.append("avatar", avatar, avatar.name)
                    axios.post('https://api.chatengine.io/users/', formData,{
                        headers:{
                            "private-key": "fe6217f2-6e2a-4de9-a7da-1db4b6585814"
                        }
                    })
                    .then(()=> setLoading(false))
                    .catch(error => console.log(error))
                })
        })


    },[user, history]);


    const getFile = async(url) =>{
        const response = await fetch(url);
        const data = await response.blob();
        return new File ([data], "userPhoto.jpg", {type:"image/jpeg"} )
    }

    const logoutHandler = async () => {
        await auth.signOut();
        history.push('/');
    }

    if(!user || loading) return 'Loading...'

    return (
        <div className={styles.container}>
            <Navbar logoutHandler={logoutHandler}/>

            <ChatEngine 
                height='calc(100vh - 50px)'
                projectID='d52d885d-5c69-41ad-b843-f98148132eb3'
                userName={user.email}
                userSecret={user.uid}
            
            />
        </div>
    );
};

export default Chats;