"use client";

import React, { useState, useEffect, useContext, useCallback } from "react";
import { api } from "@/lib/cropapi";
import { authHeaders } from "@/lib/api";
import { AppContext } from "@/app/context/appcontext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  Check,
  AlertTriangle,
  Sprout,
  Loader2,
  X,
  Wheat,
} from "lucide-react";

// ── types (backend ke response se match) ─────────────────────────

type Bilingual = { en: string; hi: string };

type CalendarAction = {
  key: string;
  critical: boolean;
  title: Bilingual;
  detail: Bilingual;
  stageName?: Bilingual;
  daysOffset: number;
};

type Tracking = {
  daysSinceSowing: number;
  progressPercent: number;
  status: "growing" | "not_sown" | "overdue_harvest";
  stage: { key: string; name: Bilingual } | null;
  dueActions: CalendarAction[];
  upcomingActions: CalendarAction[];
  overdueActions: CalendarAction[];
};

type Crop = {
  _id: string;
  cropType: string;
  cropKey?: string;
  sowingDate: string;
  area?: number;
  status: "growing" | "harvested" | "failed";
  trackingSupported?: boolean;
  tracking: Tracking | null;
};

type SupportedCrop = {
  key: string;
  displayName: Bilingual;
  durationDays: number;
};

// ── helpers ──────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── action row ───────────────────────────────────────────────────

function ActionRow({
  action,
  overdue,
  onDone,
  busy,
}: {
  action: CalendarAction;
  overdue?: boolean;
  onDone: (key: string) => void;
  busy: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-lg border p-3 ${
        overdue
          ? "border-destructive/40 bg-destructive/5"
          : action.critical
          ? "border-amber-400/50 bg-amber-50 dark:bg-amber-950/20"
          : "border-border"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium">{action.title.hi}</span>
          {action.critical && (
            <Badge variant={overdue ? "destructive" : "secondary"} className="text-xs">
              {overdue ? "देर हो चुकी" : "ज़रूरी"}
            </Badge>
          )}
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">{action.detail.hi}</p>
        <p className="mt-1 text-xs text-muted-foreground/70">{action.title.en}</p>
      </div>

      <Button
        size="sm"
        variant="outline"
        disabled={busy}
        onClick={() => onDone(action.key)}
        className="shrink-0"
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Check className="mr-1 h-4 w-4" />
            कर लिया
          </>
        )}
      </Button>
    </div>
  );
}

// ── main widget ──────────────────────────────────────────────────

export function CropTrackerWidget() {
  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext must be used within AppContextProvider");
  const { token } = context;

  const [crops, setCrops] = useState<Crop[]>([]);
  const [supported, setSupported] = useState<SupportedCrop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ cropType: "", sowingDate: "", area: "" });

  // Kis crop ka harvest form khula hai, aur usme kitni yield bhari hai
  const [harvestingId, setHarvestingId] = useState<string | null>(null);
  const [harvestYield, setHarvestYield] = useState("");
  const [harvestBusy, setHarvestBusy] = useState(false);

  const loadCrops = useCallback(async () => {
    if (!token) return;
    try {
      const res = await api.get("/crops", authHeaders(token));
      setCrops(res.data.filter((c: Crop) => c.status === "growing"));
      setError(null);
    } catch {
      setError("फसल की जानकारी नहीं मिल पाई। दोबारा कोशिश करें।");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadCrops();
    api
      .get("/crops/supported")
      .then((res) => setSupported(res.data))
      .catch(() => setSupported([]));
  }, [loadCrops]);

  const markDone = async (cropId: string, actionKey: string) => {
    if (!token) return;
    setBusyAction(`${cropId}:${actionKey}`);
    try {
      const res = await api.patch(
        `/crops/${cropId}/action`,
        { actionKey },
        authHeaders(token)
      );
      setCrops((prev) =>
        prev.map((c) => (c._id === cropId ? res.data.crop : c))
      );
    } catch {
      setError("यह काम दर्ज नहीं हो पाया। दोबारा कोशिश करें।");
    } finally {
      setBusyAction(null);
    }
  };

  const recordHarvest = async (cropId: string, failed = false) => {
    if (!token) return;
    setHarvestBusy(true);
    try {
      await api.patch(
        `/crops/${cropId}/harvest`,
        {
          yield: harvestYield ? Number(harvestYield) : undefined,
          status: failed ? "failed" : "harvested",
        },
        authHeaders(token)
      );
      // Tracker sirf growing crops dikhata hai - ise list se hata do.
      // Ab ye Harvest Records me dikhegi.
      setCrops((prev) => prev.filter((c) => c._id !== cropId));
      setHarvestingId(null);
      setHarvestYield("");
      setError(null);
    } catch {
      setError("कटाई दर्ज नहीं हो पाई। दोबारा कोशिश करें।");
    } finally {
      setHarvestBusy(false);
    }
  };

  const addCrop = async () => {
    if (!token) return;
    if (!form.cropType || !form.sowingDate) {
      setError("फसल और बुवाई की तारीख दोनों ज़रूरी हैं।");
      return;
    }
    setSubmitting(true);
    try {
      await api.post(
        "/crops",
        {
          cropType: form.cropType,
          sowingDate: form.sowingDate,
          area: form.area ? Number(form.area) : undefined,
        },
        authHeaders(token)
      );
      setForm({ cropType: "", sowingDate: "", area: "" });
      setShowForm(false);
      setError(null);
      await loadCrops();
    } catch {
      setError("फसल जुड़ नहीं पाई। तारीख जाँचकर दोबारा कोशिश करें।");
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-green-600" />
            फसल ट्रैकर
          </CardTitle>
          <CardDescription>
            बुवाई की तारीख से अवस्था अपने आप निकलती है
          </CardDescription>
        </div>
        <Button
          size="sm"
          variant={showForm ? "ghost" : "default"}
          onClick={() => setShowForm((s) => !s)}
        >
          {showForm ? (
            <X className="h-4 w-4" />
          ) : (
            <>
              <PlusCircle className="mr-1 h-4 w-4" />
              फसल जोड़ें
            </>
          )}
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <div className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid gap-3 rounded-lg border bg-muted/30 p-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label>फसल</Label>
                  <Select
                    value={form.cropType}
                    onValueChange={(v) => setForm({ ...form, cropType: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      {supported.map((c) => (
                        <SelectItem key={c.key} value={c.key}>
                          {c.displayName.hi} ({c.displayName.en})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>बुवाई की तारीख</Label>
                  <Input
                    type="date"
                    max={today}
                    value={form.sowingDate}
                    onChange={(e) => setForm({ ...form, sowingDate: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>रकबा (एकड़)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="वैकल्पिक"
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                  />
                </div>

                <div className="sm:col-span-3">
                  <Button onClick={addCrop} disabled={submitting} className="w-full sm:w-auto">
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    जोड़ें
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex items-center gap-2 py-8 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            लोड हो रहा है…
          </div>
        ) : crops.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <Sprout className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 font-medium">अभी कोई फसल दर्ज नहीं है</p>
            <p className="mt-1 text-sm text-muted-foreground">
              बुवाई की तारीख डालें, बाकी हिसाब हम रखेंगे
            </p>
          </div>
        ) : (
          crops.map((crop) => {
            const t = crop.tracking;

            return (
              <motion.div
                key={crop._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border p-4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold capitalize">{crop.cropType}</h3>
                    <p className="text-sm text-muted-foreground">
                      बुवाई {formatDate(crop.sowingDate)}
                      {crop.area ? ` · ${crop.area} एकड़` : ""}
                    </p>
                  </div>
                  {t && (
                    <Badge variant="secondary">{t.daysSinceSowing} दिन</Badge>
                  )}
                </div>

                {!crop.trackingSupported || !t ? (
                  <p className="mt-3 rounded-md bg-muted/50 p-3 text-sm text-muted-foreground">
                    इस फसल का कैलेंडर अभी उपलब्ध नहीं है, इसलिए अवस्था नहीं दिखाई जा सकती।
                  </p>
                ) : (
                  <>
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">
                          {t.stage?.name.hi ?? "—"}
                        </span>
                        <span className="text-muted-foreground">
                          {t.progressPercent}%
                        </span>
                      </div>
                      <Progress value={t.progressPercent} className="h-2" />
                    </div>

                    {t.overdueActions.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="flex items-center gap-1.5 text-sm font-medium text-destructive">
                          <AlertTriangle className="h-4 w-4" />
                          समय निकल रहा है
                        </p>
                        {t.overdueActions.map((a) => (
                          <ActionRow
                            key={a.key}
                            action={a}
                            overdue
                            busy={busyAction === `${crop._id}:${a.key}`}
                            onDone={(k) => markDone(crop._id, k)}
                          />
                        ))}
                      </div>
                    )}

                    {t.dueActions.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium">अभी करने वाले काम</p>
                        {t.dueActions.map((a) => (
                          <ActionRow
                            key={a.key}
                            action={a}
                            busy={busyAction === `${crop._id}:${a.key}`}
                            onDone={(k) => markDone(crop._id, k)}
                          />
                        ))}
                      </div>
                    )}

                    {t.upcomingActions.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium">आगे आने वाले काम</p>
                        <ul className="mt-1.5 space-y-1">
                          {t.upcomingActions.map((a) => (
                            <li key={a.key} className="text-sm text-muted-foreground">
                              • {a.title.hi}{" "}
                              <span className="text-xs">
                                ({Math.abs(a.daysOffset)} दिन बाद)
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {t.overdueActions.length === 0 &&
                      t.dueActions.length === 0 &&
                      t.upcomingActions.length === 0 && (
                        <p className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-950/20 dark:text-green-300">
                          इस समय कोई काम बाकी नहीं है।
                        </p>
                      )}

                    {t.status === "overdue_harvest" && harvestingId !== crop._id && (
                      <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/20 dark:text-amber-300">
                        इस फसल का समय पूरा हो चुका है। कट गई हो तो नीचे दर्ज करें।
                      </p>
                    )}
                  </>
                )}

                {/* ── कटाई दर्ज करें ── */}
                <div className="mt-4 border-t pt-3">
                  {harvestingId === crop._id ? (
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label>पैदावार (kg/ha) — वैकल्पिक</Label>
                        <Input
                          type="number"
                          min="0"
                          placeholder="जैसे 4200"
                          value={harvestYield}
                          onChange={(e) => setHarvestYield(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          disabled={harvestBusy}
                          onClick={() => recordHarvest(crop._id)}
                        >
                          {harvestBusy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          कटाई दर्ज करें
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={harvestBusy}
                          onClick={() => recordHarvest(crop._id, true)}
                        >
                          फसल खराब हो गई
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={harvestBusy}
                          onClick={() => {
                            setHarvestingId(null);
                            setHarvestYield("");
                          }}
                        >
                          रहने दें
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setHarvestingId(crop._id);
                        setHarvestYield("");
                      }}
                    >
                      <Wheat className="mr-1 h-4 w-4" />
                      फसल काट ली
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}