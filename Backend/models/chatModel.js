// chatModel.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  from: { type: String, enum: ['user', 'bot'], required: true },
  text: { type: String },
  response: { type: String },
  label: { type: String },
  confidence: { type: Number }
}, { timestamps: true });

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  messages: [messageSchema]
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
