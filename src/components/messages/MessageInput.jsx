import { useState } from 'react';
import { FiSend, FiSmile } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { createMessage } from '../../utils/firestore';

const MessageInput = () => {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const { currentUser } = useAuth();

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (message.trim() === '' || !currentUser || isSending) return;

        try {
            setIsSending(true);

            await createMessage({
                text: message.trim(),
                uid: currentUser.uid,
                displayName: currentUser.displayName || currentUser.email.split('@')[0],
                photoURL: currentUser.photoURL || null,
            });

            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="border-t border-gray-200 p-4 bg-white">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <button
                    type="button"
                    className="text-gray-500 hover:text-indigo-600 focus:outline-none"
                >
                    <FiSmile size={24} />
                </button>

                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    disabled={isSending}
                />

                <button
                    type="submit"
                    disabled={!message.trim() || isSending}
                    className={`
            rounded-full p-2 
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            ${message.trim() && !isSending
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
            transition-colors duration-200
          `}
                >
                    <FiSend size={20} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;