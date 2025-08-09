import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Message, Notification } from '../types/match';
import { mockMessages, mockNotifications } from '../data/mockMatches';

/**
 * ChatStore - Manages messaging functionality and notifications
 * 
 * This store handles:
 * - Loading and caching messages by match/room
 * - Sending and receiving messages
 * - Message read status tracking
 * - File attachments and message types
 * - Notifications for new messages
 * - Message search and filtering
 * - Real-time message updates
 */

interface ChatState {
    // Messages data
    messages: Message[];
    notifications: Notification[];
    isLoading: boolean;
    error: string | null;

    // Current conversation state
    currentMatchId: string | null;
    typingUsers: Record<string, string[]>; // matchId -> list of user IDs typing

    // Actions
    loadMessages: () => Promise<void>;
    loadMessagesByMatch: (matchId: string) => Promise<void>;
    sendMessage: (
        matchId: string,
        content: string,
        senderId: string,
        receiverId: string,
        type?: Message['type'],
        attachments?: any[]
    ) => Promise<void>;

    // Message management
    markMessageAsRead: (messageId: string) => Promise<void>;
    markAllMessagesAsRead: (matchId: string, userId: string) => Promise<void>;
    editMessage: (messageId: string, newContent: string) => Promise<void>;
    deleteMessage: (messageId: string) => Promise<void>;

    // File handling
    uploadAttachment: (file: File, matchId: string) => Promise<string>;
    sendFileMessage: (
        matchId: string,
        senderId: string,
        receiverId: string,
        attachments: any[]
    ) => Promise<void>;

    // Notifications
    loadNotifications: () => Promise<void>;
    createNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => Promise<void>;
    markNotificationAsRead: (notificationId: string) => Promise<void>;
    markAllNotificationsAsRead: (userId: string) => Promise<void>;
    clearNotifications: (userId: string) => Promise<void>;

    // Typing indicators
    setUserTyping: (matchId: string, userId: string) => void;
    setUserStoppedTyping: (matchId: string, userId: string) => void;

    // Getters and filters
    getMessagesByMatch: (matchId: string) => Message[];
    getUnreadMessages: (matchId: string, userId: string) => Message[];
    getUnreadNotifications: (userId: string) => Notification[];
    getUnreadCount: (userId: string) => number;
    getLastMessage: (matchId: string) => Message | null;

    // Current conversation
    setCurrentMatch: (matchId: string | null) => void;

    // Utility functions
    clearError: () => void;
}

export const useChatStore = create<ChatState>()(
    immer((set, get) => ({
        // Initial state
        messages: [],
        notifications: [],
        isLoading: false,
        error: null,
        currentMatchId: null,
        typingUsers: {},

        // Load all messages from mock data or API
        loadMessages: async () => {
            set((state) => {
                state.isLoading = true;
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                // In a real app, this would be an API call
                const messagesData = mockMessages;

                set((state) => {
                    state.messages = messagesData;
                    state.isLoading = false;
                });
            } catch (error) {
                set((state) => {
                    state.isLoading = false;
                    state.error = 'Failed to load messages';
                });
            }
        },

        loadMessagesByMatch: async (matchId: string) => {
            set((state) => {
                state.isLoading = true;
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 300));

                // In a real app, this would be an API call filtered by matchId
                const existingMessages = get().messages;
                const matchMessages = existingMessages.filter(msg => msg.matchId === matchId);

                // If no messages exist for this match, we might load them from API
                if (matchMessages.length === 0) {
                    // Load from mock data or API
                    const allMessages = mockMessages.filter(msg => msg.matchId === matchId);

                    set((state) => {
                        state.messages = [...state.messages, ...allMessages];
                        state.isLoading = false;
                    });
                } else {
                    set((state) => {
                        state.isLoading = false;
                    });
                }
            } catch (error) {
                set((state) => {
                    state.isLoading = false;
                    state.error = 'Failed to load messages for match';
                });
            }
        },

        sendMessage: async (
            matchId: string,
            content: string,
            senderId: string,
            receiverId: string,
            type: Message['type'] = 'text',
            attachments?: any[]
        ) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 200));

                const newMessage: Message = {
                    id: `msg-${Date.now()}`,
                    matchId,
                    senderId,
                    receiverId,
                    content,
                    timestamp: new Date(),
                    type,
                    attachments: attachments || undefined,
                };

                set((state) => {
                    state.messages.push(newMessage);

                    // Clear typing indicator for sender
                    if (state.typingUsers[matchId]) {
                        state.typingUsers[matchId] = state.typingUsers[matchId].filter(
                            userId => userId !== senderId
                        );
                    }
                });

                // Create notification for receiver
                await get().createNotification({
                    userId: receiverId,
                    type: 'new-message',
                    title: 'New message',
                    message: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
                    icon: '💬',
                    actionUrl: `/matches/${matchId}`,
                    matchId,
                    messageId: newMessage.id,
                    senderId,
                    priority: 'medium',
                });

            } catch (error) {
                set((state) => {
                    state.error = 'Failed to send message';
                });
                throw error;
            }
        },

        // Message management
        markMessageAsRead: async (messageId: string) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 100));

                set((state) => {
                    const messageIndex = state.messages.findIndex(msg => msg.id === messageId);
                    if (messageIndex !== -1) {
                        state.messages[messageIndex].readAt = new Date();
                    }
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to mark message as read';
                });
                throw error;
            }
        },

        markAllMessagesAsRead: async (matchId: string, userId: string) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 200));

                set((state) => {
                    state.messages.forEach(message => {
                        if (
                            message.matchId === matchId &&
                            message.receiverId === userId &&
                            !message.readAt
                        ) {
                            message.readAt = new Date();
                        }
                    });
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to mark messages as read';
                });
                throw error;
            }
        },

        editMessage: async (messageId: string, newContent: string) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 200));

                set((state) => {
                    const messageIndex = state.messages.findIndex(msg => msg.id === messageId);
                    if (messageIndex !== -1) {
                        state.messages[messageIndex].content = newContent;
                        state.messages[messageIndex].editedAt = new Date();
                    }
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to edit message';
                });
                throw error;
            }
        },

        deleteMessage: async (messageId: string) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 200));

                set((state) => {
                    state.messages = state.messages.filter(msg => msg.id !== messageId);
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to delete message';
                });
                throw error;
            }
        },

        // File handling
        uploadAttachment: async (file: File, matchId: string): Promise<string> => {
            try {
                // Simulate file upload delay
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // In a real app, this would upload to cloud storage
                const mockUrl = `https://cdn.dealease.com/attachments/${matchId}/${file.name}`;
                return mockUrl;
            } catch (error) {
                throw new Error('Failed to upload attachment');
            }
        },

        sendFileMessage: async (
            matchId: string,
            senderId: string,
            receiverId: string,
            attachments: any[]
        ) => {
            try {
                await get().sendMessage(
                    matchId,
                    `Shared ${attachments.length} file(s)`,
                    senderId,
                    receiverId,
                    'file',
                    attachments
                );
            } catch (error) {
                throw error;
            }
        },

        // Notifications
        loadNotifications: async () => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 300));

                // In a real app, this would be an API call
                const notificationsData = mockNotifications;

                set((state) => {
                    state.notifications = notificationsData;
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to load notifications';
                });
            }
        },

        createNotification: async (notificationData: Omit<Notification, 'id' | 'createdAt'>) => {
            set((state) => {
                state.error = null;
            });

            try {
                const newNotification: Notification = {
                    ...notificationData,
                    id: `notif-${Date.now()}`,
                    createdAt: new Date(),
                };

                set((state) => {
                    state.notifications.unshift(newNotification);
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to create notification';
                });
                throw error;
            }
        },

        markNotificationAsRead: async (notificationId: string) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 100));

                set((state) => {
                    const notificationIndex = state.notifications.findIndex(
                        notif => notif.id === notificationId
                    );
                    if (notificationIndex !== -1) {
                        state.notifications[notificationIndex].readAt = new Date();
                    }
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to mark notification as read';
                });
                throw error;
            }
        },

        markAllNotificationsAsRead: async (userId: string) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 200));

                set((state) => {
                    state.notifications.forEach(notification => {
                        if (notification.userId === userId && !notification.readAt) {
                            notification.readAt = new Date();
                        }
                    });
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to mark notifications as read';
                });
                throw error;
            }
        },

        clearNotifications: async (userId: string) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 200));

                set((state) => {
                    state.notifications = state.notifications.filter(
                        notif => notif.userId !== userId
                    );
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to clear notifications';
                });
                throw error;
            }
        },

        // Typing indicators
        setUserTyping: (matchId: string, userId: string) => {
            set((state) => {
                if (!state.typingUsers[matchId]) {
                    state.typingUsers[matchId] = [];
                }
                if (!state.typingUsers[matchId].includes(userId)) {
                    state.typingUsers[matchId].push(userId);
                }
            });
        },

        setUserStoppedTyping: (matchId: string, userId: string) => {
            set((state) => {
                if (state.typingUsers[matchId]) {
                    state.typingUsers[matchId] = state.typingUsers[matchId].filter(
                        id => id !== userId
                    );
                }
            });
        },

        // Getters and filters
        getMessagesByMatch: (matchId: string) => {
            const messages = get().messages;
            return messages
                .filter(message => message.matchId === matchId)
                .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        },

        getUnreadMessages: (matchId: string, userId: string) => {
            const messages = get().getMessagesByMatch(matchId);
            return messages.filter(
                message => message.receiverId === userId && !message.readAt
            );
        },

        getUnreadNotifications: (userId: string) => {
            const notifications = get().notifications;
            return notifications.filter(
                notif => notif.userId === userId && !notif.readAt
            );
        },

        getUnreadCount: (userId: string) => {
            return get().getUnreadNotifications(userId).length;
        },

        getLastMessage: (matchId: string) => {
            const messages = get().getMessagesByMatch(matchId);
            return messages.length > 0 ? messages[messages.length - 1] : null;
        },

        // Current conversation
        setCurrentMatch: (matchId: string | null) => {
            set((state) => {
                state.currentMatchId = matchId;
            });
        },

        // Utility functions
        clearError: () => {
            set((state) => {
                state.error = null;
            });
        },
    }))
);

// Export selectors for better performance and reusability
export const chatSelectors = {
    getMessagesByMatch: (matchId: string) => useChatStore.getState().getMessagesByMatch(matchId),
    getUnreadMessages: (matchId: string, userId: string) =>
        useChatStore.getState().getUnreadMessages(matchId, userId),
    getUnreadNotifications: (userId: string) =>
        useChatStore.getState().getUnreadNotifications(userId),
    getUnreadCount: (userId: string) => useChatStore.getState().getUnreadCount(userId),
    getLastMessage: (matchId: string) => useChatStore.getState().getLastMessage(matchId),
    isLoading: () => useChatStore.getState().isLoading,
    getError: () => useChatStore.getState().error,
    getCurrentMatch: () => useChatStore.getState().currentMatchId,
    getTypingUsers: (matchId: string) => useChatStore.getState().typingUsers[matchId] || [],
};

/**
 * Usage Examples:
 * 
 * // Send a message in a conversation:
 * import { useChatStore } from '../store/chatStore';
 * 
 * function MessageComposer({ matchId, currentUserId, receiverId }) {
 *   const { sendMessage } = useChatStore();
 *   
 *   const handleSendMessage = async (content) => {
 *     await sendMessage(matchId, content, currentUserId, receiverId);
 *   };
 * }
 * 
 * // Display messages for a match:
 * function MessagesList({ matchId }) {
 *   const messages = useChatStore(state => state.getMessagesByMatch(matchId));
 *   const { markAllMessagesAsRead } = useChatStore();
 *   
 *   useEffect(() => {
 *     if (messages.length > 0) {
 *       markAllMessagesAsRead(matchId, currentUserId);
 *     }
 *   }, [messages]);
 * }
 * 
 * // Show typing indicators:
 * function TypingIndicator({ matchId }) {
 *   const typingUsers = useChatStore(state => state.typingUsers[matchId] || []);
 *   
 *   if (typingUsers.length > 0) {
 *     return <div>{typingUsers.join(', ')} typing...</div>;
 *   }
 *   return null;
 * }
 */
