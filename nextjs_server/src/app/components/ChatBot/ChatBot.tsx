import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Card, CardContent, IconButton, InputAdornment, TextField, Grid, Tooltip, tooltipClasses, TooltipProps, Badge  } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import chatbotAvatar from '/public/static/images/chatbot_avatar.jpg';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

const ChatBot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { sender: 'bot', text: 'Hi there! How can I assist you?' },
    ]);

    const handleToggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleUserMessageChange = (event : any) => {
        setUserMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (userMessage.trim()) {
            setChatMessages([...chatMessages, { sender: 'user', text: userMessage }]);
            setUserMessage('');
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid xs={11}></Grid>
            <Grid xs={1}>
                {/* Avatar */}
                <CustomWidthTooltip
                    PopperProps={{
                    disablePortal: true,
                    }}
                    onClose={handleToggleChat}
                    open={isChatOpen}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={isChatOpen ? 
                        <Card className="chat-card">
                    <CardContent>
                        {chatMessages.map((message, index) => (
                            <div key={index} className={`message ${message.sender}`}>
                                {message.text}
                            </div>
                        ))}
                    </CardContent>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type your message..."
                        value={userMessage}
                        onChange={handleUserMessageChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSendMessage}>
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Card>
                :
                null}
                >
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot">
                    <Avatar
                        alt="Chatbot Avatar"
                        // src={chatbotAvatar}
                        onClick={handleToggleChat}
                        className="avatar"
                        sx={{ width: 56, height: 56 }}
                    >
                        <CircularProgress size={68}
                                sx={{
                                color: green[500],
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                                }}
                            />
                        <Image src={chatbotAvatar} alt="Chatbot Avatar" fill />
                    </Avatar>
                </StyledBadge>
                </CustomWidthTooltip>
            </Grid>
        </Grid>
    );
};

export default ChatBot;
