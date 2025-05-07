import { useRef, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useMessages from "../hooks/useMessages";
import MessageBubble from "../components/messages/MessageBubble";
import MessageInput from "../components/messages/MessageInput";

const Chat = () => {
    const { messages, loading, error, hasMore, loadMoreMessages } = useMessages(50);
    const { currentUser, logout } = useAuth();
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!loading && messages.length > 0) {
            scrollToBottom();
        }
    }, [messages, loading]);

    const handleLoadMore = () => {
        if (hasMore && !loading) {
            loadMoreMessages();
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-indigo-600 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">VibeChat</h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            {currentUser.photoURL ? (
                                <img
                                    src={currentUser.photoURL}
                                    alt={currentUser.displayName || "User"}
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center mr-2">
                                    {(currentUser.displayName || currentUser.email)[0].toUpperCase()}
                                </div>
                            )}
                            <span className="text-sm font-medium">
                                {currentUser.displayName || currentUser.email.split("@")[0]}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-full hover:bg-indigo-700 transition-colors"
                            title="Logout"
                        >
                            <BiLogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Load More Messages Button */}
                {hasMore && (
                    <div className="flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            disabled={loading}
                            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 disabled:opacity-50"
                        >
                            {loading ? "Loading..." : "Load earlier messages"}
                        </button>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 p-3 rounded-md text-red-700 text-center">
                        {error}
                    </div>
                )}

                {/* Loading Indicator */}
                {loading && messages.length === 0 && (
                    <div className="flex justify-center p-8">
                        <div className="animate-pulse text-indigo-600">Loading messages...</div>
                    </div>
                )}

                {/* No Messages */}
                {!loading && messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full p-8">
                        <div className="text-gray-500 text-center">
                            <p className="text-xl mb-2">No messages yet</p>
                            <p className="text-sm">Be the first to send a message!</p>
                        </div>
                    </div>
                )}

                {/* Messages List */}
                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}

                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <MessageInput />
        </div>
    );
};

export default Chat;