"use client";
import React, { useState, useEffect, useContext } from "react";
import { api } from "@/lib/cropapi";
import { AppContext } from "@/app/context/appcontext";
import { motion } from "framer-motion";
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
import { PlusCircle, XCircle, Edit, Trash2, Save } from "lucide-react";

interface CropOutcome {
  _id?: string;
  cropType: string;
  fertilizerUsed: string;
  yield: number;
  lastFertilizingDate?: string;
  lastPestDate?: string;
}

export function HistoricalDataWidget() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("AppContext must be used within AppContextProvider");

  const { token } = context;
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
    try {
      const res = await api.post("/crops", formData, authHeaders(token));
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

  const handleSaveEdit = async (id: string) => {
    if (!token) return;
    try {
      const res = await api.put(`/crops/${id}`, editingData, authHeaders(token));
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
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 sm:p-6"
    >
      <Card className="shadow-xl border border-green-200 bg-gradient-to-br from-green-50 to-white">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-2xl font-semibold text-green-700">
              🌾 Historical Crop Data
            </CardTitle>
            <CardDescription className="text-gray-600">
              Review and manage your past crop performance with style.
            </CardDescription>
          </div>
          <Button
            onClick={() => setShowForm((prev) => !prev)}
            className={`flex items-center gap-2 ${
              showForm
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {showForm ? <XCircle size={18} /> : <PlusCircle size={18} />}
            {showForm ? "Cancel" : "Add Crop"}
          </Button>
        </CardHeader>

        <CardContent>
          {/* Add Crop Form */}
          {showForm && (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
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
                type="number"
                placeholder="Yield (kg/ha)"
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
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Save size={18} className="mr-2" />
                Save Crop
              </Button>
            </motion.form>
          )}

          {/* Table */}
          {data.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              No crops added yet. Start by adding one 🌱
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-green-100">
              <Table>
                <TableHeader className="bg-green-100">
                  <TableRow>
                    <TableHead>Crop</TableHead>
                    <TableHead>Fertilizer</TableHead>
                    <TableHead>Yield (kg/ha)</TableHead>
                    <TableHead>Last Fertilizing</TableHead>
                    <TableHead>Last Pest Control</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.map((crop) => (
                    <motion.tr
                      key={crop._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-green-50 transition-colors"
                    >
                      {/* Crop Type */}
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
                      <TableCell>
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

                      {/* Dates */}
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
                      <TableCell className="text-center">
                        {editingId === crop._id ? (
                          <div className="flex justify-center gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleSaveEdit(crop._id!)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Save size={16} className="mr-1" /> Save
                            </Button>
                            <Button
                              size="sm"
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
                              onClick={() => {
                                setEditingId(crop._id!);
                                setEditingData(crop);
                              }}
                            >
                              <Edit size={16} className="mr-1" /> Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(crop._id!)}
                            >
                              <Trash2 size={16} className="mr-1" /> Delete
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
