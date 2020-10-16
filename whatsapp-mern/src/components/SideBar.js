import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge'; 
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import  SideBarChat from './SideBarChat'; 
import './SideBar.css';

const SideBar =()=>{
    return (
        <div className='sideBar' >
            <div className='sidebar__header'>
                <Avatar src='https://avatars1.githubusercontent.com/u/49981760?s=400&u=579739401f590b9075ee5682c971c1f4a7c84e4d&v=4' />
                <div className='sidebar__header-right'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className='sidebar__search' >
                <div className='sidebar__searchContainer' >
                    <SearchOutlinedIcon />
                    <input placeholder='Search or start new text' type='text' />
                </div>
            </div>
            <div className='sidebar__chat' >
                <SideBarChat />
                <SideBarChat />
                <SideBarChat />
            </div>
        </div>
    );
}

export default SideBar;