import type { AnalysisCategory } from '@/lib/records'

export type Employee = {
  id: string
  name: string
  title: string
  email: string
  initials: string
  color: string
}

export const employees: readonly Employee[] = [
  {
    id: 'resad',
    name: 'Rəşad Əliyev',
    title: 'Şəbəkə İnfrastrukturu Mütəxəssisi',
    email: 'resad.aliyev@rsd.gov.az',
    initials: 'RƏ',
    color: '#1683df',
  },
  {
    id: 'nigar',
    name: 'Nigar Məmmədova',
    title: 'İnteqrasiya Baş Mühəndisi',
    email: 'nigar.memmedova@rsd.gov.az',
    initials: 'NM',
    color: '#7d3ac1',
  },
  {
    id: 'kenan',
    name: 'Kənan Hüseynov',
    title: 'Sistem Analitiki',
    email: 'kenan.huseynov@rsd.gov.az',
    initials: 'KH',
    color: '#0a8f6c',
  },
  {
    id: 'aygun',
    name: 'Aygün Rzayeva',
    title: 'Performans Mütəxəssisi',
    email: 'aygun.rzayeva@rsd.gov.az',
    initials: 'AR',
    color: '#c43d3d',
  },
  {
    id: 'emin',
    name: 'Emin Nəbiyev',
    title: 'Təhlükəsizlik Mütəxəssisi',
    email: 'emin.nebiyev@rsd.gov.az',
    initials: 'EN',
    color: '#b26a00',
  },
]

export function getEmployee(id: string): Employee | undefined {
  return employees.find(e => e.id === id)
}

// One employee covers two categories (Şəbəkə + Sertifikat) so 5 people span 6 categories.
export const defaultRouting: Readonly<Record<AnalysisCategory, string>> = {
  'Şəbəkə': 'resad',
  'Sertifikat': 'resad',
  'Qəbul edən sistem': 'nigar',
  'Format': 'kenan',
  'Vaxt aşımı': 'aygun',
  'Avtorizasiya': 'emin',
}
