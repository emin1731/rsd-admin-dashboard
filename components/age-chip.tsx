'use client'

import { Clock } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  formatAge,
  getAgeMinutes,
  getStalenessTier,
  stalenessMeta,
} from '@/lib/records'
import { useTickingNow } from '@/lib/useTickingNow'

export function AgeChip({
  sentAt,
  size = 'sm',
}: {
  sentAt: string
  size?: 'sm' | 'md'
}) {
  const now = useTickingNow()
  if (now === null) return null

  const minutes = getAgeMinutes(sentAt, now)
  const tier = getStalenessTier(minutes)
  const meta = stalenessMeta[tier]

  if (size === 'md') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-medium',
          meta.bgClass,
          meta.textClass,
          meta.borderClass,
        )}
      >
        <Clock className="h-3.5 w-3.5" />
        {formatAge(minutes)} gözləyir
        {tier !== 'fresh' && <span>&nbsp;·&nbsp;{meta.label}</span>}
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[11px] font-medium whitespace-nowrap',
        meta.bgClass,
        meta.textClass,
        meta.borderClass,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', meta.dotClass)} />
      {formatAge(minutes)}
    </span>
  )
}
