import React, { createContext, useContext } from 'react';
import { notification } from 'antd';

// Define types for notification context
type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationContextProps {
    showNotification: (type: NotificationType, message: string, description: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<Element> = ({ children }: any) => {
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

export const useNotification = (): NotificationContextProps => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
