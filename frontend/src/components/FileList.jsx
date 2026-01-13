import { useState } from "react";
import {
  MoreVertical,
  Trash2,
  Share2,
  Eye,
  Download,
  FileText,
  Music,
  Video,
  Image as ImageIcon,
  File as FileIcon,
} from "lucide-react";
import AccessModal from "./AccessModal";
import ShareModal from "./ShareModal";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FileList = ({ files, onDelete }) => {
  const [accessModalFileId, setAccessModalFileId] = useState(null);
  const [shareModalFile, setShareModalFile] = useState(null);

  const getFileFormat = (filename) => {
    if (!filename) return "FILE";
    return filename.split(".").pop().toUpperCase();
  };

  const getFileSize = (size) => {
    if (!size) return "";
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
    return (size / (1024 * 1024)).toFixed(1) + " MB";
  };

  const renderIcon = (type) => {
    if (type.startsWith("image/")) return <ImageIcon className="h-8 w-8 text-blue-500" />;
    if (type.startsWith("video/")) return <Video className="h-8 w-8 text-purple-500" />;
    if (type.startsWith("audio/")) return <Music className="h-8 w-8 text-pink-500" />;
    if (type.includes("pdf")) return <FileText className="h-8 w-8 text-red-500" />;
    return <FileIcon className="h-8 w-8 text-gray-500" />;
  };

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <FileIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No files uploaded</h3>
        <p className="text-muted-foreground mt-1">
          Upload your first file to get started
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {files.map((file) => (
          <Card key={file._id} className="group overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-0">
              <div className="relative aspect-video flex items-center justify-center bg-muted/30 group-hover:bg-muted/50 transition-colors">
                {file.type.startsWith("image/") && !file.type.includes("svg") ? (
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                ) : (
                  renderIcon(file.type)
                )}
                {/* Overlay for quick actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a href={file.url} target="_blank" rel="noreferrer">
                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href={file.url} download>
                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                      <Download className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-3 flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-2">
                <p className="text-sm font-medium truncate" title={file.name}>{file.name}</p>
                <p className="text-xs text-muted-foreground">{getFileSize(file.size)} • {getFileFormat(file.name)}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setAccessModalFileId(file._id)}>
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onDelete(file._id)} className="text-destructive focus:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>

      {accessModalFileId && (
        <AccessModal
          fileId={accessModalFileId}
          onClose={() => setAccessModalFileId(null)}
        />
      )}

      {shareModalFile && (
        <ShareModal
          fileId={shareModalFile._id}
          fileName={shareModalFile.name}
          onClose={() => setShareModalFile(null)}
        />
      )}
    </>
  );
};

export default FileList;
