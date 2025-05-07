import { useState, useEffect } from 'react';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    limit,
    startAfter,
    getDocs
} from 'firebase/firestore';
import { db } from '../firebase/config';

const useMessages = (messagesLimit = 50) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastVisible, setLastVisible] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    // Load initial messages
    useEffect(() => {
        setLoading(true);

        const messagesRef = collection(db, 'messages');
        const q = query(
            messagesRef,
            orderBy('createdAt', 'desc'),
            limit(messagesLimit)
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const messageData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setMessages(messageData.reverse());
                setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
                setHasMore(snapshot.docs.length === messagesLimit);
                setLoading(false);
            },
            (err) => {
                setError('Error loading messages: ' + err.message);
                setLoading(false);
            }
        );

        // Cleanup listener on unmount
        return unsubscribe;
    }, [messagesLimit]);

    // Function to load more messages
    const loadMoreMessages = async () => {
        if (!lastVisible || !hasMore) return;

        setLoading(true);

        try {
            const messagesRef = collection(db, 'messages');
            const q = query(
                messagesRef,
                orderBy('createdAt', 'desc'),
                startAfter(lastVisible),
                limit(messagesLimit)
            );

            const snapshot = await getDocs(q);
            const newMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setMessages((prevMessages) => [...prevMessages, ...newMessages.reverse()]);
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
            setHasMore(snapshot.docs.length === messagesLimit);
        } catch (err) {
            setError('Error loading more messages: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        messages,
        loading,
        error,
        hasMore,
        loadMoreMessages,
    };
};

export default useMessages;