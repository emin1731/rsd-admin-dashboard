export type Row = readonly [
  docNo: string,
  sender: string,
  senderEsd: string,
  receiver: string,
  incomingEsd: string,
  statusCode: string,
  amount: string,
  requestId: string,
  status: string,
  date: string,
]

export const records: readonly Row[] = [
  ['11-1/4-2/2-3545/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'DİN-in Baş Dövlət Yol Polisi İdarəsi', 'Azərbaycan Respublikasının Daxili İşlər Nazirliyi', '204', '-', '34F3D81A46A64553BF99C92D6A9E6C0B', 'Uğurlu', '01.09.2026\n14:52:33'],
  ['11-1/4-2/2-3545/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'DİN-in Baş Dövlət Yol Polisi İdarəsi', 'Azərbaycan Respublikasının Daxili İşlər Nazirliyi', '413', '-', '2CB5A941D74E477F8CE4C8BBA713F409', 'Uğursuz', '01.09.2026\n14:49:02'],
  ['11-1/4-2/2-3545/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'DİN-in Baş Dövlət Yol Polisi İdarəsi', 'Azərbaycan Respublikasının Daxili İşlər Nazirliyi', '502', '-', '84E07A9CBBA74431AAFE8C367F337CFB', 'Uğursuz', '01.09.2026\n14:48:44'],
  ['11-1/4-2/2-3545/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'DİN-in Baş Dövlət Yol Polisi İdarəsi', 'Azərbaycan Respublikasının Daxili İşlər Nazirliyi', '503', '-', '24FA2C6B4278458089AB:26AFB61BD9AC', 'Uğursuz', '01.09.2026\n14:46:04'],
  ['11-1/4-2/2-3545/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Avtomobil Yollarının Mühafizə Xidməti MMC', 'Avtomobil Yollarının Mühafizə Xidməti', '400', '-', 'CBC20D00D7EC42ACAE06:30CE8B8540F80', 'Uğursuz', '01.09.2026\n14:45:55'],
  ['11-1/4-2/2-3545/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Avtomobil Yollarının Mühafizə Xidməti MMC', 'Avtomobil Yollarının Mühafizə Xidməti', '526', '-', '8FA0B8CA0214B04A4FE:D5AE60715538', 'Uğursuz', '01.09.2026\n14:45:20'],
  ['11-1/4-2/2-3545/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'DİN-in Baş Dövlət Yol Polisi İdarəsi', 'Azərbaycan Respublikasının Daxili İşlər Nazirliyi', '504', '-', '534F69CA20AD48A29420:AE BCC738A0C', 'Uğursuz', '01.09.2026\n14:45:19'],
  ['11-1/4-2/2-3545/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Bakı Şəhər Nəqliyyat Agentliyi', 'Bakı Şəhər Nəqliyyat Agentliyi', '401', '-', 'DAF6C731C8D1401FB1DD:B4727D340174', 'Uğursuz', '01.09.2026\n14:44:25'],
  ['3-16-35-22/2-204394/2026', 'Sabunçu rayon icra şöbəsi', 'Ədliyyə(yeni)-bestcomp', '"Kapital Bank" Açıq Səhmdar Cəmiyyəti', 'Kapital Bank', '500', '-', '022037A59A87490CBBEE:28DC2CE1610F', 'Uğursuz', '13.07.2026\n12:53:35'],
  ['3-23-19/2-72/2026', 'Azərbaycan Respublikasının Maliyyə Nazirliyi yanında Maliyyə Elm-Tədris Mərkəzi', 'Maliyyə(Minfin)SESDA.4', 'Azərbaycan Respublikasının Prezidenti yanında Antiinhisar və İstehlak Bazarına Nəzarət Dövlət Agentliyi', 'Antiinhisar-İN', '500', '-', '67D3BBACA14247A2AE9B:C604A84C8BF0', 'Uğursuz', '05.09.2026\n18:20:15'],
  ['5-10/2-2115/2026', 'Binəqədi Rayon İcra Hakimiyyəti', 'Sinam(cloud)', 'Azərbaycan Respublikası Ekologiya və Təbii Sərvətlər Nazirliyi', 'Ekologiya Nazirliyi', '400', '-', '23D4F6807D0E4F60BCA2:52A283AE500E', 'Uğursuz', '26.08.2026\n16:39:32'],
  ['3-35-5/2-109/2026', 'Bakı Dövlət Layihə İnstitutu', 'Sinam(cloud)', 'Azərbaycan Respublikası Qida Təhlükəsizliyi Agentliyi', 'AQTA_ESD', '400', '-', '2ED6F6B8A37F4051BDCC:7691E719F903', 'Uğursuz', '05.09.2026\n09:15:42'],
  ['13-10-1/2-184/2026', '"Daşkəsən Dəmir Filiz" MMC', '"Daşkəsən Dəmir Filiz" MMC', 'Azərbaycan Respublikasının Prezidenti yanında Antiinhisar və İstehlak Bazarına Nəzarət Dövlət Agentliyi', 'Antiinhisar-İN', '500', '-', 'B76C9AB5D7E34712AF31:60CDE2D60B93', 'Uğursuz', '05.09.2026\n16:05:30'],
  ['12714/DI', 'Miqrasiya proseslərinin tənzimləmə baş idarəsi', 'DMX', 'Azərbaycan Respublikasının İqtisadiyyat Nazirliyi', 'İN(ultra)', '400', '-', '43AB0A1334154BDA883E:851605CACB18', 'Uğursuz', '05.09.2026\n20:15:18'],
  ['MYGOV-20260905-0261', '6W9VKQ3', 'mygov', 'Azərbaycan Respublikası Elm və Təhsil Nazirliyi', 'Təhsil Nazirliyi(prosys)', '400', '-', 'A0DAFADEA2F14116B37B:CE4E65AE1C74', 'Uğursuz', '05.09.2026\n20:01:09'],
  ['3-16-35-22/2-204395/2026', 'Sabunçu rayon icra şöbəsi', 'Ədliyyə(yeni)-bestcomp', '"Kapital Bank" Açıq Səhmdar Cəmiyyəti', 'Kapital Bank', '204', '-', 'A83E4F2C9B1D4756B7A2:E3F1D9C24B8A', 'Uğurlu', '05.09.2026\n21:10:22'],
  ['5-10/2-2116/2026', 'Binəqədi Rayon İcra Hakimiyyəti', 'Sinam(cloud)', 'Azərbaycan Respublikası Ekologiya və Təbii Sərvətlər Nazirliyi', 'Ekologiya Nazirliyi', '204', '-', 'C56A3E9F1D274B8E4A7C:9F02BE4A73C1', 'Uğurlu', '05.09.2026\n20:35:47'],
  ['MYGOV-20260905-0262', '6W9VKQ3', 'mygov', 'Azərbaycan Respublikası Elm və Təhsil Nazirliyi', 'Təhsil Nazirliyi(prosys)', '204', '-', 'D18AF3C7E5B04D6293FA:9AE24C5F13BB', 'Uğurlu', '05.09.2026\n19:45:03'],
  ['3-16-35-22/2-204400/2026', 'Sabunçu rayon icra şöbəsi', 'Ədliyyə(yeni)-bestcomp', '"Kapital Bank" Açıq Səhmdar Cəmiyyəti', 'Kapital Bank', '204', '-', 'E12B4F7A8D3E4C56A9B1:3C8F5A2E9D14', 'Uğurlu', '05.09.2026\n20:22:15'],
  ['3-23-19/2-85/2026', 'Azərbaycan Respublikasının Maliyyə Nazirliyi yanında Maliyyə Elm-Tədris Mərkəzi', 'Maliyyə(Minfin)SESDA.4', 'Azərbaycan Respublikasının Prezidenti yanında Antiinhisar və İstehlak Bazarına Nəzarət Dövlət Agentliyi', 'Antiinhisar-İN', '204', '-', 'F82A5D3E1B9C4F27C4E5:8A1F2E3D6B54', 'Uğurlu', '05.09.2026\n17:48:03'],
  ['3-35-5/2-118/2026', 'Bakı Dövlət Layihə İnstitutu', 'Sinam(cloud)', 'Azərbaycan Respublikası Qida Təhlükəsizliyi Agentliyi', 'AQTA_ESD', '204', '-', 'B4A8C2F5D9E14738B6D9:1F3E5A8C2B47', 'Uğurlu', '05.09.2026\n15:12:44'],
  ['12820/DI', 'Miqrasiya proseslərinin tənzimləmə baş idarəsi', 'DMX', 'Azərbaycan Respublikasının İqtisadiyyat Nazirliyi', 'İN(ultra)', '204', '-', '7C1E9F2A5B3D486C4E7A:9D2F1B8C4A56', 'Uğurlu', '05.09.2026\n11:35:20'],
  ['11-1/4-2/2-3620/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'DİN-in Baş Dövlət Yol Polisi İdarəsi', 'Azərbaycan Respublikasının Daxili İşlər Nazirliyi', '204', '-', 'A9C3E5F8D2B14657C8F1:5E9A2D4B7C13', 'Uğurlu', '04.09.2026\n16:20:11'],
  ['11-1/4-2/2-3625/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Avtomobil Yollarının Mühafizə Xidməti MMC', 'Avtomobil Yollarının Mühafizə Xidməti', '204', '-', 'D5F2A8C1E4B37589A2C6:3B8D5F1A2E97', 'Uğurlu', '05.09.2026\n09:05:33'],
  ['13-10-1/2-201/2026', '"Daşkəsən Dəmir Filiz" MMC', '"Daşkəsən Dəmir Filiz" MMC', 'Azərbaycan Respublikasının Prezidenti yanında Antiinhisar və İstehlak Bazarına Nəzarət Dövlət Agentliyi', 'Antiinhisar-İN', '204', '-', '2E7B4C9F1D8A356B3E4C:8F2A5D1C9B47', 'Uğurlu', '05.09.2026\n13:41:07'],
  ['3-23-19/2-72/2026', 'Azərbaycan Respublikasının Maliyyə Nazirliyi yanında Maliyyə Elm-Tədris Mərkəzi', 'Maliyyə(Minfin)SESDA.4', 'Azərbaycan Respublikasının Prezidenti yanında Antiinhisar və İstehlak Bazarına Nəzarət Dövlət Agentliyi', 'Antiinhisar-İN', '500', '-', '89F4C1B5DE234A7FBB1C:A2E4F73B9C51', 'Uğursuz', '05.09.2026\n18:50:22'],
  ['3-23-19/2-72/2026', 'Azərbaycan Respublikasının Maliyyə Nazirliyi yanında Maliyyə Elm-Tədris Mərkəzi', 'Maliyyə(Minfin)SESDA.4', 'Azərbaycan Respublikasının Prezidenti yanında Antiinhisar və İstehlak Bazarına Nəzarət Dövlət Agentliyi', 'Antiinhisar-İN', '500', '-', 'C7A2D5F8B31E469AF4B7:1D9E4C3A8B26', 'Uğursuz', '05.09.2026\n19:35:47'],
  ['MYGOV-20260905-0261', '6W9VKQ3', 'mygov', 'Azərbaycan Respublikası Elm və Təhsil Nazirliyi', 'Təhsil Nazirliyi(prosys)', '400', '-', 'F9C1A4E8D5B27346B9F2:8E2C5A1D7B93', 'Uğursuz', '05.09.2026\n20:35:41'],
]

export const REPORT_PATH = '/hesabatlar/qurumlar'

export type Difficulty = 'asan' | 'orta' | 'cetin'

export type AnalysisCategory =
  | 'Şəbəkə'
  | 'Sertifikat'
  | 'Qəbul edən sistem'
  | 'Format'
  | 'Vaxt aşımı'
  | 'Avtorizasiya'

export type Analysis = {
  detectedError: string
  category: AnalysisCategory
  difficulty: Difficulty
  confidence: number
  rootCause: string
  suggestedAssignee: { entity: string; team: string }
  logRefs: readonly string[]
}

const analysesByIndex: Readonly<Record<number, Analysis>> = {
  1: {
    detectedError: 'Sorğu ölçüsü limitini aşması (413 Request Entity Too Large)',
    category: 'Qəbul edən sistem',
    difficulty: 'orta',
    confidence: 87,
    rootCause: 'Göndərilən paket qəbul edən tərəfin icazə verdiyi maksimum ölçünü aşır (2.4 MB > 2.0 MB). Sənədin bölünməsi və ya limitin artırılması tələb olunur.',
    suggestedAssignee: {
      entity: 'DİN — Baş Dövlət Yol Polisi İdarəsi',
      team: 'İnteqrasiya komandası',
    },
    logRefs: [
      '2026-09-01T14:49:02Z ERROR gateway.dispatch status=413 size=2.4MB limit=2.0MB',
      '2026-09-01T14:49:02Z WARN retry policy exhausted after 3 attempts',
    ],
  },
  2: {
    detectedError: 'Qoşulma rədd edildi (Connection refused)',
    category: 'Şəbəkə',
    difficulty: 'asan',
    confidence: 92,
    rootCause: 'TCP əlaqəsi qəbul edən sistem tərəfindən rədd edildi (ECONNREFUSED). Ehtimal olunan səbəb: qarşı tərəfin xidməti dayanıb və ya port bloklanıb.',
    suggestedAssignee: {
      entity: 'Şəbəkə İnfrastrukturu Komandası',
      team: '24/7 dəstək',
    },
    logRefs: [
      '2026-09-01T14:48:44Z ERROR gateway.transport ECONNREFUSED peer=192.168.14.22:8443',
      '2026-09-01T14:48:44Z INFO circuit-breaker=open ttl=30s',
    ],
  },
  3: {
    detectedError: 'Servis müvəqqəti əlçatan deyil (503)',
    category: 'Qəbul edən sistem',
    difficulty: 'cetin',
    confidence: 68,
    rootCause: 'Qəbul edən sistem son 12 dəqiqədir 503 (Service Unavailable) qaytarır. Səhv sabit təkrarlanır — sistem tərəfində davamlı problem ehtimalı yüksəkdir.',
    suggestedAssignee: {
      entity: 'DİN — Baş Dövlət Yol Polisi İdarəsi',
      team: 'Servis operatorları',
    },
    logRefs: [
      '2026-09-01T14:46:04Z ERROR gateway.dispatch status=503 upstream=police-esd',
      '2026-09-01T14:46:04Z ERROR upstream health-check failed streak=8',
      '2026-09-01T14:46:04Z WARN escalation triggered severity=high',
    ],
  },
  4: {
    detectedError: 'Validasiya xətası (400)',
    category: 'Format',
    difficulty: 'orta',
    confidence: 79,
    rootCause: 'Sorğu bədəni gözlənilən XSD sxeminə uyğun deyil: “DocumentType” elementi yoxdur. Göndərən tərəfin şablonunda dəyişiklik ehtimalı var.',
    suggestedAssignee: {
      entity: 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi',
      team: 'İnteqrasiya komandası',
    },
    logRefs: [
      '2026-09-01T14:45:55Z ERROR validator.xsd missing-element=DocumentType',
      '2026-09-01T14:45:55Z INFO validator.schema version=2.1.0',
    ],
  },
  5: {
    detectedError: 'SSL/Sertifikat xətası',
    category: 'Sertifikat',
    difficulty: 'asan',
    confidence: 95,
    rootCause: 'Göndərən tərəfin TLS sertifikatının müddəti bitmişdir (expired 2026-08-30). Yeni sertifikatın yüklənməsi tələb olunur.',
    suggestedAssignee: {
      entity: 'RSD Platforma Komandası',
      team: 'Sertifikat mərkəzi',
    },
    logRefs: [
      '2026-09-01T14:45:20Z ERROR tls.handshake certificate-expired notAfter=2026-08-30',
      '2026-09-01T14:45:20Z INFO client=azavt-yollari fingerprint=8FA0…5538',
    ],
  },
  6: {
    detectedError: 'Timeout (vaxt bitməsi)',
    category: 'Vaxt aşımı',
    difficulty: 'cetin',
    confidence: 73,
    rootCause: 'Yuxarı axın (upstream) 30 saniyəlik cavab vermə limitini aşdı. Son 24 saatda oxşar hadisələrin sayı 6 dəfə artıb.',
    suggestedAssignee: {
      entity: 'DİN — Baş Dövlət Yol Polisi İdarəsi',
      team: 'Performans komandası',
    },
    logRefs: [
      '2026-09-01T14:45:19Z ERROR gateway.dispatch timeout=30s upstream=police-esd',
      '2026-09-01T14:45:19Z WARN latency p95=28.4s baseline=4.1s',
      '2026-09-01T14:45:19Z INFO similar-incidents-24h=6',
    ],
  },
  7: {
    detectedError: 'Avtorizasiya xətası (401)',
    category: 'Avtorizasiya',
    difficulty: 'asan',
    confidence: 89,
    rootCause: 'Qəbul edən sistem sorğunu 401 (Unauthorized) ilə rədd etdi. Ehtimal olunan səbəb: API açarının müddəti bitib və ya yenilənməyib.',
    suggestedAssignee: {
      entity: 'RSD Platforma Komandası',
      team: 'İdentifikasiya xidməti',
    },
    logRefs: [
      '2026-09-01T14:44:25Z ERROR gateway.dispatch status=401 reason="invalid_token"',
      '2026-09-01T14:44:25Z INFO token.issuedAt=2026-06-15 age=80d ttl=90d',
    ],
  },
  8: {
    detectedError: 'Server daxili xətası (500)',
    category: 'Qəbul edən sistem',
    difficulty: 'orta',
    confidence: 76,
    rootCause: 'Kapital Bank sistemi 500 (Internal Server Error) qaytardı. Cavab bədənində detal yoxdur — bank tərəfində araşdırılmalıdır.',
    suggestedAssignee: {
      entity: '"Kapital Bank" ASC',
      team: 'API dəstək komandası',
    },
    logRefs: [
      '2026-07-13T08:53:35Z ERROR gateway.dispatch status=500 upstream=kapital-bank',
      '2026-07-13T08:53:35Z INFO response.body="{\\"error\\":\\"Internal Server Error\\"}"',
    ],
  },
  9: {
    detectedError: 'Server daxili xətası (500)',
    category: 'Qəbul edən sistem',
    difficulty: 'orta',
    confidence: 74,
    rootCause: 'Antiinhisar Dövlət Agentliyi sistemi 500 qaytardı. Cavabda detal yoxdur, oxşar hadisələr son 24 saat ərzində təkrarlanır.',
    suggestedAssignee: {
      entity: 'Antiinhisar Dövlət Agentliyi',
      team: 'İnteqrasiya komandası',
    },
    logRefs: [
      '2026-09-05T18:20:15Z ERROR gateway.dispatch status=500 upstream=antiinhisar-in',
      '2026-09-05T18:20:15Z WARN similar-incidents-24h=3',
    ],
  },
  10: {
    detectedError: 'Sənəd artıq qəbul edilib',
    category: 'Format',
    difficulty: 'asan',
    confidence: 91,
    rootCause: 'Ekologiya Nazirliyi bu sənədin artıq qəbul edildiyini bildirir. Sənəd təkrar göndərildiyi üçün rədd edilmişdir — göndərən tərəfdə dublikat yoxlanılmalıdır.',
    suggestedAssignee: {
      entity: 'Binəqədi Rayon İcra Hakimiyyəti',
      team: 'Sənəd dövriyyəsi',
    },
    logRefs: [
      '2026-08-26T12:39:32Z ERROR gateway.dispatch status=409 reason="duplicate"',
      '2026-08-26T12:39:32Z INFO first-submission-at=2026-08-26T09:12:11Z',
    ],
  },
  11: {
    detectedError: 'Naməlum xəta (server daxili)',
    category: 'Qəbul edən sistem',
    difficulty: 'cetin',
    confidence: 65,
    rootCause: 'AQTA sistemi OutOfMemoryException atdı. Qəbul edən sistemdə yaddaş problemi mümkündür — təcili baxılmalıdır.',
    suggestedAssignee: {
      entity: 'Qida Təhlükəsizliyi Agentliyi',
      team: 'Servis operatorları',
    },
    logRefs: [
      '2026-09-05T05:15:42Z ERROR gateway.dispatch status=400 upstream=aqta-esd',
      '2026-09-05T05:15:42Z ERROR upstream.exception="System.OutOfMemoryException"',
      '2026-09-05T05:15:42Z WARN escalation triggered severity=high',
    ],
  },
  12: {
    detectedError: 'Server daxili xətası (500)',
    category: 'Qəbul edən sistem',
    difficulty: 'orta',
    confidence: 78,
    rootCause: 'Antiinhisar Dövlət Agentliyi sistemi 500 qaytardı. Eyni gün ərzində 2-ci hadisə — Antiinhisar tərəfində sistematik problem ehtimalı var.',
    suggestedAssignee: {
      entity: 'Antiinhisar Dövlət Agentliyi',
      team: 'İnteqrasiya komandası',
    },
    logRefs: [
      '2026-09-05T12:05:30Z ERROR gateway.dispatch status=500 upstream=antiinhisar-in',
      '2026-09-05T12:05:30Z INFO same-day-incidents=2',
    ],
  },
  13: {
    detectedError: 'Bucket upload xətası',
    category: 'Format',
    difficulty: 'orta',
    confidence: 82,
    rootCause: 'Fayl (attachment) yükləməsi müvəffəqiyyətsiz oldu. S3/bucket konfiqurasiyası və ya faylın həcmi ilə bağlı ola bilər.',
    suggestedAssignee: {
      entity: 'RSD Platforma Komandası',
      team: 'Fayl yükləmə xidməti',
    },
    logRefs: [
      '2026-09-05T16:15:18Z ERROR upload.attachment status=400 trace=43AB0A13…851605CACB18',
      '2026-09-05T16:15:18Z INFO bucket=rsd-attachments retry=2/3',
    ],
  },
  14: {
    detectedError: 'SSL/Sertifikat xətası',
    category: 'Sertifikat',
    difficulty: 'asan',
    confidence: 89,
    rootCause: 'Proxy online signer PDF-in imzasını təsdiqləyə bilmədi (SIGN_NOT_VERIFIED). Sənədin imzası etibarsızdır və ya sertifikat müddəti bitib.',
    suggestedAssignee: {
      entity: 'RSD Platforma Komandası',
      team: 'Sertifikat mərkəzi',
    },
    logRefs: [
      '2026-09-05T16:01:09Z ERROR proxy.signer SIGN_NOT_VERIFIED result=failure',
      '2026-09-05T16:01:09Z INFO document=MYGOV-20260905-0261 source=mygov',
    ],
  },
}

export const getAnalysis = (index: number): Analysis | undefined =>
  analysesByIndex[index]

export const hasAnalysis = (index: number): boolean =>
  index in analysesByIndex

export const STALENESS_THRESHOLDS = {
  warningMinutes: 120,
  overdueMinutes: 360,
} as const

const sentMinutesAgoByIndex: Readonly<Record<number, number>> = {
  1: 30,
  2: 90,
  3: 140,
  4: 240,
  5: 340,
  6: 480,
  7: 1560,
  8: 45,
  9: 180,
  10: 250,
  11: 720,
  12: 300,
  13: 60,
  14: 60,
  25: 130,
  26: 80,
  27: 30,
}

const moduleLoadedAt = Date.now()

export function getSentAt(index: number): string | undefined {
  const offset = sentMinutesAgoByIndex[index]
  if (offset === undefined) return undefined
  return new Date(moduleLoadedAt - offset * 60_000).toISOString()
}

export type StalenessTier = 'fresh' | 'warning' | 'overdue'

export function getAgeMinutes(sentAt: string, now: number): number {
  return Math.max(0, Math.floor((now - new Date(sentAt).getTime()) / 60_000))
}

export function getStalenessTier(ageMinutes: number): StalenessTier {
  if (ageMinutes >= STALENESS_THRESHOLDS.overdueMinutes) return 'overdue'
  if (ageMinutes >= STALENESS_THRESHOLDS.warningMinutes) return 'warning'
  return 'fresh'
}

export function formatAge(minutes: number): string {
  if (minutes < 1) return 'indi'
  if (minutes < 60) return `${minutes} dəq`
  const hours = Math.floor(minutes / 60)
  const remMin = minutes % 60
  if (hours < 24) return remMin === 0 ? `${hours} saat` : `${hours} saat ${remMin} dəq`
  const days = Math.floor(hours / 24)
  const remHours = hours % 24
  return remHours === 0 ? `${days} gün` : `${days} gün ${remHours} saat`
}

export const stalenessMeta: Readonly<
  Record<
    StalenessTier,
    {
      label: string
      dotClass: string
      bgClass: string
      textClass: string
      borderClass: string
      leftAccentClass: string
    }
  >
> = {
  fresh: {
    label: 'Yeni',
    dotClass: 'bg-[#8a8f96]',
    bgClass: 'bg-transparent',
    textClass: 'text-[#61656b]',
    borderClass: 'border-[#e0e3e7]',
    leftAccentClass: '',
  },
  warning: {
    label: 'Diqqət',
    dotClass: 'bg-[#b26a00]',
    bgClass: 'bg-[#fff5e5]',
    textClass: 'text-[#b26a00]',
    borderClass: 'border-[#f4d9a8]',
    leftAccentClass: 'border-l-[3px] border-l-[#b26a00]',
  },
  overdue: {
    label: 'Gecikmiş',
    dotClass: 'bg-[#c73030]',
    bgClass: 'bg-[#fdecec]',
    textClass: 'text-[#c73030]',
    borderClass: 'border-[#f4c2c2]',
    leftAccentClass: 'border-l-[3px] border-l-[#c73030]',
  },
}

export const difficultyMeta: Readonly<
  Record<Difficulty, { label: string; dotClass: string; bgClass: string; textClass: string; borderClass: string }>
> = {
  asan: {
    label: 'Asan',
    dotClass: 'bg-[#178a4c]',
    bgClass: 'bg-[#e8f5ed]',
    textClass: 'text-[#178a4c]',
    borderClass: 'border-[#b7e0c5]',
  },
  orta: {
    label: 'Orta',
    dotClass: 'bg-[#b26a00]',
    bgClass: 'bg-[#fff5e5]',
    textClass: 'text-[#b26a00]',
    borderClass: 'border-[#f4d9a8]',
  },
  cetin: {
    label: 'Çətin',
    dotClass: 'bg-[#c73030]',
    bgClass: 'bg-[#fdecec]',
    textClass: 'text-[#c73030]',
    borderClass: 'border-[#f4c2c2]',
  },
}
