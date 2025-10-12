"use client";
import React, { useState, useEffect, useContext } from "react";
import { api } from "@/lib/cropapi";
import { AppContext } from "@/app/context/appcontext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authHeaders } from "@/lib/api";

interface CropOutcome {
  _id?: string;
  cropType: string;
  fertilizerUsed: string;
  yield: number;
  lastFertilizingDate?: string; // ✅ added
  lastPestDate?: string; // ✅ added
}

export function HistoricalDataWidget() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("AppContext must be used within AppContextProvider");

  const { token, name } = context;
  const [data, setData] = useState<CropOutcome[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CropOutcome>({
    cropType: "",
    fertilizerUsed: "",
    yield: 0,
    lastFertilizingDate: "",
    lastPestDate: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<CropOutcome>({
    cropType: "",
    fertilizerUsed: "",
    yield: 0,
    lastFertilizingDate: "",
    lastPestDate: "",
  });

  useEffect(() => {
    if (!token) return;
    const fetchCrops = async () => {
      try {
        const res = await api.get("/crops", authHeaders(token));
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCrops();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!formData.cropType || !formData.fertilizerUsed || !formData.yield)
      return;

    try {
      const res = await api.post("/crops", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prev) => [res.data, ...prev]);
      setFormData({
        cropType: "",
        fertilizerUsed: "",
        yield: 0,
        lastFertilizingDate: "",
        lastPestDate: "",
      });
      setShowForm(false);
    } catch (err) {
      console.error("Error adding crop:", err);
    }
  };

  const handleEditClick = (crop: CropOutcome) => {
    setEditingId(crop._id!);
    setEditingData({
      cropType: crop.cropType,
      fertilizerUsed: crop.fertilizerUsed,
      yield: crop.yield,
      lastFertilizingDate: crop.lastFertilizingDate || "",
      lastPestDate: crop.lastPestDate || "",
    });
  };

  const handleSaveEdit = async (id: string) => {
    if (!token) return;
    try {
      const res = await api.put(
        `/crops/${id}`,
        editingData,
        authHeaders(token)
      );
      setData((prev) => prev.map((c) => (c._id === id ? res.data : c)));
      setEditingId(null);
    } catch (err) {
      console.error("Error updating crop:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await api.delete(`/crops/${id}`, authHeaders(token));
      setData((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting crop:", err);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <CardTitle>Historical Crop Data</CardTitle>
          <CardDescription>
            A look at past performance in similar conditions.
          </CardDescription>
        </div>
        <Button onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Cancel" : "Add New Crop"}
        </Button>
      </CardHeader>

      <CardContent>
        {/* Add Crop Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-4 space-y-3">
            <Input
              placeholder="Crop Type"
              value={formData.cropType}
              onChange={(e) =>
                setFormData({ ...formData, cropType: e.target.value })
              }
              required
            />
            <Input
              placeholder="Fertilizer Used"
              value={formData.fertilizerUsed}
              onChange={(e) =>
                setFormData({ ...formData, fertilizerUsed: e.target.value })
              }
              required
            />
            <Input
              placeholder="Yield (kg/ha)"
              type="number"
              value={formData.yield || ""}
              onChange={(e) =>
                setFormData({ ...formData, yield: Number(e.target.value) })
              }
              required
            />
            <Input
              type="date"
              value={formData.lastFertilizingDate || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lastFertilizingDate: e.target.value,
                })
              }
              required
            />
            <Input
              type="date"
              value={formData.lastPestDate || ""}
              onChange={(e) =>
                setFormData({ ...formData, lastPestDate: e.target.value })
              }
              required
            />
            <Button type="submit" className="w-full">
              Save Crop
            </Button>
          </form>
        )}

        {/* Crop Table */}
        {data.length === 0 ? (
          <p>No crops added yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Fertilizer</TableHead>
                <TableHead className="text-right">Field (acres)</TableHead>
                <TableHead>Last Fertilizing</TableHead>
                <TableHead>Last Pest Control</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((crop) => (
                <TableRow key={crop._id}>
                  {/* Crop */}
                  {/* Crop */}
                  <TableCell>
                    {editingId === crop._id ? (
                      <Input
                        value={editingData.cropType || ""}
                        onChange={(e) =>
                          setEditingData({
                            ...editingData,
                            cropType: e.target.value,
                          })
                        }
                      />
                    ) : (
                      crop.cropType
                    )}
                  </TableCell>

                  {/* Fertilizer */}
                  <TableCell>
                    {editingId === crop._id ? (
                      <Input
                        value={editingData.fertilizerUsed || ""}
                        onChange={(e) =>
                          setEditingData({
                            ...editingData,
                            fertilizerUsed: e.target.value,
                          })
                        }
                      />
                    ) : (
                      crop.fertilizerUsed
                    )}
                  </TableCell>

                  {/* Yield */}
                  <TableCell className="text-right">
                    {editingId === crop._id ? (
                      <Input
                        type="number"
                        value={editingData.yield || ""}
                        onChange={(e) =>
                          setEditingData({
                            ...editingData,
                            yield: Number(e.target.value),
                          })
                        }
                      />
                    ) : (
                      crop.yield.toLocaleString()
                    )}
                  </TableCell>

                  {/* Last Fertilizing Date */}
                  <TableCell>
                    {editingId === crop._id ? (
                      <Input
                        type="date"
                        value={editingData.lastFertilizingDate || ""}
                        onChange={(e) =>
                          setEditingData({
                            ...editingData,
                            lastFertilizingDate: e.target.value,
                          })
                        }
                      />
                    ) : crop.lastFertilizingDate ? (
                      new Date(crop.lastFertilizingDate).toLocaleDateString()
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  {/* Last Pest Date */}
                  <TableCell>
                    {editingId === crop._id ? (
                      <Input
                        type="date"
                        value={editingData.lastPestDate || ""}
                        onChange={(e) =>
                          setEditingData({
                            ...editingData,
                            lastPestDate: e.target.value,
                          })
                        }
                      />
                    ) : crop.lastPestDate ? (
                      new Date(crop.lastPestDate).toLocaleDateString()
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    {editingId === crop._id ? (
                      <div className="flex justify-center gap-2">
                        <Button
                          size="sm"
                          className="w-20"
                          onClick={() => handleSaveEdit(crop._id!)}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          className="w-20"
                          variant="secondary"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-2">
                        <Button
                          size="sm"
                          className="w-20"
                          onClick={() => handleEditClick(crop)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="w-20"
                          variant="destructive"
                          onClick={() => handleDelete(crop._id!)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
