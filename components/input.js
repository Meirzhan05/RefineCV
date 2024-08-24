import { Box, InputAdornment, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ClearIcon from '@mui/icons-material/Clear';
import mammoth from 'mammoth';

export default function Input({sendMessage, setSelectedFiles, selectedFiles}) {
    const [inputValue, setInputValue] = useState(''); 

    const handleSend = () => {
        if (inputValue.length <= 0 && selectedFiles.length === 0) {
            return;
        }
        sendMessage(inputValue);
        setInputValue('');
    }
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const arrayBuffer = e.target.result;
            mammoth.extractRawText({ arrayBuffer: arrayBuffer })
                .then(function(result){
                    const obj = {
                        name: file.name,
                        type: file.type,
                        text: result.value,
                    }
                    setSelectedFiles([...selectedFiles, obj]);
                })
                .done();
        };
        
        reader.readAsArrayBuffer(file);
    };

    function handleRemoveFile(index) {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
    }

    function shortenFileName(fileName, maxLength) {
        if (fileName.length <= maxLength) {
            return fileName;
        }
        const extension = fileName.split('.').pop();
        const nameWithoutExtension = fileName.slice(0, -(extension.length + 1)); 
        const shortenedName = nameWithoutExtension.slice(0, maxLength - extension.length - 4) + '...';
    
        return `${shortenedName}.${extension}`;
    }

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            {selectedFiles.length > 0 && (
                <Box sx={{
                    borderColor: 'black',
                    width: '67.5%',
                    height: '10vh',
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 5,
                    backgroundColor: '#f5f5f5',
                }}>
                    {selectedFiles.map((file, i) => (
                        <Box key={file.name} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                            border: '1px solid black',
                            borderRadius: 2,
                            height: '35%',
                            width: '36%',
                            padding: 1,
                        }}>
                            <Box>
                                {shortenFileName(file.name, 20)}
                            </Box>
                            <IconButton onClick={() => handleRemoveFile(i)}>
                                <ClearIcon />
                            </IconButton>

                        </Box>
                    ))}
                </Box>
            )}
            <TextField 
            placeholder="Prompt"
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} 
            autoComplete="off"
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSend();
                }
            }}
            sx={{
                width: '70%',
                mb: 6,
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        border: '1px solid black',
                    },
                },
                
            }}
            InputProps={{
                style: {
                    borderRadius: "150px",
                },
                startAdornment: (
                    <InputAdornment position="start">
                        <input
                            accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="contained-button-file">
                            <IconButton component="span">
                                <AttachFileIcon />
                            </IconButton>
                        </label>
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton sx={{color: "#4D6DFF"}} onClick={handleSend}>
                            <SendIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
            />
        </Box>

    )
}