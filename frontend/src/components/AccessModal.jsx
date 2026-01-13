import { useEffect, useState } from "react";
import {
  Globe,
  Lock,
  Link as LinkIcon,
  X,
  User,
} from "lucide-react";
import api from "../utils/api";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const AccessModal = ({ fileId, onClose }) => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("view");
  const [loading, setLoading] = useState(false);

  // General Access States
  const [accessType, setAccessType] = useState("restricted");
  const [publicPermission, setPublicPermission] = useState("view");

  useEffect(() => {
    fetchFileDetails();
  }, [fileId]);

  const fetchFileDetails = async () => {
    try {
      const { data } = await api.get(`/api/files/${fileId}`);
      setFile(data.file);
      setAccessType(data.file.accessType || "restricted");
      setPublicPermission(data.file.publicPermission || "view");
    } catch (error) {
      console.error("Error fetching file details");
      toast.error("Failed to load access details");
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      setLoading(true);
      await api.post(`/api/files/${fileId}/share`, { email, role: inviteRole });
      toast.success(`Access granted to ${email}`);
      setEmail("");
      fetchFileDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to share");
    } finally {
      setLoading(false);
    }
  };

  const handleGeneralAccessChange = async (newType, newPermission) => {
    setAccessType(newType);
    if (newPermission) setPublicPermission(newPermission);

    try {
      await api.put(`/api/files/${fileId}/access`, {
        accessType: newType,
        publicPermission: newPermission || publicPermission,
      });
      toast.success("General access updated");
    } catch (error) {
      toast.error("Failed to update access");
      fetchFileDetails();
    }
  };

  const handlePermissionChange = async (userId, newRole) => {
    try {
      await api.put(`/api/files/${fileId}/manage-access`, {
        userId,
        role: newRole,
      });

      if (newRole === "remove") {
        toast.success("Access removed");
      } else {
        toast.success("Permission updated");
      }

      fetchFileDetails();
    } catch (error) {
      toast.error("Failed to update permission");
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/file/${fileId}`);
    toast.success("Link copied!");
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Share "{file?.name}"</DialogTitle>
          <DialogDescription>
            Manage who has access to this file.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invite Section */}
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Add people by email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger className="w-[110px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">Viewer</SelectItem>
                  <SelectItem value="edit">Editor</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleShare} disabled={loading}>
                {loading ? "..." : "Share"}
              </Button>
            </div>
          </div>

          {/* People with access */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">People with access</h4>
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-4">
                {/* Owner */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">You (Owner)</p>
                      <p className="text-xs text-muted-foreground">k@gmail.com</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">Owner</span>
                </div>

                {/* Shared Users */}
                {file?.sharedWith?.map((share) => (
                  share.user && (
                    <div key={share.user._id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{share.user.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">{share.user.name}</p>
                          <p className="text-xs text-muted-foreground">{share.user.email}</p>
                        </div>
                      </div>
                      <Select
                        value={share.role}
                        onValueChange={(val) => handlePermissionChange(share.user._id, val)}
                      >
                        <SelectTrigger className="w-[100px] h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="view">Viewer</SelectItem>
                          <SelectItem value="edit">Editor</SelectItem>
                          <SelectItem value="remove" className="text-destructive">Remove</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* General Access */}
          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-sm font-medium">General access</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-muted p-2 rounded-full">
                  {accessType === 'public' ? <Globe className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                </div>
                <div>
                  <Select value={accessType} onValueChange={(val) => handleGeneralAccessChange(val)}>
                    <SelectTrigger className="w-[180px] h-8 border-none shadow-none font-medium p-0 justify-start">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restricted">Restricted</SelectItem>
                      <SelectItem value="public">Anyone with the link</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {accessType === 'restricted' ? "Only people with access can can open with the link" : "Anyone on the internet with the link can view"}
                  </p>
                </div>
              </div>
              {accessType === 'public' && (
                <Select value={publicPermission} onValueChange={(val) => handleGeneralAccessChange('public', val)}>
                  <SelectTrigger className="w-[100px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="view">Viewer</SelectItem>
                    <SelectItem value="edit">Editor</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" className="gap-2" onClick={copyLink}>
            <LinkIcon className="h-4 w-4" /> Copy Link
          </Button>
          <Button onClick={onClose}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccessModal;
