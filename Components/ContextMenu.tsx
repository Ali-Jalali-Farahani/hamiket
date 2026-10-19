import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';

export default function ContextMenu({contextMenu,setContextMenu,cut,copy,paste}:{contextMenu: {mouseX: number;mouseY: number;} | null,setContextMenu:React.Dispatch<React.SetStateAction<{mouseX: number;mouseY: number;} | null>>,cut:Function,copy:Function,paste:Function}) {
    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : // بستن منو در صورت راست کلیک مجدد
                null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    return (
        <div style={{ cursor: 'context-menu', padding: 20 }}>
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top:contextMenu.mouseY, left:contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={()=>{cut();handleClose()}}>
                    <ListItemIcon>
                        <ContentCut fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem onClick={()=>{copy();handleClose()}}>
                    <ListItemIcon>
                        <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem onClick={()=>{paste();handleClose()}}>
                    <ListItemIcon>
                        <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
}