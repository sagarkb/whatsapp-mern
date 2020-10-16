import React from 'react';
import { Avatar } from '@material-ui/core';

import './SideBarChat.css';

const SideBarChat =()=>{
    return( 
        <div className='sidebarchat' >
            <Avatar />
            <div className='sidebarchat__info' >
                <h2>roomname</h2>
                <p>last message</p>
            </div>
        </div>
    );
}

export default SideBarChat;