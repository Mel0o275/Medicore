import {
  Box,
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import useTheme from "../Store/useTheme";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { useAiChatBot } from "../Hooks/aiChatBot/aiChatBot";

import { DotPulse } from "ldrs/react";
import "ldrs/react/DotPulse.css";

function AiSwitcher() {
  const messagesEndRef = useRef(null);

  const { mutateAsync } = useAiChatBot();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hello 👋 How can I help you today?" },
  ]);

  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const onSubmit = async (data) => {
    if (!data.message) return;

    reset();

    const userMessage = data.message;

    setMessages((prev) => [
      ...prev,
      { from: "user", text: userMessage },
      {
        from: "ai",
        text: <DotPulse size="40" speed="1.3" color={theme.secondaryColor} />,
        loading: true,
      },
    ]);

    // Default values shown
    try {
      const response = await mutateAsync(userMessage);

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { from: "ai", text: response },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { from: "ai", text: "❌ AI failed to respond" },
      ]);
    }
  };

  return (
    <Container>
      {/* ================= CHAT WINDOW ================= */}

      {open && (
        <Box
          sx={{
            position: "fixed",

            borderRadius: 4,
            overflow: "hidden",
            background: "rgba(20,20,20,0.75)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            animation: closing
              ? "slideDown 0.4s ease forwards"
              : "slideUp 0.4s ease",

            "@keyframes slideUp": {
              from: { opacity: 0, transform: "translateY(30px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },

            "@keyframes slideDown": {
              from: { opacity: 1, transform: "translateY(0)" },
              to: { opacity: 0, transform: "translateY(40px)" },
            },

            bottom: { xs: 16, sm: 50 },
            right: { xs: 8, sm: 120 },
            width: { xs: "calc(100% - 16px)", sm: 350 },
            height: { xs: "70vh", sm: 450 },
            maxHeight: "90vh",
            zIndex: 1500,
          }}
        >
          {/* ===== Header ===== */}
          <Box
            sx={{
              p: { xs: 1.5, sm: 2 },
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              background: `linear-gradient(45deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
            }}
          >
            <Avatar src="/aiChatBot.gif" />
            <Typography fontWeight="bold" color={theme.primaryText}>
              AI Assistant
            </Typography>
            <Box flex={1} />
            <Button
              onClick={() => {
                setClosing(true);
                setTimeout(() => {
                  setOpen(false);
                  setClosing(false);
                }, 400);
              }}
              sx={{ color: theme.primaryText, minWidth: "auto" }}
            >
              ✕
            </Button>
          </Box>

          {/* ===== Messages Area ===== */}
          <Box
            sx={{
              p: { xs: 1.5, sm: 2 },
              flex: 1,

              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                  p: 1.2,
                  px: 2,
                  borderRadius: 3,
                  color: "#fff",
                  background:
                    msg.from === "user"
                      ? `linear-gradient(45deg, ${theme.primaryColor}, ${theme.secondaryColor})`
                      : "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(6px)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",

                  maxWidth: { xs: "90%", sm: "80%" },

                  fontSize: { xs: 13, sm: 14 },
                }}
              >
                {msg.text}
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* ===== Input Area ===== */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              p: { xs: 1, sm: 1.5 },
              display: "flex",
              gap: 1,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <TextField
              {...register("message")}
              fullWidth
              placeholder="Type your message..."
              variant="outlined"
              size="small"
              sx={{
                input: { color: "#fff", fontSize: { xs: 13, sm: 14 } },
                fieldset: { borderColor: "rgba(255,255,255,0.2)" },
              }}
            />

            <Button
              type="submit"
              sx={{
                minWidth: { xs: 44, sm: 48 },
                borderRadius: 2,
                color: theme.primaryText,
                background: `linear-gradient(45deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                "&:hover": {
                  boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
                },
              }}
            >
              ➤
            </Button>
          </Box>
        </Box>
      )}

      {/* ================= FLOATING AI BUTTON ================= */}
      <Box
        sx={{
          position: "fixed",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
          animation: "pulse 2.5s infinite",

          bottom: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
          zIndex: 1000,
          width: { xs: 64, sm: 80 },
          height: { xs: 64, sm: 80 },
          borderRadius: "50%",

          "&:hover": {
            transform: "translateY(-6px)",
          },
        }}
        onClick={() => setOpen(true)}
      >
        <Avatar
          src="\aiChatBot.gif"
          sx={{
            width: 80,
            height: 80,
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-6px)",
            },
          }}
        />
      </Box>
    </Container>
  );
}

export default AiSwitcher;
