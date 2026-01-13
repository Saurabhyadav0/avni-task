import {
  Link as LinkIcon,
  MessageCircle,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ShareModal = ({ fileId, fileName, onClose }) => {
  const shareLink = `${window.location.origin}/file/${fileId}`;
  const shareText = `Check out this file: ${fileName}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard!");
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      shareText + " " + shareLink
    )}`;
    window.open(url, "_blank");
  };

  const handleEmail = () => {
    const subject = `Shared File: ${fileName}`;
    const body = `Hi,\n\nI wanted to share this file with you: ${fileName}\n\nView it here: ${shareLink}`;
    window.open(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share File</DialogTitle>
          <DialogDescription>
            Share <span className="font-semibold">{fileName}</span> with others.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={shareLink}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-center gap-4 py-4">
          <Button variant="outline" className="flex-1 flex flex-col items-center gap-2 h-20" onClick={handleWhatsApp}>
            <MessageCircle className="h-6 w-6 text-green-600" />
            <span className="text-xs">WhatsApp</span>
          </Button>
          <Button variant="outline" className="flex-1 flex flex-col items-center gap-2 h-20" onClick={handleEmail}>
            <Mail className="h-6 w-6 text-blue-600" />
            <span className="text-xs">Email</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
