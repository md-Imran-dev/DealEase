import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  mockMatches,
  mockMessages,
  mockNotifications,
} from "../data/mockMatches";
import type { Match, Message, Notification } from "../types/match";

interface MatchState {
  matches: Match[];
  messages: Message[];
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
}

interface MatchContextType extends MatchState {
  // Match actions
  createMatch: (
    buyerId: string,
    sellerId: string,
    businessId?: string
  ) => Promise<void>;
  updateMatchStatus: (
    matchId: string,
    status: Match["status"]
  ) => Promise<void>;
  updateDealStage: (
    matchId: string,
    stage: Match["dealStage"]
  ) => Promise<void>;

  // Message actions
  sendMessage: (
    matchId: string,
    content: string,
    type?: Message["type"]
  ) => Promise<void>;
  markMessageAsRead: (messageId: string) => Promise<void>;
  markAllMessagesAsRead: (matchId: string, userId: string) => Promise<void>;

  // Notification actions
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  markAllNotificationsAsRead: (userId: string) => Promise<void>;
  createNotification: (
    notification: Omit<Notification, "id" | "createdAt">
  ) => Promise<void>;

  // Utility functions
  getMatchById: (matchId: string) => Match | undefined;
  getMatchesByUser: (userId: string) => Match[];
  getMessagesByMatch: (matchId: string) => Message[];
  getUnreadNotifications: (userId: string) => Notification[];
  getUnreadCount: (userId: string) => number;
}

type MatchAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_MATCHES"; payload: Match[] }
  | { type: "ADD_MATCH"; payload: Match }
  | {
      type: "UPDATE_MATCH";
      payload: { matchId: string; updates: Partial<Match> };
    }
  | { type: "SET_MESSAGES"; payload: Message[] }
  | { type: "ADD_MESSAGE"; payload: Message }
  | {
      type: "UPDATE_MESSAGE";
      payload: { messageId: string; updates: Partial<Message> };
    }
  | { type: "SET_NOTIFICATIONS"; payload: Notification[] }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | {
      type: "UPDATE_NOTIFICATION";
      payload: { notificationId: string; updates: Partial<Notification> };
    };

const initialState: MatchState = {
  matches: [],
  messages: [],
  notifications: [],
  isLoading: false,
  error: null,
};

const matchReducer = (state: MatchState, action: MatchAction): MatchState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };

    case "SET_MATCHES":
      return { ...state, matches: action.payload };

    case "ADD_MATCH":
      return {
        ...state,
        matches: [action.payload, ...state.matches],
      };

    case "UPDATE_MATCH":
      return {
        ...state,
        matches: state.matches.map((match) =>
          match.id === action.payload.matchId
            ? { ...match, ...action.payload.updates }
            : match
        ),
      };

    case "SET_MESSAGES":
      return { ...state, messages: action.payload };

    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case "UPDATE_MESSAGE":
      return {
        ...state,
        messages: state.messages.map((message) =>
          message.id === action.payload.messageId
            ? { ...message, ...action.payload.updates }
            : message
        ),
      };

    case "SET_NOTIFICATIONS":
      return { ...state, notifications: action.payload };

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };

    case "UPDATE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload.notificationId
            ? { ...notification, ...action.payload.updates }
            : notification
        ),
      };

    default:
      return state;
  }
};

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const MatchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(matchReducer, initialState);

  // Initialize mock data
  useEffect(() => {
    dispatch({ type: "SET_MATCHES", payload: mockMatches });
    dispatch({ type: "SET_MESSAGES", payload: mockMessages });
    dispatch({ type: "SET_NOTIFICATIONS", payload: mockNotifications });
  }, []);

  // Match actions
  const createMatch = async (
    buyerId: string,
    sellerId: string,
    businessId?: string
  ): Promise<void> => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      // In a real app, this would be an API call
      const newMatch: Match = {
        id: `match-${Date.now()}`,
        buyerId,
        sellerId,
        businessId,
        status: "active",
        createdAt: new Date(),
        lastActivity: new Date(),
        buyer: {
          id: buyerId,
          firstName: "John", // Would come from API
          lastName: "Doe",
          avatar: "JD",
        },
        seller: {
          id: sellerId,
          firstName: "Jane",
          lastName: "Smith",
          avatar: "JS",
        },
        unreadCount: {
          buyer: 0,
          seller: 1,
        },
        dealStage: "initial-contact",
        matchScore: 85,
        matchReasons: ["Great fit based on preferences"],
        mutualInterests: ["Technology", "SaaS"],
      };

      dispatch({ type: "ADD_MATCH", payload: newMatch });

      // Create system message
      const systemMessage: Message = {
        id: `msg-${Date.now()}`,
        matchId: newMatch.id,
        senderId: "system",
        receiverId: "",
        content: "You've been matched! Start the conversation below.",
        timestamp: new Date(),
        type: "system",
        systemData: {
          type: "match-created",
          data: {},
        },
      };

      dispatch({ type: "ADD_MESSAGE", payload: systemMessage });

      // Create notifications for both parties
      const buyerNotification: Notification = {
        id: `notif-buyer-${Date.now()}`,
        userId: buyerId,
        type: "match-created",
        title: "New Match!",
        message:
          "You've been matched with a seller. Start the conversation now!",
        icon: "🤝",
        createdAt: new Date(),
        actionUrl: `/matches/${newMatch.id}`,
        matchId: newMatch.id,
        priority: "high",
      };

      const sellerNotification: Notification = {
        id: `notif-seller-${Date.now()}`,
        userId: sellerId,
        type: "match-created",
        title: "New Match!",
        message: "A qualified buyer is interested in your business!",
        icon: "🎉",
        createdAt: new Date(),
        actionUrl: `/matches/${newMatch.id}`,
        matchId: newMatch.id,
        priority: "high",
      };

      dispatch({ type: "ADD_NOTIFICATION", payload: buyerNotification });
      dispatch({ type: "ADD_NOTIFICATION", payload: sellerNotification });

      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to create match" });
    }
  };

  const updateMatchStatus = async (
    matchId: string,
    status: Match["status"]
  ): Promise<void> => {
    try {
      dispatch({
        type: "UPDATE_MATCH",
        payload: {
          matchId,
          updates: { status, lastActivity: new Date() },
        },
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to update match status" });
    }
  };

  const updateDealStage = async (
    matchId: string,
    stage: Match["dealStage"]
  ): Promise<void> => {
    try {
      dispatch({
        type: "UPDATE_MATCH",
        payload: {
          matchId,
          updates: { dealStage: stage, lastActivity: new Date() },
        },
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to update deal stage" });
    }
  };

  // Message actions
  const sendMessage = async (
    matchId: string,
    content: string,
    attachments?: any,
    type: Message["type"] = "text"
  ): Promise<void> => {
    try {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        matchId,
        senderId: "current-user", // Would come from auth context
        receiverId: "other-user", // Would be determined from match
        content,
        timestamp: new Date(),
        type: attachments && attachments.length > 0 ? "file" : type,
        attachments: attachments || undefined,
      };

      dispatch({ type: "ADD_MESSAGE", payload: newMessage });

      // Update match last activity
      dispatch({
        type: "UPDATE_MATCH",
        payload: {
          matchId,
          updates: {
            lastActivity: new Date(),
            lastMessage: {
              id: newMessage.id,
              content,
              timestamp: newMessage.timestamp,
              senderId: newMessage.senderId,
              type,
            },
          },
        },
      });

      // Create notification for receiver
      const notification: Notification = {
        id: `notif-${Date.now()}`,
        userId: "other-user", // Would be determined from match
        type: "new-message",
        title: "New message",
        message:
          content.substring(0, 100) + (content.length > 100 ? "..." : ""),
        icon: "💬",
        createdAt: new Date(),
        actionUrl: `/matches/${matchId}`,
        matchId,
        messageId: newMessage.id,
        senderId: newMessage.senderId,
        priority: "medium",
      };

      dispatch({ type: "ADD_NOTIFICATION", payload: notification });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to send message" });
    }
  };

  const markMessageAsRead = async (messageId: string): Promise<void> => {
    try {
      dispatch({
        type: "UPDATE_MESSAGE",
        payload: {
          messageId,
          updates: { readAt: new Date() },
        },
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to mark message as read",
      });
    }
  };

  const markAllMessagesAsRead = async (
    matchId: string,
    userId: string
  ): Promise<void> => {
    try {
      const matchMessages = state.messages.filter(
        (msg) =>
          msg.matchId === matchId && msg.receiverId === userId && !msg.readAt
      );

      matchMessages.forEach((message) => {
        dispatch({
          type: "UPDATE_MESSAGE",
          payload: {
            messageId: message.id,
            updates: { readAt: new Date() },
          },
        });
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to mark messages as read",
      });
    }
  };

  // Notification actions
  const markNotificationAsRead = async (
    notificationId: string
  ): Promise<void> => {
    try {
      dispatch({
        type: "UPDATE_NOTIFICATION",
        payload: {
          notificationId,
          updates: { readAt: new Date() },
        },
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to mark notification as read",
      });
    }
  };

  const markAllNotificationsAsRead = async (userId: string): Promise<void> => {
    try {
      const userNotifications = state.notifications.filter(
        (notif) => notif.userId === userId && !notif.readAt
      );

      userNotifications.forEach((notification) => {
        dispatch({
          type: "UPDATE_NOTIFICATION",
          payload: {
            notificationId: notification.id,
            updates: { readAt: new Date() },
          },
        });
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to mark notifications as read",
      });
    }
  };

  const createNotification = async (
    notification: Omit<Notification, "id" | "createdAt">
  ): Promise<void> => {
    try {
      const newNotification: Notification = {
        ...notification,
        id: `notif-${Date.now()}`,
        createdAt: new Date(),
      };

      dispatch({ type: "ADD_NOTIFICATION", payload: newNotification });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to create notification" });
    }
  };

  // Utility functions
  const getMatchById = (matchId: string): Match | undefined => {
    return state.matches.find((match) => match.id === matchId);
  };

  const getMatchesByUser = (userId: string): Match[] => {
    return state.matches.filter(
      (match) => match.buyerId === userId || match.sellerId === userId
    );
  };

  const getMessagesByMatch = (matchId: string): Message[] => {
    return state.messages
      .filter((message) => message.matchId === matchId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  const getUnreadNotifications = (userId: string): Notification[] => {
    return state.notifications.filter(
      (notif) => notif.userId === userId && !notif.readAt
    );
  };

  const getUnreadCount = (userId: string): number => {
    return getUnreadNotifications(userId).length;
  };

  const value: MatchContextType = {
    ...state,
    createMatch,
    updateMatchStatus,
    updateDealStage,
    sendMessage,
    markMessageAsRead,
    markAllMessagesAsRead,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    createNotification,
    getMatchById,
    getMatchesByUser,
    getMessagesByMatch,
    getUnreadNotifications,
    getUnreadCount,
  };

  return (
    <MatchContext.Provider value={value}>{children}</MatchContext.Provider>
  );
};

export const useMatch = (): MatchContextType => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error("useMatch must be used within a MatchProvider");
  }
  return context;
};

export default MatchContext;
