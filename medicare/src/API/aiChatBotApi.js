import clientAiChatBot from "./clientAiChatBot";

const aiChatBot = async (prompt) => {
  const res = await clientAiChatBot.post("/aiChatBot", {
    prompt,
  });

  return res?.data?.data?.reply;
};

export default aiChatBot;
