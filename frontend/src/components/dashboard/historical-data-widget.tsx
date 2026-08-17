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
import { Edit, Trash2, Save, Loader2 } from "lucide-react";

interface CropOutcome {
  _id?: string;
  cropType: string;
  yield?: number;
  fertilizerUsed?: string;
  sowingDate?: string;
  harvestDate?: string;
  status?: string;
  lastFertilizingDate?: string;
  lastPestDate?: string;
}

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

export function HistoricalDataWidget() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("AppContext must be used within AppContextProvider");

  const { token } = context;
  const [data, setData] = useState<CropOutcome[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<CropOutcome>({ cropType: "" });

  useEffect(() => {
    if (!token) return;
    const fetchCrops = async () => {
      try {
        const res = await api.get("/crops", authHeaders(token));
        // Sirf kati hui fasal. Chal rahi fasal Crop Tracker me dikhti hai.
        setData(
          res.data.filter(
            (c: CropOutcome) => c.status === "harvested" || c.status === "failed"
          )
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, [token]);

  const handleSaveEdit = async (id: string) => {
    if (!token) return;
    try {
      // Sirf editable fields bhejo - baaki backend pe waise ke waise rahenge
      const payload = {
        cropType: editingData.cropType,
        fertilizerUsed: editingData.fertilizerUsed,
        yield: editingData.yield,
      };
      const res = await api.put(`/crops/${id}`, payload, authHeaders(token));
      const updated = res.data.crop ?? res.data;
      setData((prev) => prev.map((c) => (c._id === id ? updated : c)));
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
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-green-700">
            🌾 Harvest Records
          </CardTitle>
          <CardDescription className="text-gray-600">
            Crops you have already harvested, with their final yield.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading…
            </div>
          ) : data.length === 0 ? (
            <div className="rounded-lg border border-dashed border-green-200 p-8 text-center">
              <p className="font-medium text-gray-700">No harvest records yet</p>
              <p className="mt-1 text-sm text-gray-500">
                Add a crop in the Crop Tracker above. Once you mark it harvested,
                it will appear here with its yield.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-green-100">
              <Table>
                <TableHeader className="bg-green-100">
                  <TableRow>
                    <TableHead>Crop</TableHead>
                    <TableHead>Sown</TableHead>
                    <TableHead>Harvested</TableHead>
                    <TableHead>Fertilizer</TableHead>
                    <TableHead>Yield (kg/ha)</TableHead>
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
                      <TableCell className="capitalize">
                        {editingId === crop._id ? (
                          <Input
                            value={editingData.cropType || ""}
                            onChange={(e) =>
                              setEditingData({ ...editingData, cropType: e.target.value })
                            }
                          />
                        ) : (
                          <>
                            {crop.cropType}
                            {crop.status === "failed" && (
                              <span className="ml-2 rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-700">
                                failed
                              </span>
                            )}
                          </>
                        )}
                      </TableCell>

                      <TableCell>{fmtDate(crop.sowingDate)}</TableCell>
                      <TableCell>{fmtDate(crop.harvestDate)}</TableCell>

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
                          crop.fertilizerUsed ?? "—"
                        )}
                      </TableCell>

                      {/* Yield */}
                      <TableCell>
                        {editingId === crop._id ? (
                          <Input
                            type="number"
                            value={editingData.yield ?? ""}
                            onChange={(e) =>
                              setEditingData({
                                ...editingData,
                                yield: e.target.value ? Number(e.target.value) : undefined,
                              })
                            }
                          />
                        ) : (
                          crop.yield?.toLocaleString() ?? "—"
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