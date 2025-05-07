import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Create a new message
export const createMessage = async (messageData) => {
    try {
        const messagesRef = collection(db, 'messages');
        const newMessage = {
            ...messageData,
            createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(messagesRef, newMessage);
        return { id: docRef.id, ...newMessage };
    } catch (error) {
        console.error('Error creating message:', error);
        throw error;
    }
};

// Get messages for the chat
export const getMessages = async () => {
    try {
        const messagesRef = collection(db, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'asc'));

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting messages:', error);
        throw error;
    }
};

// Delete a message (for moderation or user deletion)
export const deleteMessage = async (messageId) => {
    try {
        const messageRef = doc(db, 'messages', messageId);
        await deleteDoc(messageRef);
        return { success: true };
    } catch (error) {
        console.error('Error deleting message:', error);
        throw error;
    }
};

// Edit a message (if needed)
export const updateMessage = async (messageId, updatedData) => {
    try {
        const messageRef = doc(db, 'messages', messageId);
        await updateDoc(messageRef, {
            ...updatedData,
            updatedAt: serverTimestamp(),
        });

        const updatedDoc = await getDoc(messageRef);
        return { id: updatedDoc.id, ...updatedDoc.data() };
    } catch (error) {
        console.error('Error updating message:', error);
        throw error;
    }
};

// Get user's messages
export const getUserMessages = async (userId) => {
    try {
        const messagesRef = collection(db, 'messages');
        const q = query(
            messagesRef,
            where('uid', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting user messages:', error);
        throw error;
    }
};