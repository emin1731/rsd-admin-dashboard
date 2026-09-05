'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Activity, ArrowRight, Check, ClipboardCheck, Send, Sparkles, XCircle } from 'lucide-react'

import { AgeChip } from '@/components/age-chip'
import { DismissDialog } from '@/components/dismiss-dialog'
import { SendTeamsDialog } from '@/components/send-teams-dialog'
import { cn } from '@/lib/utils'
import {
  difficultyMeta,
  getAnalysis,
  getSentAt,
  records,
  REPORT_PATH,
  type Analysis,
} from '@/lib/records'
import { getMessageLog, type SentMessage } from '@/lib/teams-messaging'
import { type Dismissal, getDismissed } from '@/lib/dismissals'

const MOCK_TODAY_THROUGHPUT = 148
const MOCK_CONFIRM_RATE = 82

type PendingItem = {
  index: number
  docNo: string
  sentAt: string | undefined
  analysis: Analysis
}

export default function AiTriagePage() {
  const [sentByDoc, setSentByDoc] = useState<Record<number, SentMessage>>({})
  const [dismissedByDoc, setDismissedByDoc] = useState<Record<number, Dismissal>>({})

  useEffect(() => {
    setSentByDoc(loadSentMap())
    setDismissedByDoc(getDismissed())
  }, [])

  const refreshSent = () => setSentByDoc(loadSentMap())
  const refreshDismissed = () => setDismissedByDoc(getDismissed())

  const items: PendingItem[] = records
    .map<PendingItem | null>((row, index) => {
      const analysis = getAnalysis(index)
      if (!analysis) return null
      if (dismissedByDoc[index]) return null
      return {
        index,
        docNo: row[0],
        sentAt: getSentAt(index),
        analysis,
      }
    })
    .filter((x): x is PendingItem => x !== null)

  const groupsMap = new Map<string, PendingItem[]>()
  for (const item of items) {
    const key = item.analysis.suggestedAssignee.entity
    const bucket = groupsMap.get(key)
    if (bucket) bucket.push(item)
    else groupsMap.set(key, [item])
  }

  const groups = Array.from(groupsMap.entries()).sort(
    (a, b) => b[1].length - a[1].length,
  )

  return (
    <section className="min-h-[calc(100vh-72px)] overflow-hidden rounded-[3px] border border-[#e0e3e7] bg-white">
      <div className="border-b border-[#e5e7ea] px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1683df] text-white">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <h1 className="text-[15px] font-semibold">AI triage növbəsi</h1>
        </div>
        <p className="mt-1 text-[12px] text-[#61656b]">
          Süni intellekt tərəfindən analiz edilmiş uğursuz sənədlər — təklif olunan məsul üzrə qruplaşdırılıb.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 border-b border-[#eef0f3] px-5 py-4">
        <StatCard
          icon={Activity}
          label="Bu gün analiz edilib"
          value={MOCK_TODAY_THROUGHPUT.toString()}
          hint="Bütün göndərilən sənədlər"
        />
        <StatCard
          icon={ClipboardCheck}
          label="AI təsdiq faizi"
          value={`${MOCK_CONFIRM_RATE}%`}
          hint="Son 7 gün ərzində"
        />
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-16 text-center text-[13px] text-[#8a8f96]">
          Gözləyən AI triage sənədi yoxdur.
        </div>
      ) : (
        <div className="space-y-6 px-5 py-5">
          {groups.map(([entity, groupItems]) => (
            <div key={entity}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[13px] font-semibold text-[#30343b]">{entity}</h2>
                <span className="rounded-full bg-[#f4f7fa] px-2 py-0.5 text-[11px] font-medium text-[#61656b]">
                  {groupItems.length} gözləyən
                </span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {groupItems.map(item => (
                  <TriageCard
                    key={item.index}
                    item={item}
                    sentMessage={sentByDoc[item.index]}
                    onSent={refreshSent}
                    onDismissed={refreshDismissed}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Sparkles
  label: string
  value: string
  hint: string
}) {
  return (
    <div className="min-w-[240px] flex-1 rounded-md border border-[#e0e3e7] bg-[#f7faff] px-4 py-3">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-[#61656b]">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1 text-[22px] font-semibold leading-none text-[#30343b]">
        {value}
      </div>
      <div className="mt-1 text-[11px] text-[#8a8f96]">{hint}</div>
    </div>
  )
}

function TriageCard({
  item,
  sentMessage,
  onSent,
  onDismissed,
}: {
  item: PendingItem
  sentMessage: SentMessage | undefined
  onSent: () => void
  onDismissed: () => void
}) {
  const { analysis, sentAt, docNo, index } = item
  const diff = difficultyMeta[analysis.difficulty]
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dismissDialogOpen, setDismissDialogOpen] = useState(false)
  return (
    <div className="rounded-md border border-[#e0e3e7] p-3 hover:border-[#c9ddf5] hover:bg-[#fafcff]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[12px] font-medium text-[#c73030]">
            {analysis.detectedError}
          </div>
          <div className="mt-0.5 truncate text-[11px] text-[#61656b]">
            {docNo} · {analysis.suggestedAssignee.team}
          </div>
        </div>
        {sentAt && <AgeChip sentAt={sentAt} />}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-[#c9ddf5] bg-white px-2 py-0.5 text-[11px] font-medium text-[#1683df]">
          {analysis.category}
        </span>
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium',
            diff.bgClass,
            diff.textClass,
            diff.borderClass,
          )}
        >
          <span className={cn('h-1.5 w-1.5 rounded-full', diff.dotClass)} />
          {diff.label}
        </span>
        <span className="text-[11px] text-[#61656b]">
          Etibarlılıq: <span className="font-medium text-[#30343b]">{analysis.confidence}%</span>
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {sentMessage ? (
            <span className="inline-flex items-center gap-1 rounded-sm bg-[#e8f5ed] px-1.5 py-0.5 text-[11px] font-medium text-[#178a4c]">
              <Check className="h-3 w-3" />
              Göndərilib
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="inline-flex items-center gap-1 rounded-[3px] border border-[#5b5fc7] bg-white px-2 py-1 text-[11px] font-medium text-[#5b5fc7] hover:bg-[#f0f0fa]"
            >
              <Send className="h-3 w-3" />
              Teams-ə göndər
            </button>
          )}
          <button
            type="button"
            onClick={() => setDismissDialogOpen(true)}
            aria-label="Sənədi bağla"
            title="Həll edilməz olaraq bağla"
            className="inline-flex items-center gap-1 rounded-[3px] border border-transparent bg-transparent px-1.5 py-1 text-[11px] font-medium text-[#8a8f96] hover:border-[#c73030] hover:text-[#c73030]"
          >
            <XCircle className="h-3 w-3" />
            Bağla
          </button>
        </div>
        <Link
          href={`${REPORT_PATH}/${index}`}
          className="inline-flex items-center gap-1 text-[12px] font-medium text-[#1683df] hover:underline"
        >
          Bax
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <SendTeamsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        analysis={analysis}
        documentIndex={index}
        docNo={docNo}
        onSent={onSent}
      />

      <DismissDialog
        open={dismissDialogOpen}
        onOpenChange={setDismissDialogOpen}
        documentIndex={index}
        docNo={docNo}
        detectedError={analysis.detectedError}
        onDismissed={onDismissed}
      />
    </div>
  )
}

function loadSentMap(): Record<number, SentMessage> {
  const log = getMessageLog()
  const map: Record<number, SentMessage> = {}
  for (const msg of log) {
    const existing = map[msg.documentIndex]
    if (!existing || msg.sentAt > existing.sentAt) {
      map[msg.documentIndex] = msg
    }
  }
  return map
}
