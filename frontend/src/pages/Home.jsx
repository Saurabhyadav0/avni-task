import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import api from "../utils/api";

const Home = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const { data } = await api.get("/api/files/myfiles");
      setFiles(data);
    } catch (error) {
      console.error("Error fetching files");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    try {
      await api.delete(`/api/files/${id}`);
      toast.success("File deleted");
      fetchFiles();
    } catch (error) {
      toast.error("Failed to delete file");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Files</h1>
          <p className="text-muted-foreground">Manage and share your documents.</p>
        </div>
        <FileUpload onUploadSuccess={fetchFiles} />
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 min-h-[400px]">
        <FileList files={files} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Home;
