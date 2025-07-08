// utils/chatHelpers.js
import { createEmptySession } from ".../";

export const createAndNavigateNewChat = async (navigateFn, setSessionIdFn = null) => {
  try {
    const { data: newSession } = await createEmptySession();
    if (setSessionIdFn) setSessionIdFn(newSession._id);
    navigateFn(`/chat/${newSession._id}`);
    return newSession._id;
  } catch (err) {
    console.error("Failed to create new chat session:", err);
    return null;
  }
};
