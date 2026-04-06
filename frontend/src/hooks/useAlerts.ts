import { useState } from "react";
import type { Alert } from "../types/price";

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  const addAlert = (
    symbol: string,
    targetPrice: number,
    condition: "above" | "below",
  ) => {
    const alert: Alert = {
      id: crypto.randomUUID(),
      symbol,
      targetPrice,
      condition,
      triggered: false,
    };
    setAlerts((prev) => [...prev, alert]);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const checkAlerts = (symbol: string, price: number) => {
    setAlerts((prev) =>
      prev.map((alert) => {
        if (alert.triggered || alert.symbol !== symbol) return alert;

        const triggered =
          alert.condition === "above"
            ? price >= alert.targetPrice
            : price <= alert.targetPrice;

        if (triggered) {
          const message = `🔔 ${symbol} is ${alert.condition} $${alert.targetPrice}`;
          setNotifications((n) => [...n, message]);
          setTimeout(() => {
            setNotifications((n) => n.filter((msg) => msg !== message));
          }, 5000); // auto dismiss after 5s
        }

        return triggered ? { ...alert, triggered: true } : alert;
      }),
    );
  };

  const dismissNotification = (message: string) => {
    setNotifications((prev) => prev.filter((n) => n !== message));
  };

  return {
    alerts,
    notifications,
    addAlert,
    removeAlert,
    checkAlerts,
    dismissNotification,
  };
};
