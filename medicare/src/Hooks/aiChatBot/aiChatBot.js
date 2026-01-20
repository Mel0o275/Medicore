import { useMutation } from "@tanstack/react-query";
import aiChatBot from "../../API/aiChatBotApi";

export const useAiChatBot = () => {
  return useMutation({
    mutationFn: (msg) => aiChatBot(msg),
  });
};
