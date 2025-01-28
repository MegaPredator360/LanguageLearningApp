import React, { createContext, useContext, ReactNode } from 'react';
import { notification } from 'antd';

// Define types for notification context
type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationContextProps {
    showNotification: (type: NotificationType, message: string, description: string) => void;
}

// Define the context
const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

interface NotificationProviderProps {
    children: ReactNode; // Accept any valid React children (single or multiple)
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();

    const showNotification = (type: NotificationType, message: string, description: string) => {
        api[type]({
            message,
            description,
        });
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};

// Hook for consuming the notification context
export const useNotification = (): NotificationContextProps => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
