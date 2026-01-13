import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Trash2, Users, FileText, ArrowUpRight } from "lucide-react";
import api from "../utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [stats, setStats] = useState({ totalFiles: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "admin") {
      toast.error("Access Denied");
      navigate("/");
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const filesRes = await api.get("/api/admin/all-files");
      const statsRes = await api.get("/api/admin/stats");
      setFiles(filesRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Error fetching admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Admin Action: Delete this file permanently?")) return;
    try {
      await api.delete(`/api/files/${id}`);
      toast.success("File deleted by Admin");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-xl font-semibold text-muted-foreground">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Active platform users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFiles}</div>
            <p className="text-xs text-muted-foreground">Uploaded across all users</p>
          </CardContent>
        </Card>
      </div>

      {/* All Files Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Files</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file._id}>
                  <TableCell className="font-medium">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 hover:underline text-primary"
                    >
                      {file.name}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell>{file.owner?.email || "Unknown"}</TableCell>
                  <TableCell>{(file.size / 1024).toFixed(1)} KB</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(file._id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
