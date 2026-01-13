import { useEffect, useState } from "react";
import api from "../utils/api";
import { Users, File as FileIcon } from "lucide-react";
import FileList from "../components/FileList";
import toast from "react-hot-toast";

export default function SharedWithMe() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSharedFiles();
    }, []);

    const fetchSharedFiles = async () => {
        try {
            const { data } = await api.get("/api/files/shared");
            setFiles(data);
        } catch (error) {
            console.error("Error fetching shared files:", error);
            toast.error("Failed to load shared files");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-8 space-y-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Shared with me</h1>
                    <p className="text-muted-foreground">
                        Files that other users have shared with you
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
                    ))}
                </div>
            ) : files.length > 0 ? (
                <FileList files={files} setFiles={setFiles} />
            ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-xl">
                    <div className="p-4 bg-muted rounded-full mb-4">
                        <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No files shared with you</h3>
                    <p className="text-muted-foreground max-w-sm mt-2">
                        When someone shares a file with you, it will appear here.
                    </p>
                </div>
            )}
        </div>
    );
}
