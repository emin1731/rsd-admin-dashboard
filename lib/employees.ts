export type TeamsGroup = {
  id: string
  name: string
  initials: string
  color: string
}

export const teamsGroups: readonly TeamsGroup[] = [
  { id: 'esd-gateway-rsd', name: 'ESD Gateway - RSD altsistemi', initials: 'ES', color: '#5b5fc7' },
  { id: 'iria-sanaye-thk', name: 'Azərbaycan Sənaye Təhlükəsizliyi Assosasiyası - İRİA Gateway', initials: 'ST', color: '#8f4fbb' },
  { id: 'rsd-seferberlik', name: 'RSD - Səfərbərlik və Hərbi Xidmətə Çağırış (AzDoc PRO)', initials: 'SH', color: '#3f6dd8' },
  { id: 'qachqinkom-iria', name: 'Qachqinkom - IRIA - Gateway', initials: 'QK', color: '#0a8f6c' },
  { id: 'eesmn-iria', name: 'İRİA - ƏƏSMN ESD Gateway', initials: 'ƏƏ', color: '#c43d3d' },
  { id: 'ady-iria', name: 'ADY - IRIA Gateway Integration', initials: 'AD', color: '#b26a00' },
  { id: 'socar-iria', name: 'SOCAR - IRIA Gateway', initials: 'SC', color: '#178a4c' },
  { id: 'rsd-xritdx', name: 'RSD - XRITDX (AzDoc PRO)', initials: 'XR', color: '#1683df' },
  { id: 'cbar-idda-sinam', name: 'CBAR IDDA Sinam - Gateway', initials: 'CB', color: '#d7194b' },
  { id: 'azdoc-rinn-ryp', name: 'AzDoc (RİNN) - RYP inteqrasiya', initials: 'AR', color: '#7d3ac1' },
  { id: 'aqta-iria', name: 'AQTA - IRIA Gateway', initials: 'AQ', color: '#0a8f6c' },
  { id: 'nk-iria', name: 'NK - IRIA Gateway', initials: 'NK', color: '#5b5fc7' },
  { id: 'ekologiya-iria', name: 'Ekologiya - İRİA Gateway', initials: 'EK', color: '#178a4c' },
  { id: 'naxcivan-in-iria', name: 'Naxçıvan İN - İRİA Gateway', initials: 'NX', color: '#b26a00' },
  { id: 'kapital-bank-iria', name: 'Kapital Bank - İRİA Gateway', initials: 'KB', color: '#c43d3d' },
  { id: 'ahik-iria', name: 'AHİK - İRİA Gateway', initials: 'AH', color: '#7d3ac1' },
  { id: 'odtkm-iria', name: 'ODTKM - İRİA Gateway', initials: 'OD', color: '#3f6dd8' },
  { id: 'azal-iria', name: 'AZAL - IRIA Gateway', initials: 'AZ', color: '#d7194b' },
  { id: 'azersu-iria', name: 'Azərsu - İRİA Gateway', initials: 'AS', color: '#1683df' },
  { id: 'azersilah-iria', name: 'Azersilah - IRIA Gateway', initials: 'AL', color: '#4d5158' },
  { id: 'rsd-xin-iria', name: 'RSD - XİN IRIA Gateway', initials: 'XN', color: '#8f4fbb' },
  { id: 'emdx-iria', name: 'ƏMDX - İRİA Gateway', initials: 'ƏM', color: '#0a8f6c' },
  { id: 'statistika-iria', name: 'Statistika Komitesi - İRİA ESD Gateway', initials: 'ST', color: '#b26a00' },
  { id: 'metropoliten-iria', name: 'Metropoliten - İRİA Gateway', initials: 'MP', color: '#5b5fc7' },
  { id: 'iqtisadiyyat-iria', name: 'İqtisadiyyat Nazirliyi - İRİA Gateway', initials: 'İN', color: '#178a4c' },
  { id: 'mmx-iria', name: 'MMX - IRIA Gateway', initials: 'MM', color: '#c43d3d' },
  { id: 'antiinhisar-rsd', name: 'Antiinhisar - RSD Gateway', initials: 'AI', color: '#7d3ac1' },
  { id: 'dmx-iria', name: 'DMX - IRIA ESD Gateway', initials: 'DM', color: '#3f6dd8' },
  { id: 'naxcivan-rinn-iria', name: 'Naxchivan RINN - IRIA Gateway', initials: 'NR', color: '#1683df' },
  { id: 'mudafie-iria', name: 'Mudafie Nazirliyi - IRIA Gateway', initials: 'MN', color: '#4d5158' },
  { id: 'tsii-etn-iria', name: 'TSİİ (ELM ve Tehsil Nazirliyi - ETN) - İRİA Gateway', initials: 'ET', color: '#178a4c' },
  { id: 'rsd-g2b', name: 'RSD G2B tərəfdaşlıq', initials: 'G2', color: '#b26a00' },
  { id: 'abb-idda-rsd', name: 'ABB - IDDA RSD Integration', initials: 'AB', color: '#d7194b' },
  { id: 'medeniyyet-iria', name: 'Mədəniyyət Nazirliyi - İRİA Gateway', initials: 'MD', color: '#5b5fc7' },
  { id: 'rsd-edliyye', name: 'RSD - Ədliyyə (AzDoc PRO)', initials: 'ƏD', color: '#8f4fbb' },
  { id: 'din-iria-esd', name: 'DİN - IRIA ESD Gateway', initials: 'Dİ', color: '#c43d3d' },
  { id: 'adra-iria', name: 'ADRA - IRIA Gateway', initials: 'AR', color: '#0a8f6c' },
  { id: 'naxcivan-smartnet-iria', name: 'Naxchivan - Smartnet IRIA Gateway', initials: 'NS', color: '#3f6dd8' },
  { id: 'rsd-mehkemeler', name: 'RSD - Məhkəmələr (AzDoc PRO)', initials: 'MH', color: '#1683df' },
]

export function getTeamsGroup(id: string | undefined): TeamsGroup | undefined {
  if (!id) return undefined
  return teamsGroups.find(g => g.id === id)
}

// Routing key is the ESD (row[4] — incomingEsd, where the error occurred).
// Values are TeamsGroup ids. Unknown ESDs fall back to `esd-gateway-rsd`.
export const DEFAULT_FALLBACK_GROUP_ID = 'esd-gateway-rsd'

export const defaultRouting: Readonly<Record<string, string>> = {
  'Azərbaycan Respublikasının Daxili İşlər Nazirliyi': 'din-iria-esd',
  'Avtomobil Yollarının Mühafizə Xidməti': DEFAULT_FALLBACK_GROUP_ID,
  'Bakı Şəhər Nəqliyyat Agentliyi': DEFAULT_FALLBACK_GROUP_ID,
  'Kapital Bank': 'kapital-bank-iria',
  'Antiinhisar-İN': 'antiinhisar-rsd',
  'Ekologiya Nazirliyi': 'ekologiya-iria',
  'AQTA_ESD': 'aqta-iria',
  'İN(ultra)': 'iqtisadiyyat-iria',
  'Təhsil Nazirliyi(prosys)': 'tsii-etn-iria',
}
