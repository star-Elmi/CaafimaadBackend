import Chat from '../models/chatModel.js';
import axios from 'axios';

// ✅ Get all chat sessions for logged-in user
export const getUserChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chat sessions" });
  }
};

// ✅ Create new session (with optional initial message)
export const createChatSession = async (req, res) => {
  try {
    const { title, message } = req.body;
    const newChat = {
      user: req.user._id,
      title: title || "New Chat",
      messages: message ? [message] : [],
    };
    const chat = await Chat.create(newChat);
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: "Failed to create chat session" });
  }
};

// ✅ Append messages to existing chat session
export const appendToChatSession = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    const { messages, title } = req.body;

    if (Array.isArray(messages) && messages.length > 0) {
      chat.messages.push(...messages);
    }

    if (title && title.trim()) {
      chat.title = title.trim();
    }

    await chat.save();
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ error: "Failed to update chat session" });
  }
};

// ✅ Delete chat session
export const deleteChatSession = async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete chat session" });
  }
};

// ✅ Rename chat session
export const renameChatSession = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title },
      { new: true }
    );

    if (!chat) return res.status(404).json({ error: "Chat not found" });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: "Failed to rename chat session" });
  }
};

// ✅ /chat/predict — Supports both guest and logged-in users
export const getPrediction = async (req, res) => {
  const { message } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({
      response: "Fadlan geli su’aal sax ah.",
      confidence: 0.0,
      label: "Error"
    });
  }

  try {
    const flaskRes = await axios.post(`${process.env.FLASK_API_URL}/predict`, { message });
    const { response: botResponse, confidence, label } = flaskRes.data;

    res.json({
      response: botResponse || "Waan ka xumahay, wax jawaab lama helin.",
      confidence: typeof confidence === "number" ? confidence : 0.5,
      label: label || "Semantic"
    });
  } catch (error) {
    console.error("🔥 Flask API error:", error.message, error.response?.data);
    res.status(500).json({
      response: "Waan ka xumahay, cilad ayaa dhacday.",
      confidence: 0.0,
      label: "Error"
    });
  }
};