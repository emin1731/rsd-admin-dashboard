'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowLeftRight,
  BarChart3,
  ChevronDown,
  CircleUserRound,
  ClipboardList,
  FileText,
  Folder,
  Globe2,
  Link2,
  Menu,
  Monitor,
  Network,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react'

import { NotificationBell } from '@/components/notification-bell'
import { cn } from '@/lib/utils'
import { REPORT_PATH } from '@/lib/records'

const mainLinks = [
  ['Qurumlar', Network], ['Esd sistemləri', SlidersHorizontal], ['Ip ünvanlar', Link2],
  ['İstifadəçilər', CircleUserRound], ['Monitorinq', Monitor], ['Limitlamalar', ClipboardList],
] as const

const reportLinks: { label: string; href?: string }[] = [
  { label: 'Qurumlar üzrə hesabat', href: REPORT_PATH },
  { label: 'Qurumlar üzrə status hesabat' },
  { label: 'Qurumlar üzrə info hesabat' },
  { label: 'Ölkələrarası sistem üzrə hesabat' },
  { label: 'Vətəndaşlar üzrə hesabat' },
  { label: 'Vətəndaşlar üzrə status hesabat' },
  { label: 'Vətəndaşlar üzrə info hesabat' },
]

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [reportsOpen, setReportsOpen] = useState(true)
  const [aiTriageOpen, setAiTriageOpen] = useState(true)
  const [menuOpen, setMenuOpen] = useState(true)

  const isActive = (href?: string) =>
    !!href && (pathname === href || pathname.startsWith(href + '/'))

  const isExactActive = (href: string) => pathname === href

  return (
    <div className="min-h-screen bg-[#f7f8fa] font-sans text-[13px] text-[#30343b]">
      <header className="flex h-12 items-center justify-between border-b border-[#e5e7ea] bg-white px-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="RSD admin">
          <img
            src="/rsd-logo.jpeg"
            alt="RSD — Rəqəmsal Sənəd Dövriyyəsi"
            className="h-8 w-auto"
          />
          <span className="border-l border-[#e5e7ea] pl-2.5 text-[11px] font-semibold uppercase tracking-wide text-[#61656b]">
            admin
          </span>
        </Link>
        <div className="flex items-center gap-3 text-[12px] text-[#4d5158]">
          <NotificationBell />
          <div className="flex items-center gap-2">
            <CircleUserRound className="h-4 w-4 text-[#6b7078]" />
            SELCAN HÜSEYNOVA İLQAR QIZI
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-48px)]">
        <aside className={cn('shrink-0 border-r border-[#dfe2e6] bg-white', menuOpen ? 'w-[220px]' : 'w-11')}>
          <div className="flex h-11 items-center justify-between px-4">
            {menuOpen && <span className="font-semibold text-[13px]">Menyu</span>}
            <button
              type="button"
              aria-label="Menyunu daralt"
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-full p-1 text-[#8a8f96] hover:bg-[#f0f2f5]"
            >
              {menuOpen ? <ArrowLeftRight className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
          {menuOpen && (
            <nav aria-label="Əsas menyu" className="pb-2">
              {mainLinks.slice(0, 3).map(([label, Icon]) => (
                <NavItem key={label} label={label} Icon={Icon} />
              ))}
              <NavItem label="Ölkələrarası sazlamalar" Icon={Globe2} expandable />
              {mainLinks.slice(3).map(([label, Icon]) => (
                <NavItem key={label} label={label} Icon={Icon} />
              ))}
              <NavItem
                label="AI triage"
                Icon={Sparkles}
                expandable
                expanded={aiTriageOpen}
                onClick={() => setAiTriageOpen(!aiTriageOpen)}
              />
              {aiTriageOpen && (
                <div className="py-1">
                  <SubItem label="Növbə" href="/ai-triage" active={isExactActive('/ai-triage')} />
                  <SubItem
                    label="Mesajlar"
                    href="/ai-triage/mesajlar"
                    active={isExactActive('/ai-triage/mesajlar')}
                  />
                </div>
              )}
              <NavItem
                label="Hesabatlar"
                Icon={Folder}
                expandable
                expanded={reportsOpen}
                onClick={() => setReportsOpen(!reportsOpen)}
              />
              {reportsOpen && (
                <div className="py-1">
                  {reportLinks.map(({ label, href }) => {
                    const active = isActive(href)
                    const className = cn(
                      'flex w-full items-start gap-2 px-6 py-2 text-left leading-[1.35] hover:bg-[#f4f7fa]',
                      active && 'bg-[#e6f1ff] font-semibold text-[#1683df]',
                    )
                    return href ? (
                      <Link key={label} href={href} className={className}>
                        <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        {label}
                      </Link>
                    ) : (
                      <button key={label} type="button" className={className}>
                        <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        {label}
                      </button>
                    )
                  })}
                </div>
              )}
            </nav>
          )}
        </aside>

        <main className="min-w-0 flex-1 p-3">{children}</main>
      </div>
    </div>
  )
}

function SubItem({
  label,
  href,
  active,
}: {
  label: string
  href: string
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-start gap-2 px-6 py-2 text-left leading-[1.35] hover:bg-[#f4f7fa]',
        active && 'bg-[#e6f1ff] font-semibold text-[#1683df]',
      )}
    >
      <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      {label}
    </Link>
  )
}

function NavItem({
  label,
  Icon,
  href,
  active = false,
  expandable = false,
  expanded = false,
  onClick,
}: {
  label: string
  Icon: typeof BarChart3
  href?: string
  active?: boolean
  expandable?: boolean
  expanded?: boolean
  onClick?: () => void
}) {
  const className = cn(
    'flex w-full items-center gap-2.5 px-4 py-2.5 text-left hover:bg-[#f4f7fa]',
    active && 'bg-[#e6f1ff] font-semibold text-[#1683df]',
  )
  const contents = (
    <>
      <Icon
        className={cn('h-4 w-4 shrink-0', active ? 'text-[#1683df]' : 'text-[#697078]')}
      />
      <span className="flex-1">{label}</span>
      {expandable && (
        <ChevronDown
          className={cn('h-3.5 w-3.5 transition-transform', !expanded && '-rotate-90')}
        />
      )}
    </>
  )
  return href ? (
    <Link href={href} className={className}>
      {contents}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      {contents}
    </button>
  )
}
