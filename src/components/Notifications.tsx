// src/components/Notifications.tsx

import React, { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import styles from "../styles/Notifications.module.css";

const Notifications: React.FC = () => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<string[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const notificationsEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (session) {
      ws.current = new WebSocket(`ws://${window.location.host}/api/notifications`);

      ws.current.onopen = () => {
        console.log('WebSocket connection established for notifications');
      };

      ws.current.onmessage = (event) => {
        setNotifications((prev) => [...prev, event.data]);
      };

      ws.current.onclose = () => {
        console.log('WebSocket connection closed for notifications');
      };

      return () => {
        ws.current?.close();
      };
    }
  }, [session]);

  useEffect(() => {
    notificationsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [notifications]);

  if (!session) return null;

  return (
    <div className={styles.notificationsContainer}>
      <h3>通知</h3>
      <div className={styles.notifications}>
        {notifications.map((note, idx) => (
          <div key={idx} className={styles.notification}>
            {note}
          </div>
        ))}
        <div ref={notificationsEndRef} />
      </div>
    </div>
  );
};

export default Notifications;
