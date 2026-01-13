import { useState, useEffect } from "react";
import { Bell, Check } from "lucide-react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get("/api/notifications");
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications");
    }
  };

  const handleRead = async (notif) => {
    try {
      if (!notif.read) {
        await api.put(`/api/notifications/${notif._id}/read`);
        setNotifications((prev) =>
          prev.map((n) => (n._id === notif._id ? { ...n, read: true } : n))
        );
      }
      if (notif.file) {
        navigate(`/file/${notif.file._id}`);
      }
    } catch (error) {
      console.error("Error reading notification");
    }
  };

  const handleMarkAllRead = async (e) => {
    e.preventDefault();
    if (notifications.every((n) => n.read)) return;
    try {
      await api.put("/api/notifications/mark-read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      toast.success("All marked as read");
    } catch (error) {
      toast.error("Failed to mark all as read");
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-destructive border-2 border-background" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-primary"
              onClick={handleMarkAllRead}
            >
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No notifications
            </div>
          ) : (
            notifications.map((notif) => (
              <DropdownMenuItem
                key={notif._id}
                onClick={() => handleRead(notif)}
                className={cn(
                  "flex flex-col items-start gap-1 p-3 cursor-pointer",
                  !notif.read && "bg-muted/50"
                )}
              >
                <div className="flex w-full justify-between gap-2">
                  <span className={cn("text-sm font-medium leading-none", !notif.read && "text-primary")}>
                    {notif.message}
                  </span>
                  {!notif.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(notif.createdAt).toLocaleDateString()}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
