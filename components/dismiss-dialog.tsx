'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, XCircle } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { dismissDoc } from '@/lib/dismissals'

export function DismissDialog({
  open,
  onOpenChange,
  documentIndex,
  docNo,
  detectedError,
  onDismissed,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  documentIndex: number
  docNo: string
  detectedError?: string
  onDismissed?: () => void
}) {
  const [reason, setReason] = useState('')

  useEffect(() => {
    if (open) setReason('')
  }, [open])

  const handleDismiss = () => {
    dismissDoc(documentIndex, reason)
    onOpenChange(false)
    onDismissed?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] bg-white text-[#30343b] sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[15px]">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#c73030] text-white">
              <XCircle className="h-3.5 w-3.5" />
            </span>
            Sənədi bağla
          </DialogTitle>
          <DialogDescription className="text-[12px] text-[#61656b]">
            Bu sənəd bir daha AI triage növbəsində, bildirişlərdə və gecikmişlər siyahısında görünməyəcək.
            Əsas hesabatda tarixi qeyd kimi qalacaq və istənilən vaxt bərpa oluna bilər.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 pt-1">
          <div className="rounded-md border border-[#f4c2c2] bg-[#fdecec] px-3 py-2">
            <div className="text-[11px] font-medium uppercase tracking-wide text-[#c73030]">
              Bağlanacaq sənəd
            </div>
            <div className="mt-0.5 text-[12px] text-[#30343b]">{docNo}</div>
            {detectedError && (
              <div className="mt-1 font-mono text-[11px] text-[#c73030]">
                {detectedError}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="dismiss-reason"
              className="text-[11px] font-medium uppercase tracking-wide text-[#61656b]"
            >
              Səbəb (isteğe bağlı, lakin tövsiyə olunur)
            </label>
            <textarea
              id="dismiss-reason"
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={3}
              placeholder="Məsələn: qarşı tərəf sistemi köhnəlib, göndərici qurum təkrar sorğu göndərəcək..."
              className="mt-1 w-full resize-y rounded border border-[#e0e3e7] bg-white px-3 py-2 text-[12px] leading-[1.5] text-[#30343b] placeholder:text-[#8a8f96] focus:border-[#1683df] focus:outline-none"
            />
          </div>

          <div className="flex items-start gap-2 rounded-md border border-[#f4d9a8] bg-[#fff5e5] px-3 py-2 text-[11px] text-[#b26a00]">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              Bu əməliyyat sənədi silmir — sadəcə "bağlanmış" olaraq işarələyir.
            </span>
          </div>
        </div>

        <DialogFooter>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-[3px] border border-[#c9d0d7] bg-white px-4 py-2 text-[12px] font-medium text-[#30343b] hover:bg-[#f4f7fa]"
          >
            Ləğv et
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-[3px] bg-[#c73030] px-4 py-2 text-[12px] font-medium text-white hover:bg-[#a82525]"
          >
            Bağla
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
