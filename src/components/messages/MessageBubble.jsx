import { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { deleteMessage } from '../../utils/firestore';

const MessageBubble = ({ message }) => {
    const { currentUser } = useAuth();
    const [isDeleting, setIsDeleting] = useState(false);
    const isOwnMessage = message.uid === currentUser?.uid;

    const formattedTime = message.createdAt?.toDate
        ? message.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : 'Sending...';

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                setIsDeleting(true);
                await deleteMessage(message.id);
            } catch (error) {
                console.error('Error deleting message:', error);
                alert('Failed to delete message');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} group`}>
            <div
                className={`
          max-w-xs md:max-w-md lg:max-w-lg 
          px-4 py-2 
          rounded-lg 
          shadow-sm 
          relative
          ${isOwnMessage
                        ? 'bg-indigo-500 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'}
          ${isDeleting ? 'opacity-50' : ''}
        `}
            >
                {!isOwnMessage && (
                    <div className="text-xs font-semibold mb-1">
                        {message.displayName || "Anonymous"}
                    </div>
                )}

                <p className="whitespace-pre-wrap break-words">{message.text}</p>

                <div className="text-xs text-right mt-1 opacity-70 flex justify-between items-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {isOwnMessage && (
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="text-white hover:text-red-200 transition-colors"
                            >
                                <FiTrash size={14} />
                            </button>
                        )}
                    </span>
                    <span>{formattedTime}</span>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;