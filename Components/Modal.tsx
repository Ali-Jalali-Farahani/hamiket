import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const CustomModal = ({ open, setOpen, onKeyDown, onClick }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>,onKeyDown:(e:React.KeyboardEvent<HTMLDivElement>,name:string,setName:React.Dispatch<React.SetStateAction<string>>)=>void, onClick:(name:string)=>void }) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const [name, setName] = React.useState('');

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="name-modal-title"
            aria-describedby="name-modal-description"
        >
            <Box sx={style}>
                <Typography dir='rtl' id="name-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    اضافه کردن نود
                </Typography>

                <TextField
                    id="name-modal-description"
                    label={"اسم نود:"}
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    onKeyDown={(e)=>{onKeyDown(e,name,setName)}}
                    fullWidth
                    autoFocus
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {
                            textAlign: 'right',
                            direction: 'rtl',
                        },
                    }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 1 }}>
                    <Button onClick={() => setOpen(false)}>انصراف</Button>
                    <Button variant="contained"
                        onClick={()=>{onClick(name);setName("")}}
                        disabled={!name.trim()}
                    >
                        تایید
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default CustomModal