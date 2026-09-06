"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bell, BellRing } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  formatAge,
  getAgeMinutes,
  getAnalysis,
  getSentAt,
  getStalenessTier,
  records,
  REPORT_PATH,
} from "@/lib/records";
import {
  getLastSeenAt,
  getSnoozed,
  setLastSeenAt,
  snooze,
} from "@/lib/notifications";
import { getDismissed } from "@/lib/dismissals";
import { useTickingNow } from "@/lib/useTickingNow";

const SNOOZE_MINUTES = 60;

export function NotificationBell() {
  const now = useTickingNow(30_000);
  const [open, setOpen] = useState(false);
  const [snoozedMap, setSnoozedMap] = useState<Record<number, number>>({});
  const [lastSeen, setLastSeen] = useState(0);

  useEffect(() => {
    setSnoozedMap(getSnoozed());
    setLastSeen(getLastSeenAt());
  }, []);

  useEffect(() => {
    if (now === null) return;
    setSnoozedMap(getSnoozed());
  }, [now]);

  const overdues = useMemo(() => {
    if (now === null) return [];
    const dismissed = getDismissed();
    return records
      .map((row, index) => ({ row, index, sentAt: getSentAt(index) }))
      .filter(({ row, sentAt, index }) => {
        if (!sentAt) return false;
        if (row[8] === "Uğurlu") return false;
        if (dismissed[index]) return false;
        return getStalenessTier(getAgeMinutes(sentAt, now)) === "overdue";
      });
  }, [now]);

  const unsnoozed = overdues.filter(({ index }) => !snoozedMap[index]);
  const count = unsnoozed.length;

  const handleOpen = (v: boolean) => {
    setOpen(v);
    if (v && now !== null) {
      setLastSeenAt(now);
      setLastSeen(now);
    }
  };

  const handleSnooze = (index: number) => {
    snooze(index, SNOOZE_MINUTES);
    setSnoozedMap(getSnoozed());
  };

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger
        render={
          <button
            type="button"
            aria-label="Bildirişlər"
            className="relative rounded-full p-1.5 text-[#4d5158] hover:bg-[#f4f7fa]"
          >
            {count > 0 ? (
              <BellRing className="h-4 w-4" />
            ) : (
              <Bell className="h-4 w-4" />
            )}
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c73030] px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            )}
          </button>
        }
      />
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[360px] bg-white p-0 text-[#30343b]"
      >
        <div className="border-b border-[#e5e7ea] px-4 py-3">
          <div className="text-[13px] font-semibold">Bildirişlər</div>
          <div className="text-[11px] text-[#61656b]">
            {count === 0
              ? "Gecikmiş sənəd yoxdur."
              : `${count} gecikmiş sənəd diqqət tələb edir.`}
          </div>
        </div>

        {unsnoozed.length === 0 ? (
          <div className="px-4 py-6 text-center text-[12px] text-[#8a8f96]">
            Diqqətdə saxlanılacaq gecikmiş sənəd yoxdur.
          </div>
        ) : (
          <ul className="max-h-[360px] divide-y divide-[#eef0f3] overflow-y-auto">
            {unsnoozed.map(({ index, sentAt, row }) => {
              const analysis = getAnalysis(index);
              const minutes =
                now !== null && sentAt ? getAgeMinutes(sentAt, now) : 0;
              const sentMs = sentAt ? new Date(sentAt).getTime() : 0;
              const isNew = lastSeen > 0 && sentMs > lastSeen;
              return (
                <li key={index} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "h-1.5 w-1.5 shrink-0 rounded-full bg-[#c73030]",
                          )}
                        />
                        <span className="truncate text-[12px] font-medium">
                          {analysis?.detectedError ?? "Uğursuz sənəd"}
                        </span>
                        {isNew && (
                          <span className="rounded-sm bg-[#e6f1ff] px-1 text-[9px] font-semibold text-[#1683df]">
                            YENİ
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 truncate text-[11px] text-[#61656b]">
                        {row[0]}
                      </div>
                      <div className="mt-1 text-[11px] text-[#c73030]">
                        {formatAge(minutes)} gözləyir
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <Link
                        href={`${REPORT_PATH}/${index}`}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-0.5 text-[11px] font-medium text-[#1683df] hover:underline"
                      >
                        Bax
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleSnooze(index)}
                        className="text-[11px] text-[#8a8f96] hover:text-[#61656b]"
                      >
                        Susdur
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {unsnoozed.length > 0 && (
          <div className="border-t border-[#e5e7ea] px-4 py-2 text-right">
            <Link
              href={REPORT_PATH}
              onClick={() => setOpen(false)}
              className="text-[11px] font-medium text-[#1683df] hover:underline"
            >
              Hamısına bax
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
