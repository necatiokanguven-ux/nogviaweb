import { ComparisonRow, FaqItem, RevenueChannel } from '../types';

export type Language = 'tr' | 'en';

export interface Translations {
  brand: {
    name: string;
    tagline: string;
    alternateTagline: string;
    price: string;
    originalPrice: string;
    discountText: string;
  };
  nav: {
    guestGuide: string;
    finance: string;
    videos: string;
    comparison: string;
    faq: string;
    contact: string;
    payOnceBadge: string;
    buyKit: string;
    pricing: string;
  };
  liteDownload: {
    kicker: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    windowsNoteTitle: string;
    windowsNoteSummary: string;
    windowsNoteDetails: string[];
    macNote: string;
    requirementsNote: string;
    downloadButton: string;
    buyFullLink: string;
    trustOffline: string;
    trustNoAccount: string;
    trustUpgrade: string;
    showDetails: string;
    hideDetails: string;
    limitedTitle: string;
    limitedFeatures: string[];
    formTitle: string;
    formSubtitle: string;
    firstNameLabel: string;
    firstNamePlaceholder: string;
    lastNameLabel: string;
    lastNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    consentLabel: string;
    consentRequired: string;
    requiredFields: string;
    sendCodeButton: string;
    sendingCode: string;
    codeLabel: string;
    codePlaceholder: string;
    codeSent: string;
    verifyButton: string;
    verifying: string;
    resendCode: string;
    resendCooldown: string;
    downloadReady: string;
    startDownload: string;
    invalidCode: string;
    requestError: string;
    verifyError: string;
  };
  pricing: {
    kicker: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    oneTime: string;
    bestValue: string;
    buyButton: string;
    guarantee: string;
    guestGuideTitle: string;
    guestGuideSub: string;
    guestGuideFeatures: string[];
    financeTitle: string;
    financeSub: string;
    financeFeatures: string[];
    hostKitTitle: string;
    hostKitSub: string;
    hostKitFeatures: string[];
    liteBadge: string;
    liteTitle: string;
    liteSub: string;
    liteFeatures: string[];
    liteButton: string;
    freeLabel: string;
  };
  contact: {
    kicker: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectGeneral: string;
    subjectOrder: string;
    subjectTechnical: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
    mailtoHint: string;
    privacyNote: string;
    replyNote: string;
  };
  footer: {
    contact: string;
  };
  payment: {
    kicker: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    backHome: string;
    productLabel: string;
    productHint: string;
    methodLabel: string;
    methodHint: string;
    selectedProduct: string;
    accountHolder: string;
    ibanTry: string;
    ibanUsd: string;
    bankIntro: string;
    bankTlNote: string;
    bankCurrencyWarning: string;
    bankNote: string;
    cryptoIntro: string;
    cryptoWarning: string;
    linkIntro: string;
    etsyCta: string;
    lemonCta: string;
    linkNote: string;
    linkPriceWarning: string;
    noteLabel: string;
    notePlaceholder: string;
    noteHint: string;
    notifySupport: string;
    emailSubject: string;
    footerNote: string;
    copy: string;
    copied: string;
    methods: {
      bank: string;
      crypto: string;
      link: string;
    };
    products: {
      hostKit: string;
      guestGuide: string;
      finance: string;
    };
  };
  hero: {
    kicker: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaTrial: string;
    ctaSecondary: string;
    badge1: string;
    badge2: string;
    badge3: string;
    tab1: string;
    tab2: string;
    tab3: string;
    demoTag: string;
    demoHeadline: string;
    demoDesc: string;
    openGuestGuide: string;
    openFinance: string;
  };
  problemSolution: {
    kicker: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    cards: Array<{
      title: string;
      desc: string;
    }>;
    tableTitle: string;
    colFeature: string;
    colSaas: string;
    colNogvia: string;
  };
  guestGuide: {
    kicker: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    tag: string;
    tabOverview: string;
    tabWifi: string;
    tabRules: string;
    tabLocal: string;
    welcomeTag: string;
    welcomeTitle: string;
    checkInLabel: string;
    checkOutLabel: string;
    wifiTitle: string;
    wifiNet: string;
    wifiPass: string;
    copyPass: string;
    copied: string;
    quietHours: string;
    callHost: string;
    whatsApp: string;
    feat1Title: string;
    feat1Desc: string;
    feat2Title: string;
    feat2Desc: string;
    feat3Title: string;
    feat3Desc: string;
    buyButton: string;
  };
  finance: {
    kicker: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    dashTitle: string;
    dashTag: string;
    ytd: string;
    q3: string;
    fullYear: string;
    exportExcel: string;
    exportedExcel: string;
    revLabel: string;
    revSub: string;
    expLabel: string;
    expSub: string;
    netLabel: string;
    netSub: string;
    propLabel: string;
    propSub: string;
    chartTitle: string;
    chartSub: string;
    feat1Title: string;
    feat1Desc: string;
    feat2Title: string;
    feat2Desc: string;
    feat3Title: string;
    feat3Desc: string;
    excelExportTitle: string;
    excelExportDesc: string;
    buyButton: string;
  };
  videos: {
    kicker: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    video1Tab: string;
    video2Tab: string;
    v1Tag: string;
    v1Title: string;
    v1Sub: string;
    v1Timeline: {
      t1: string;
      t2: string;
      t3: string;
      t4: string;
    };
    v1Feat1Title: string;
    v1Feat1Desc: string;
    v1Feat2Title: string;
    v1Feat2Desc: string;
    v2Tag: string;
    v2Title: string;
    v2Sub: string;
    v2Timeline: {
      t1: string;
      t2: string;
      t3: string;
    };
    v2FeatTitle: string;
    v2FeatDesc: string;
    ctaTitle: string;
    ctaSub: string;
    buyButton: string;
  };
  bundle: {
    kicker: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    f1Title: string;
    f1Desc: string;
    f2Title: string;
    f2Desc: string;
    processTitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    licenseTag: string;
    buyButton: string;
    guarantee: string;
    checklist: string[];
  };
  faq: {
    kicker: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    allCat: string;
    genCat: string;
    instCat: string;
    priceCat: string;
    guideCat: string;
    finCat: string;
    ctaTitle: string;
    ctaSub: string;
    buyButton: string;
  };
  cta: {
    kicker: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    cardTag: string;
    cardTitle: string;
    cardSub: string;
    oneTimeText: string;
    buyButton: string;
    guarantee: string;
    checklist: string[];
  };
  comparisonData: ComparisonRow[];
  faqData: FaqItem[];
  sampleGuestGuide: {
    propertyName: string;
    subtitle: string;
    address: string;
    wifiNetwork: string;
    wifiPassword: string;
    checkInTime: string;
    checkOutTime: string;
    quietHours: string;
    hostName: string;
    hostPhone: string;
    whatsApp: string;
    houseRules: string[];
    localRecommendations: Array<{ title: string; type: string; note: string }>;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  tr: {
    brand: {
      name: 'nogvia',
      tagline: 'Kiralık evler için çevrimdışı ev sahibi araçları',
      alternateTagline: 'Kiralık mülkünüzü çevrimdışı yönetin — tek kit, sıfır abonelik',
      price: '$49',
      originalPrice: '$58',
      discountText: '%80 İndirim — Tek Sefer Öde, Ömür Boyu Sahip Ol',
    },
    nav: {
      guestGuide: 'Misafir Rehberi',
      finance: 'Finans',
      videos: 'Tanıtım Videoları',
      comparison: 'Karşılaştırma',
      faq: 'SSS',
      contact: 'İletişim',
      payOnceBadge: 'Tek Ödeme $49',
      buyKit: 'Kiti Satın Al',
      pricing: 'Fiyatlar',
    },
    liteDownload: {
      kicker: 'Ücretsiz · Kısıtlı Sürüm',
      title: 'Host Kit',
      titleAccent: 'Lite',
      subtitle:
        'Guest Guide + Finance + Hub — satın almadan önce nogvia\'yı bilgisayarınızda deneyin. Dışa aktarma ve bazı gelişmiş özellikler kısıtlıdır; süre sınırı yoktur.',
      windowsNoteTitle: 'Windows kullanıcıları — indirmeden önce okuyun',
      windowsNoteSummary:
        'Windows, start-all.bat dosyasını ilk çalıştırdığınızda SmartScreen uyarısı gösterebilir. Bağımsız masaüstü uygulamaları için bu normaldir; dosyanın güvensiz olduğu anlamına gelmez.',
      windowsNoteDetails: [
        'ZIP dosyasını indirin ve klasörü çıkarın.',
        'İsteğe bağlı: ZIP\'e sağ tıklayın → Özellikler → Engeli kaldır → Uygula.',
        'Klasörü açın ve start-all.bat (veya start-hub) dosyasını çalıştırın.',
        'SmartScreen görünürse: Daha fazla bilgi → Yine de çalıştır.',
        'nogvia bilgisayarınızda yerel olarak çalışır — çevrimdışı, arka planda gizli servis yok.',
      ],
      macNote: 'Mac kullanıcıları: Aynı klasördeki macOS başlatma dosyasını kullanın (SmartScreen uyarısı yok).',
      requirementsNote: 'Yüklü değilse Python 3 gerekir (python.org\'dan ücretsiz).',
      downloadButton: 'Host Kit Lite İndir (Ücretsiz · Kısıtlı)',
      buyFullLink: 'Tam sürüme hazır mısınız? Host Kit satın alın — $49',
      trustOffline: 'Bilgisayarınızda %100 çevrimdışı',
      trustNoAccount: 'Abonelik veya hesap yok',
      trustUpgrade: 'Aynı uygulamalar — Full sürümle tüm özellikler açılır',
      showDetails: 'Kurulum adımlarını göster',
      hideDetails: 'Kurulum adımlarını gizle',
      limitedTitle: 'Lite sürümde neler kısıtlı?',
      limitedFeatures: [
        'Guest Guide: ZIP/JSON dışa aktarma ve QR PNG/SVG indirme kapalı',
        'Finance: Excel dışa aktarma, JSON içe aktarma ve örnek veri kapalı',
        'Finance: En fazla 1 mülk, 30 gelir ve 30 gider kaydı',
        'Tüm kısıtlamalar Host Kit Full ($49) ile kaldırılır',
      ],
      formTitle: 'İndirmeden önce doğrulayın',
      formSubtitle:
        'Ad, soyad ve e-posta adresinizi girin. E-postanıza 6 haneli doğrulama kodu göndereceğiz — sahte adreslerle indirme engellenir.',
      firstNameLabel: 'Ad',
      firstNamePlaceholder: 'Adınız',
      lastNameLabel: 'Soyad',
      lastNamePlaceholder: 'Soyadınız',
      emailLabel: 'E-posta',
      emailPlaceholder: 'ornek@email.com',
      consentLabel:
        'E-posta adresimin indirme ve nogvia güncellemeleri için kullanılmasına izin veriyorum.',
      consentRequired: 'Devam etmek için onay kutusunu işaretleyin.',
      requiredFields: 'Lütfen ad, soyad ve e-posta alanlarını doldurun.',
      sendCodeButton: 'Doğrulama Kodu Gönder',
      sendingCode: 'Kod gönderiliyor…',
      codeLabel: 'E-posta doğrulama kodu',
      codePlaceholder: '6 haneli kod',
      codeSent: '{email} adresine 6 haneli kod gönderdik. Lütfen kodu girin.',
      verifyButton: 'Kodu Doğrula ve İndir',
      verifying: 'Doğrulanıyor…',
      resendCode: 'Kodu tekrar gönder',
      resendCooldown: 'Tekrar gönder ({seconds}s)',
      downloadReady: 'E-posta doğrulandı. Host Kit Lite indirmeye hazırsınız.',
      startDownload: 'Host Kit Lite İndir',
      invalidCode: 'Lütfen 6 haneli doğrulama kodunu girin.',
      requestError: 'Doğrulama kodu gönderilemedi. Lütfen tekrar deneyin.',
      verifyError: 'Doğrulama kodu geçersiz veya süresi dolmuş.',
    },
    pricing: {
      kicker: 'Tek Sefer Öde • Abonelik Yok',
      title: 'İhtiyacınıza Uygun',
      titleAccent: 'Yazılımı Seçin',
      subtitle: 'Misafir rehberi, finans takibi veya ikisini birden içeren Host Kit — hepsi tek seferlik ödeme, ömür boyu kullanım.',
      oneTime: 'Tek seferlik',
      bestValue: 'En İyi Değer',
      buyButton: 'Satın Al',
      guarantee: 'Anında dijital indirme • Güvenli ödeme',
      guestGuideTitle: 'Guest Guide Builder',
      guestGuideSub: 'Markalı dijital misafir rehberleri oluşturun. QR ile telefondan düzenleyin.',
      guestGuideFeatures: [
        'Markalı dijital misafir rehberi',
        'QR kod ile telefondan düzenleme',
        'Misafirler için dışa aktarma',
        'Mac ve Windows uyumlu',
      ],
      financeTitle: 'nogvia Finance',
      financeSub: 'Gelir, gider ve doluluk takibi. Excel uyumlu raporlar.',
      financeFeatures: [
        'Gelir ve gider takibi',
        'Excel (.xlsx) dışa aktarma',
        'Çoklu mülk desteği',
        '%100 çevrimdışı ve gizli',
      ],
      hostKitTitle: 'nogvia Host Kit',
      hostKitSub: 'Guest Guide + Finance + Hub launcher — tam paket.',
      hostKitFeatures: [
        'Guest Guide Builder (tam sürüm)',
        'nogvia Finance (tam sürüm)',
        'nogvia Hub çalışma alanı',
        'Ayrı ayrı almaya göre tasarruf',
      ],
      liteBadge: 'Ücretsiz · Kısıtlı',
      liteTitle: 'nogvia Host Kit Lite',
      liteSub:
        'Guest Guide + Finance + Hub — deneyin. Dışa aktarma ve bazı gelişmiş özellikler kısıtlıdır.',
      liteFeatures: [
        'Guest Guide + Finance + Hub dahil',
        'Hesap veya kredi kartı gerekmez',
        '%100 çevrimdışı, bilgisayarınızda çalışır',
        'Dışa aktarma ve içe aktarma — Full sürümde açılır',
      ],
      liteButton: 'Ücretsiz İndir',
      freeLabel: 'Ücretsiz',
    },
    contact: {
      kicker: 'İletişim',
      title: 'Sorularınız mı',
      titleAccent: 'var?',
      subtitle: 'Sipariş, kurulum veya teknik destek için bize yazın. Genellikle 48 saat içinde yanıtlıyoruz.',
      nameLabel: 'Adınız',
      namePlaceholder: 'Ad Soyad',
      emailLabel: 'E-posta',
      emailPlaceholder: 'ornek@email.com',
      subjectLabel: 'Konu',
      subjectGeneral: 'Genel soru',
      subjectOrder: 'Sipariş / satın alma',
      subjectTechnical: 'Teknik destek',
      messageLabel: 'Mesajınız',
      messagePlaceholder: 'Size nasıl yardımcı olabiliriz?',
      submit: 'Mesaj Gönder',
      submitting: 'Gönderiliyor…',
      successTitle: 'Mesajınız alındı',
      successBody: 'Teşekkürler! En kısa sürede size dönüş yapacağız.',
      errorTitle: 'Gönderilemedi',
      errorBody: 'Lütfen tekrar deneyin veya doğrudan e-posta gönderin.',
      mailtoHint: 'Form çalışmıyorsa:',
      privacyNote: 'Form verileriniz yalnızca talebinize yanıt vermek için kullanılır.',
      replyNote: 'Yanıt süresi: genellikle 48 saat içinde.',
    },
    footer: {
      contact: 'İletişim',
    },
    payment: {
      kicker: 'Güvenli Ödeme',
      title: 'Ödeme',
      titleAccent: 'Yöntemini Seç',
      subtitle: 'Havale, kripto veya link ile ödeme yapın. Hangi ürünü alacağınızı seçin; seçtiğiniz yönteme göre talimatlar aşağıda görünür.',
      backHome: 'Ana Sayfa',
      productLabel: 'Ürün',
      productHint: 'Satın almak istediğiniz yazılımı seçin',
      methodLabel: 'Ödeme Yöntemi',
      methodHint: 'Lütfen ödeme yöntemi seçin',
      selectedProduct: 'Seçili ürün',
      accountHolder: 'Hesap Sahibi',
      ibanTry: 'TL Hesabı (IBAN)',
      ibanUsd: 'USD Hesabı (IBAN)',
      bankIntro:
        'Aşağıdaki banka hesaplarından birine havale/EFT yapın. Açıklama kısmına e-posta adresinizi ve ürün adını yazın.',
      bankTlNote:
        'TL ile ödeme yapacaksanız sundoviz.com üzerinden USD satış fiyatını kontrol edin, ürün fiyatını (USD) bu kur ile çarparak bulacağınız tutarı TL olarak havale/EFT yapınız.',
      bankCurrencyWarning:
        'Lütfen USD ve TL hesaplarını karıştırmayınız. USD hesabına TL, TL hesabına USD göndermeyiniz.',
      bankNote:
        'Ödeme açıklamasına mutlaka e-posta adresinizi ve "{product}" yazın. Ödeme sonrası dekontu info@nogvia.com adresine gönderin; indirme linkini 24–48 saat içinde paylaşırız.',
      cryptoIntro:
        'Yalnızca aşağıdaki adrese USDT (TRC-20) gönderin. Gönderim tutarı seçili ürün fiyatına eşit olmalıdır.',
      cryptoWarning:
        'Yalnızca USDT (TRC-20) gönderebilirsiniz. Yanlış ağ veya yanlış kripto türü ile yapılan transferlerden sorumlu değiliz. Lütfen adresi ve kripto türünü göndermeden önce kontrol edin.',
      linkIntro:
        'Aşağıdaki linklerden birini seçerek güvenli ödeme sayfasına gidebilirsiniz. Ödeme harici bir platformda tamamlanır.',
      etsyCta: 'Etsy ile Öde',
      lemonCta: 'Lemon Squeezy ile Öde',
      linkNote: 'Ödeme harici bir güvenli sayfada tamamlanır. nogvia ödeme bilgilerinizi saklamaz.',
      linkPriceWarning:
        'Sitede gösterilen fiyatlar USD cinsindendir. Link ile ödemede Lemon Squeezy veya Etsy checkout ekranında kur farkı, yerel para birimi ve vergiler nedeniyle nihai tutar farklı görünebilir. Bu normaldir; kesin tutar seçtiğiniz platformun ödeme sayfasında gösterilir.',
      noteLabel: 'Not',
      notePlaceholder: 'E-posta adresiniz, sipariş notu veya ödeme referansı…',
      noteHint:
        'Havale veya kripto sonrası destek ekibine bilgi göndermek için notunuzu ekleyip aşağıdaki butonu kullanabilirsiniz.',
      notifySupport: 'Ödemeyi Bildir / Destek',
      emailSubject: 'nogvia ödeme bildirimi',
      footerNote: 'Sorularınız için info@nogvia.com — genellikle 48 saat içinde yanıt.',
      copy: 'Kopyala',
      copied: 'Kopyalandı',
      methods: {
        bank: 'Havale / EFT',
        crypto: 'Kripto',
        link: 'Link ile Öde',
      },
      products: {
        hostKit: 'nogvia Host Kit',
        guestGuide: 'Guest Guide Builder',
        finance: 'nogvia Finance',
      },
    },
    hero: {
      kicker: 'Aylık Ücret YOK • Tek Sefer Öde, Ömür Boyu Sahip Ol',
      title: 'Kiralık Mülkünüzü',
      titleAccent: 'Çevrimdışı Yönetin.',
      subtitle: 'Airbnb ve Vrbo ev sahipleri için eksiksiz masaüstü çalışma alanı. Canva şablonlarına veya buluta bağımlı kalmadan markalı dijital QR misafir rehberleri oluşturun ve finanslarınızı doğrudan bilgisayarınızda takip edin.',
      ctaPrimary: 'Host Kit\'i Satın Al — $49',
      ctaTrial: 'Ücretsiz Kısıtlı Sürüm',
      ctaSecondary: 'Fiyatları Gör',
      badge1: 'Tek Tıkla Yerel Kurulum',
      badge2: '%100 Çevrimdışı ve Gizli',
      badge3: 'Canva Şablonu Değil',
      tab1: 'Yerel Merkez',
      tab2: 'Misafir Rehberi',
      tab3: 'Finans Takibi',
      demoTag: 'Ömür Boyu Lisans',
      demoHeadline: 'Nogvia Masaüstü Hub Çalışma Alanı',
      demoDesc: 'Misafir rehberlerinizi ve kiralama finanslarınızı internet bağlantısı olmadan doğrudan Mac veya Windows bilgisayarınızda yönetin.',
      openGuestGuide: 'Misafir Rehberini Aç',
      openFinance: 'Finans Panelini Aç',
    },
    problemSolution: {
      kicker: 'Aylık SaaS Abonelikleri Ödemeyi Bırakın',
      title: 'Ev Sahipleri Neden',
      titleAccent: 'nogvia\'ya Geçiyor?',
      subtitle: 'Sürekli yenilenen SaaS faturalarına, kesilen bulut bağlantılarına ve katı Canva şablonlarına veda edin. Kısa dönem kiralama sahipleri için üretilmiş gerçek çevrimdışı yazılıma sahip olun.',
      cards: [
        {
          title: 'Aylık SaaS Ücreti Yok',
          desc: 'Abonelikli araçlar yılda $240 - $600 maliyet çıkarır. nogvia Host Kit ile nogvia.com\'den yalnızca bir kez $49 öder ve yazılıma bilgisayarınızda ömür boyu sahip olursunuz.',
        },
        {
          title: '%100 Çevrimdışı ve Gizli',
          desc: 'Finansal kayıtlarınız ve mülk detaylarınız tamamen kendi bilgisayarınızda kalır. Bulut kesintisi yok, veri takibi yok, tam gizlilik.',
        },
        {
          title: 'Gerçek Bağımsız Uygulama',
          desc: 'Canva PDF\'i veya karmaşık Excel makrosu değil. Otomatik misafir rehberi ve finansal raporlama özellikli gerçek masaüstü yazılımı.',
        },
      ],
      tableTitle: 'Karşılaştırma: nogvia vs Standart SaaS Araçları',
      colFeature: 'Özellik',
      colSaas: 'Aylık Abonelikli SaaS / Canva',
      colNogvia: 'nogvia Host Kit ($49)',
    },
    guestGuide: {
      kicker: 'Ürün 1: Misafir Rehberi Oluşturucu',
      title: 'Misafirlerin Severek Kullandığı',
      titleAccent: 'Dijital Rehberler',
      subtitle: 'Saniyeler içinde markalı dijital rehberler oluşturun. Misafirler evinizdeki QR kodu taratarak WiFi, giriş talimatları, ev kuralları ve yerel tavsiyelere anında ulaşsın.',
      tag: 'Dijital Misafir Rehberi',
      tabOverview: 'Genel Bakış',
      tabWifi: 'WiFi',
      tabRules: 'Kurallar',
      tabLocal: 'Mekanlar',
      welcomeTag: 'Evinize Hoş Geldiniz',
      welcomeTitle: 'Sahil Tatil Eviniz',
      checkInLabel: 'Giriş',
      checkOutLabel: 'Çıkış',
      wifiTitle: 'Yüksek Hızlı Misafir WiFi',
      wifiNet: 'Ağ Adı:',
      wifiPass: 'WiFi Şifresi:',
      copyPass: 'Şifreyi Kopyala',
      copied: 'Kopyalandı!',
      quietHours: 'Sessizlik Saatleri:',
      callHost: 'Ev Sahibini Ara',
      whatsApp: 'WhatsApp',
      feat1Title: 'Anında Vektör QR Kod Dışa Aktarımı',
      feat1Desc: 'Evinizin girişine, salonuna veya buzdolabına asmak üzere yüksek çözünürlüklü QR kodlar basın.',
      feat2Title: 'Tek Tıkla WiFi Bağlantısı & Kopyalama',
      feat2Desc: 'Misafirler WiFi şifresini tek tıkla kopyalar, yanlış yazma ve gece yarısı mesajları sona erer.',
      feat3Title: 'Doğrudan Arama & WhatsApp Butonları',
      feat3Desc: 'Acil durumlarda misafirler numara aramadan doğrudan tek tıkla size ulaşabilir.',
      buyButton: 'Guest Guide\'ı Satın Al — $29',
    },
    finance: {
      kicker: 'Ürün 2: nogvia Finans',
      title: 'Kiralama Kârınızı',
      titleAccent: 'Excel Karmaşası Olmadan Yönetin',
      subtitle: 'Airbnb, Vrbo, Booking.com ve doğrudan rezervasyon gelirlerini takip edin. Temizlik ücretlerini, faturaları ve bakım giderlerini anında vergiye hazır Excel raporlarıyla kaydedin.',
      dashTitle: 'nogvia Finans Paneli',
      dashTag: 'Çevrimdışı Yerel Depolama • Otomatik Vergi Kategorizasyonu',
      ytd: '2026 YBB',
      q3: '3. Çeyrek',
      fullYear: 'Tüm Yıl',
      exportExcel: 'Excel Raporunu Al',
      exportedExcel: 'Excel Aktarıldı! (.xlsx)',
      revLabel: 'Toplam Gelir (YBB)',
      revSub: '4 Platform Birleşimi',
      expLabel: 'İşletme Giderleri',
      expSub: 'Temizlik, Faturalar, Malzemeler',
      netLabel: 'Net Kâr',
      netSub: 'Vergi Öncesi Net Gelir',
      propLabel: 'Takip Edilen Mülkler',
      propSub: '3 Ayrı Kiralık Mülk',
      chartTitle: 'Rezervasyon Gelir Dağılımı',
      chartSub: 'Anlık Yerel Hesaplama',
      feat1Title: 'Çoklu Kanal Takibi',
      feat1Desc: 'Airbnb, Vrbo, Booking ve direkt rezervasyon gelirlerini komisyon kesintisi ödemeden listeleyin.',
      feat2Title: 'Vergi Sezonuna Hazır',
      feat2Desc: 'Giderleri bakım, malzeme, sigorta ve faturalar gibi vergi indirimi kategorilerine ayırın.',
      feat3Title: 'Anında Excel Aktarımı',
      feat3Desc: 'Muhasebeciniz veya vergi danışmanınız için biçimlendirilmiş .xlsx dosyalarını tek tıkla oluşturun.',
      excelExportTitle: 'Excel ve Google Sheets\'e Aktarın',
      excelExportDesc: 'Finans tablonuzu tek tıkla .xlsx olarak dışa aktarın, Google Sheets\'e yükleyin ve tüm gelir-gider hareketlerinize her yerden erişin.',
      buyButton: 'nogvia Finance\'ı Satın Al — $29',
    },
    videos: {
      kicker: 'Ürün Tanıtımları ve Videolar',
      title: 'nogvia Host Kit\'i',
      titleAccent: 'İş Başında Görün',
      subtitle: 'Çevrimdışı olarak QR misafir rehberleri oluşturmanın ve finansları yönetmenin ne kadar basit olduğunu izleyin.',
      video1Tab: 'Video 1: Tam Ürün Tanıtımı',
      video2Tab: 'Video 2: Ev Sahibi Dönüşüm Hikayesi',
      v1Tag: 'Eksiksiz Tanıtım',
      v1Title: 'nogvia Host Kit - Gerçek Bağımsız Masaüstü Uygulaması',
      v1Sub: '"TEK SEFER AL, ÖMÜR BOYU KULLAN! CANVA YOK. ŞABLON YOK."',
      v1Timeline: {
        t1: 'QR Kod Taraması',
        t2: 'Mobil Misafir Rehberi',
        t3: 'Masaüstü Düzenleyici',
        t4: 'Finans Paneli',
      },
      v1Feat1Title: 'Anında QR Kod Taraması',
      v1Feat1Desc: 'Misafirler duvardaki çerçeveyi veya etiketi taratarak WiFi şifrelerini ve ev kurallarını anında görüntüler.',
      v1Feat2Title: 'Bütünleşik Masaüstü Merkezi',
      v1Feat2Desc: '`start-hub` ile misafir rehberlerini ve finansları bilgisayarınızdan çevrimdışı yönetin.',
      v2Tag: 'Dönüşüm Hikayesi',
      v2Title: 'Esnemiş Tablolardan Çevrimdışı Huzura',
      v2Sub: 'Dağınık ev sahibi notlarının nogvia ile nasıl şık bir çevrimdışı çalışma alanına dönüştüğünü görün.',
      v2Timeline: {
        t1: 'Kağıt Karmaşası & Stres',
        t2: 'Dönüşüm Süreci',
        t3: 'Düzenli nogvia Çalışma Alanı',
      },
      v2FeatTitle: 'Dağınık Notlara Son Verin',
      v2FeatDesc: 'Kağıt ev kurallarını ve karmaşık hesaplamaları ömür boyu sürecek dijital çevrimdışı bir çözümle değiştirin.',
      ctaTitle: 'Kiralık mülkünüzü düzene sokmaya hazır mısınız?',
      ctaSub: 'nogvia.com üzerinden anında dijital indirme. Tek ödeme $49.',
      buyButton: 'Host Kit\'i Satın Al — $49',
    },
    bundle: {
      kicker: 'Hepsi Bir Arada Ev Sahibi Kiti',
      title: 'Bilgisayarınızda Tek Çalışma Alanı.',
      titleAccent: 'Sıfır Aylık Ücret.',
      subtitle: 'nogvia Host Kit, gerekli tüm ev sahibi uygulamalarını tek bir yerel ortamda sunar. Misafir rehberlerini ve kiralama gelirlerini Mac veya Windows PC\'nizde yan yana yönetin.',
      f1Title: 'Misafir Rehberi Oluşturucu Dahil',
      f1Desc: 'Ev kuralları, WiFi, giriş bilgileri ve mekan önerileri içeren QR kodlu rehberler oluşturun.',
      f2Title: 'nogvia Finans Dahil',
      f2Desc: 'Airbnb, Vrbo, Booking ve Direkt rezervasyon gelir-giderlerini tek tıkla Excel\'e aktarın.',
      processTitle: '3 Adımda Kurulum Süreci:',
      step1Title: 'Adım 1',
      step1Desc: 'Satın alım sonrası ZIP dosyasını nogvia.com\'den indirin',
      step2Title: 'Adım 2',
      step2Desc: '`start-hub` dosyasına çift tıklayın',
      step3Title: 'Adım 3',
      step3Desc: 'Çevrimdışı ev sahibi uygulamanızın keyfini çıkarın',
      licenseTag: 'Ömür Boyu Lisans',
      buyButton: 'Hemen Satın Al — $49',
      guarantee: 'Anında Dijital İndirme • nogvia.com Güvenceli Satış',
      checklist: [
        'Misafir Rehberi Oluşturucu (Tam Sürüm)',
        'nogvia Finans Takipçisi (Tam Sürüm)',
        'nogvia Yerel Çalışma Alanı Hub\'ı',
        'Yüksek Çözünürlüklü QR Kod Dışa Aktarıcı',
        'Excel Tablo Dışa Aktarıcısı (.xlsx)',
        'Mac ve Windows Uyumlu',
      ],
    },
    faq: {
      kicker: 'Sıkça Sorulan Sorular',
      title: 'Aklınıza Takılan',
      titleAccent: 'Sorular Var Mı?',
      subtitle: 'nogvia Host Kit\'in bilgisayarınızda nasıl %100 çevrimdışı çalıştığını öğrenin.',
      allCat: 'Tüm Sorular',
      genCat: 'Genel',
      instCat: 'Kurulum',
      priceCat: 'Fiyatlandırma',
      guideCat: 'Misafir Rehberi',
      finCat: 'Finans',
      ctaTitle: 'nogvia Host Kit\'i satın almaya hazır mısınız?',
      ctaSub: 'nogvia.com üzerinden anında indirme. $49 tek seferlik ödeme, abonelik yok.',
      buyButton: 'Satın Al — $49',
    },
    cta: {
      kicker: 'Tek Ödeme $49 • Ömür Boyu Sahip Ol',
      title: 'Kiralık Mülkünüzü %100',
      titleAccent: 'Çevrimdışı Yönetmeye Hazır Mısınız?',
      subtitle: 'Aylık bulut aboneliklerini bırakıp gerçek çevrimdışı masaüstü yazılımına geçen ev sahiplerine katılın. nogvia Host Kit\'e bugün nogvia.com\'den sahip olun.',
      cardTag: 'Eksiksiz Paket Dahil',
      cardTitle: 'nogvia Host Kit',
      cardSub: 'Misafir Rehberi Oluşturucu + nogvia Finans + Yerel Çalışma Alanı',
      oneTimeText: 'Tek seferlik ödeme',
      buyButton: 'nogvia.com\'den Şimdi Satın Al — $49',
      guarantee: 'Anında Dijital İndirme • nogvia.com Onaylı Güvenli İşlem',
      checklist: [
        'Dijital Misafir Rehberi Oluşturucu',
        'nogvia Finans & Excel Aktarıcısı',
        'Anında Vektör QR Kod Oluşturucu',
        '%100 Çevrimdışı ve Gizli Depolama',
      ],
    },
    comparisonData: [
      {
        feature: 'Fiyatlandırma Modeli',
        saas: '$20 - $50 / ay (Yılda $360+)',
        saasNegative: true,
        nogvia: 'Tek Ödeme $49 (Ömür Boyu)',
        nogviaPositive: true,
      },
      {
        feature: 'İnternet Bağımlılığı',
        saas: 'İnternet kesildiğinde veya sunucu çöktüğünde çalışmaz',
        saasNegative: true,
        nogvia: '%100 Çevrimdışı Masaüstü Yazılımı',
        nogviaPositive: true,
      },
      {
        feature: 'Veri Gizliliği',
        saas: 'Üçüncü taraf sunucularda saklanır ve izlenir',
        saasNegative: true,
        nogvia: 'Bilgisayarınızda %100 Yerel Depolama',
        nogviaPositive: true,
      },
      {
        feature: 'Misafir Rehberi Motoru',
        saas: 'Canva / PDF linkleri veya ücretli abonelik gerektirir',
        saasNegative: true,
        nogvia: 'Bağımsız Uygulama + Anında QR Oluşturucu',
        nogviaPositive: true,
      },
      {
        feature: 'Finansal Takipçi',
        saas: 'Sıradan tablolar veya pahalı muhasebe yazılımları',
        saasNegative: true,
        nogvia: 'Özel Ev Sahibi Finans Takibi + Excel Aktarımı',
        nogviaPositive: true,
      },
      {
        feature: 'Kurulum Kolaylığı',
        saas: 'Karmaşık üyelikler ve sürekli ödeme kartları',
        saasNegative: true,
        nogvia: 'Tek Tıkla Yerel Kurulum (Mac & Windows)',
        nogviaPositive: true,
      },
    ],
    faqData: [
      {
        category: 'pricing',
        question: 'Bu gerçekten aylık ücreti olmayan tek seferlik bir ödeme mi?',
        answer: 'Evet! Kesinlikle hiçbir aylık abonelik veya gizli ücret yoktur. nogvia Host Kit\'i nogvia.com\'den bir kez satın alır ve yazılıma bilgisayarınızda ömür boyu sahip olursunuz.',
      },
      {
        category: 'general',
        question: 'nogvia bir Canva şablonu mu yoksa gerçek bir yazılım mı?',
        answer: 'nogvia gerçek bir bağımsız masaüstü yazılımıdır. Elle tasarım gerektiren Canva şablonlarının aksine, nogvia dijital misafir rehberinizi ve finans raporlarınızı saniyeler içinde otomatik olarak oluşturur.',
      },
      {
        category: 'installation',
        question: 'Kurulum ne kadar zor?',
        answer: 'Teknik bilgisi olmayan ev sahipleri için tasarlandı! İndirilen klasör basit bir 1-tıkla başlatıcı (`start-hub`) içerir. Mac veya Windows bilgisayarınızda nogvia yerel çalışma alanını açmak için tıklamanız yeterlidir.',
      },
      {
        category: 'guest-guide',
        question: 'Misafirler dijital rehberi telefonlarında nasıl görüntüler?',
        answer: 'Oluşturulan QR kodu mülkünüzün içine bastığınızda (veya bağlantıyı gönderdiğinizde), misafirler telefon kameralarını QR koda tutar. Rehber, herhangi bir uygulama indirmelerine gerek kalmadan mobil web düzeninde anında açılır.',
      },
      {
        category: 'finance',
        question: 'nogvia Finans\'ta birden fazla kiralık mülkü takip edebilir miyim?',
        answer: 'Evet! Birden fazla mülk (örn. Sahil Villası, Dağ Evi, Şehir Dairesi) için gelir ve giderleri kaydedebilir, platforma göre (Airbnb, Vrbo, Booking.com, Direkt) gelirleri filtreleyebilir ve tek tıkla Microsoft Excel\'e aktarabilirsiniz.',
      },
      {
        category: 'general',
        question: 'Verilerim gizli kalıyor mu?',
        answer: '%100. Tüm misafir detaylarınız, ev notlarınız, gelir kayıtlarınız ve giderleriniz doğrudan kendi cihazınızda saklanır. Hiçbir şey uzak bulut sunucularına gönderilmez veya üçüncü taraflara satılmaz.',
      },
    ],
    sampleGuestGuide: {
      propertyName: 'Gün Batımı Sahil Villası',
      subtitle: 'Özel havuzlu ve deniz manzaralı lüks konaklama',
      address: 'Sahil Caddesi No: 142, Bodrum',
      wifiNetwork: 'GunBatimi_Misafir_5G',
      wifiPassword: 'BodrumGunesi2026!',
      checkInTime: '15:00',
      checkOutTime: '11:00',
      quietHours: '22:00 - 08:00',
      hostName: 'Ahmet & Zeynep',
      hostPhone: '+90 (532) 123-4567',
      whatsApp: '+90 (532) 123-4567',
      houseRules: [
        'Mülk içerisinde sigara veya elektronik sigara içmek yasaktır.',
        'Komşulara saygı amacıyla 22:00 - 08:00 saatleri arasında sessizlik saatleri geçerlidir.',
        'Lütfen eve girişte ayakkabılarınızı çıkarınız.',
        'Kayıtsız misafir veya parti düzenlenmesine izin verilmez.',
      ],
      localRecommendations: [
        'Liman Balıkçısı — Denize sıfır gün batımı manzaralı taze deniz ürünleri (2 dk yürüme)',
        'Altın Kum Plajı — Sabah yüzmeleri için sakin ve temiz koy (800m)',
        'Organik Fırın & Kafe — Taze yerel poğaçalar ve günlük taze kahve',
      ].map((item, idx) => {
        const parts = item.split(' — ');
        return {
          title: parts[0],
          type: idx === 0 ? 'Yemek' : idx === 1 ? 'Gezilecek Yer' : 'Market & Kafe',
          note: parts[1] || item,
        };
      }),
    },
  },
  en: {
    brand: {
      name: 'nogvia',
      tagline: 'Offline host tools for vacation rentals',
      alternateTagline: 'Run your rental offline — one kit, zero subscriptions',
      price: '$49',
      originalPrice: '$58',
      discountText: 'Save vs buying separately — pay once, own forever',
    },
    nav: {
      guestGuide: 'Guest Guide',
      finance: 'Finance',
      videos: 'Videos',
      comparison: 'Comparison',
      faq: 'FAQ',
      contact: 'Contact',
      payOnceBadge: 'Pay Once $49',
      buyKit: 'Get Host Kit',
      pricing: 'Pricing',
    },
    liteDownload: {
      kicker: 'Free · Limited Edition',
      title: 'Host Kit',
      titleAccent: 'Lite',
      subtitle:
        'Guest Guide + Finance + Hub — try nogvia on your computer before you buy. Export and some advanced features are limited; there is no time limit.',
      windowsNoteTitle: 'Windows users — read before you download',
      windowsNoteSummary:
        'Windows may show a SmartScreen message the first time you run start-all.bat. This is normal for independent desktop apps and does not mean the file is unsafe.',
      windowsNoteDetails: [
        'Download the ZIP and extract the folder.',
        'Optional: Right-click the ZIP → Properties → Unblock → Apply.',
        'Open the folder and run start-all.bat (or start-hub).',
        'If SmartScreen appears: More info → Run anyway.',
        'nogvia runs locally on your PC — offline, with no hidden background services.',
      ],
      macNote: 'Mac users: use the macOS start file in the same folder (no SmartScreen prompt).',
      requirementsNote: 'Requires Python 3 (free from python.org) if not already installed.',
      downloadButton: 'Download Host Kit Lite (Free · Limited)',
      buyFullLink: 'Ready for the full version? Buy Host Kit — $49',
      trustOffline: '100% offline on your computer',
      trustNoAccount: 'No subscription or account',
      trustUpgrade: 'Same apps — unlock everything with Host Kit Full',
      showDetails: 'Show setup steps',
      hideDetails: 'Hide setup steps',
      limitedTitle: 'What is limited in Lite?',
      limitedFeatures: [
        'Guest Guide: ZIP/JSON export and QR PNG/SVG download are locked',
        'Finance: Excel export, JSON import, and sample data are locked',
        'Finance: Up to 1 property, 30 income, and 30 expense entries',
        'All limits removed with Host Kit Full ($49)',
      ],
      formTitle: 'Verify before you download',
      formSubtitle:
        'Enter your name and email. We will send a 6-digit verification code — fake addresses cannot download.',
      firstNameLabel: 'First name',
      firstNamePlaceholder: 'Your first name',
      lastNameLabel: 'Last name',
      lastNamePlaceholder: 'Your last name',
      emailLabel: 'Email',
      emailPlaceholder: 'you@example.com',
      consentLabel:
        'I agree that my email may be used for this download and occasional nogvia updates.',
      consentRequired: 'Please accept the consent checkbox to continue.',
      requiredFields: 'Please fill in your first name, last name, and email.',
      sendCodeButton: 'Send Verification Code',
      sendingCode: 'Sending code…',
      codeLabel: 'Email verification code',
      codePlaceholder: '6-digit code',
      codeSent: 'We sent a 6-digit code to {email}. Enter it below.',
      verifyButton: 'Verify Code & Download',
      verifying: 'Verifying…',
      resendCode: 'Resend code',
      resendCooldown: 'Resend in {seconds}s',
      downloadReady: 'Email verified. You are ready to download Host Kit Lite.',
      startDownload: 'Download Host Kit Lite',
      invalidCode: 'Please enter the 6-digit verification code.',
      requestError: 'Could not send the verification code. Please try again.',
      verifyError: 'Invalid or expired verification code.',
    },
    pricing: {
      kicker: 'Pay Once • No Subscription',
      title: 'Choose the',
      titleAccent: 'Right Tool',
      subtitle: 'Guest guide builder, finance tracker, or the complete Host Kit bundle — all one-time purchases with lifetime use.',
      oneTime: 'One-time',
      bestValue: 'Best Value',
      buyButton: 'Buy Now',
      guarantee: 'Instant digital download • Secure checkout',
      guestGuideTitle: 'Guest Guide Builder',
      guestGuideSub: 'Create branded digital guest guides. Edit on your phone via QR.',
      guestGuideFeatures: [
        'Branded digital guest guides',
        'QR phone editing',
        'Export for guests',
        'Mac & Windows compatible',
      ],
      financeTitle: 'nogvia Finance',
      financeSub: 'Track income, expenses, and occupancy. Excel-compatible reports.',
      financeFeatures: [
        'Income & expense tracking',
        'Excel (.xlsx) export',
        'Multiple properties',
        '100% offline & private',
      ],
      hostKitTitle: 'nogvia Host Kit',
      hostKitSub: 'Guest Guide + Finance + Hub launcher — the complete bundle.',
      hostKitFeatures: [
        'Guest Guide Builder (full version)',
        'nogvia Finance (full version)',
        'nogvia Hub workspace',
        'Save vs buying separately',
      ],
      liteBadge: 'Free · Limited',
      liteTitle: 'nogvia Host Kit Lite',
      liteSub:
        'Guest Guide + Finance + Hub — try before you buy. Export and some advanced features are limited.',
      liteFeatures: [
        'Guest Guide + Finance + Hub included',
        'No account or credit card required',
        '100% offline on your computer',
        'Export and import — unlocked in Full edition',
      ],
      liteButton: 'Download Free',
      freeLabel: 'Free',
    },
    contact: {
      kicker: 'Contact',
      title: 'Questions?',
      titleAccent: 'We\'re here.',
      subtitle: 'Reach out for orders, setup help, or technical support. We typically reply within 48 hours.',
      nameLabel: 'Your name',
      namePlaceholder: 'Full name',
      emailLabel: 'Email',
      emailPlaceholder: 'you@example.com',
      subjectLabel: 'Subject',
      subjectGeneral: 'General question',
      subjectOrder: 'Order / purchase',
      subjectTechnical: 'Technical support',
      messageLabel: 'Message',
      messagePlaceholder: 'How can we help?',
      submit: 'Send Message',
      submitting: 'Sending…',
      successTitle: 'Message received',
      successBody: 'Thank you! We will get back to you as soon as possible.',
      errorTitle: 'Could not send',
      errorBody: 'Please try again or email us directly.',
      mailtoHint: 'If the form does not work:',
      privacyNote: 'Your form data is used only to respond to your request.',
      replyNote: 'Response time: usually within 48 hours.',
    },
    footer: {
      contact: 'Contact',
    },
    payment: {
      kicker: 'Secure Checkout',
      title: 'Choose Your',
      titleAccent: 'Payment Method',
      subtitle:
        'Pay by bank transfer, crypto, or payment link. Select your product first — instructions update based on the method you choose.',
      backHome: 'Back to Home',
      productLabel: 'Product',
      productHint: 'Select the software you want to purchase',
      methodLabel: 'Payment Method',
      methodHint: 'Please select a payment method',
      selectedProduct: 'Selected product',
      accountHolder: 'Account Holder',
      ibanTry: 'TRY Account (IBAN)',
      ibanUsd: 'USD Account (IBAN)',
      bankIntro:
        'Send a bank transfer to one of the accounts below. Include your email address and product name in the payment reference.',
      bankTlNote:
        'If paying in TRY, check the USD selling rate on sundoviz.com, multiply the product price (USD) by that rate, and send the resulting amount in TRY via bank transfer/EFT.',
      bankCurrencyWarning:
        'Please do not mix USD and TRY accounts. Do not send TRY to the USD account or USD to the TRY account.',
      bankNote:
        'Always include your email and "{product}" in the transfer reference. After payment, email your receipt to info@nogvia.com — we will send your download link within 24–48 hours.',
      cryptoIntro:
        'Send USDT (TRC-20) only to the address below. The amount must match the selected product price.',
      cryptoWarning:
        'Only USDT (TRC-20) is accepted. We are not responsible for transfers sent on the wrong network or with the wrong cryptocurrency. Please verify the address and asset type before sending.',
      linkIntro:
        'Choose one of the links below to continue to a secure checkout page. Payment is completed on an external platform.',
      etsyCta: 'Pay on Etsy',
      lemonCta: 'Pay on Lemon Squeezy',
      linkNote: 'Checkout completes on a secure external page. nogvia does not store your payment details.',
      linkPriceWarning:
        'Prices on this site are shown in USD. When paying via link, the final amount on Lemon Squeezy or Etsy may differ due to exchange rates, local currency, and taxes. This is normal — your exact total is shown on the checkout page of the platform you choose.',
      noteLabel: 'Note',
      notePlaceholder: 'Your email, order note, or payment reference…',
      noteHint:
        'After a bank transfer or crypto payment, add your details here and use the button below to notify our support team.',
      notifySupport: 'Notify Payment / Contact Support',
      emailSubject: 'nogvia payment notification',
      footerNote: 'Questions? Email info@nogvia.com — we usually reply within 48 hours.',
      copy: 'Copy',
      copied: 'Copied',
      methods: {
        bank: 'Bank Transfer',
        crypto: 'Cryptocurrency',
        link: 'Pay by Link',
      },
      products: {
        hostKit: 'nogvia Host Kit',
        guestGuide: 'Guest Guide Builder',
        finance: 'nogvia Finance',
      },
    },
    hero: {
      kicker: 'NO Monthly Fees • Pay Once, Own Forever',
      title: 'Run Your Rental',
      titleAccent: '100% Offline.',
      subtitle: 'The complete desktop workspace for Airbnb and Vrbo hosts. Build branded digital QR guest guides and track rental finances directly on your computer — no Canva templates, no cloud lock-in.',
      ctaPrimary: 'Buy Host Kit — $49',
      ctaTrial: 'Try Free Limited Edition',
      ctaSecondary: 'View Pricing',
      badge1: '1-Click Local Setup',
      badge2: '100% Offline & Private',
      badge3: 'Not a Canva Template',
      tab1: 'Local Hub',
      tab2: 'Guest Guide',
      tab3: 'Finance Tracker',
      demoTag: 'Lifetime License',
      demoHeadline: 'nogvia Desktop Hub Workspace',
      demoDesc: 'Manage guest guides and rental finances side-by-side directly on your Mac or Windows PC without internet dependencies.',
      openGuestGuide: 'Open Guest Guide',
      openFinance: 'Open Finance Dashboard',
    },
    problemSolution: {
      kicker: 'Stop Paying Monthly SaaS Subscriptions',
      title: 'Why Rental Hosts Are Switching to',
      titleAccent: 'nogvia',
      subtitle: 'Say goodbye to recurring SaaS bills, broken cloud links, and rigid Canva templates. Get real offline software made for short-term rental hosts.',
      cards: [
        {
          title: 'No Monthly SaaS Fees',
          desc: 'Subscription tools cost $240 to $600 per year. With nogvia Host Kit, you pay $49 once on nogvia.com and own the software on your computer for life.',
        },
        {
          title: '100% Offline & Private',
          desc: 'Your financial records and property details remain entirely stored on your laptop. No cloud outages, zero tracking, total peace of mind.',
        },
        {
          title: 'Real Standalone App',
          desc: 'Not a Canva PDF or fragile Excel macro. Real desktop software with automated guest guide generation and financial reporting built right in.',
        },
      ],
      tableTitle: 'Feature Comparison: nogvia vs Standard SaaS Tools',
      colFeature: 'Feature',
      colSaas: 'Monthly SaaS / Canva Templates',
      colNogvia: 'nogvia Host Kit ($49)',
    },
    guestGuide: {
      kicker: 'Product 1: Guest Guide Builder',
      title: 'Digital Guest Guides Guests',
      titleAccent: 'Actually Enjoy',
      subtitle: 'Create branded digital guidebooks in seconds. Guests scan a QR code inside your rental and get instant access to WiFi, check-in instructions, house rules, and local recommendations on their mobile device.',
      tag: 'Digital Guest Guide',
      tabOverview: 'Overview',
      tabWifi: 'WiFi',
      tabRules: 'Rules',
      tabLocal: 'Local',
      welcomeTag: 'Property Welcome',
      welcomeTitle: 'Your Coastal Retreat',
      checkInLabel: 'Check-in',
      checkOutLabel: 'Check-out',
      wifiTitle: 'High Speed Guest WiFi',
      wifiNet: 'Network Name:',
      wifiPass: 'WiFi Password:',
      copyPass: 'Copy Password',
      copied: 'Copied!',
      quietHours: 'Quiet Hours:',
      callHost: 'Call Host',
      whatsApp: 'WhatsApp',
      feat1Title: 'Instant QR Code Export',
      feat1Desc: 'Export high-res vector QR codes ready to print and frame in your entryway, living room, or fridge.',
      feat2Title: '1-Tap WiFi Connection & Copy',
      feat2Desc: 'Guests can copy WiFi passwords with a single tap, eliminating typos and late-night host questions.',
      feat3Title: 'Direct Phone & WhatsApp Triggers',
      feat3Desc: 'One-click buttons allow guests to call or message you directly during emergencies without digging for numbers.',
      buyButton: 'Buy Guest Guide — $29',
    },
    finance: {
      kicker: 'Product 2: nogvia Finance',
      title: 'Manage Rental Profits',
      titleAccent: 'Without Excel Chaos',
      subtitle: 'Track income across Airbnb, Vrbo, Booking.com, and direct reservations. Log cleaning fees, mortgage payments, and maintenance costs with instant tax-ready Excel reporting.',
      dashTitle: 'nogvia Finance Dashboard',
      dashTag: 'Offline Local Storage • Auto Tax Categorization',
      ytd: 'YTD 2026',
      q3: 'Q3',
      fullYear: 'Full Year',
      exportExcel: 'Export Excel Report',
      exportedExcel: 'Excel Exported! (.xlsx)',
      revLabel: 'Revenue (YTD)',
      revSub: '4 Platforms Combined',
      expLabel: 'Operating Expenses',
      expSub: 'Cleaning, Utilities, Supplies',
      netLabel: 'Net Profit',
      netSub: 'Net Income Before Tax',
      propLabel: 'Properties Tracked',
      propSub: '3 Units',
      chartTitle: 'Booking Revenue Distribution',
      chartSub: 'Real-time Local Calculation',
      feat1Title: 'Multi-Channel Tracking',
      feat1Desc: 'Log reservations from Airbnb, Vrbo, Booking.com, and direct bookings without paying platform commission cuts.',
      feat2Title: 'Tax Season Ready',
      feat2Desc: 'Categorize expenses into tax deduction buckets like maintenance, supplies, insurance, and utilities.',
      feat3Title: 'Instant Excel Export',
      feat3Desc: 'Generate clean `.xlsx` spreadsheets formatted for your accountant or tax advisor in one click.',
      excelExportTitle: 'Export to Excel & Google Sheets',
      excelExportDesc: 'Export your finance table as an .xlsx file, import it into Google Sheets, and review every rental transaction from anywhere.',
      buyButton: 'Buy nogvia Finance — $29',
    },
    videos: {
      kicker: 'Product Demonstrations & Videos',
      title: 'See nogvia Host Kit',
      titleAccent: 'in Action',
      subtitle: 'Watch how simple it is to generate QR guest guides and manage rental finances offline.',
      video1Tab: 'Video 1: Full Product Walkthrough',
      video2Tab: 'Video 2: Host Transformation Story',
      v1Tag: 'Full Showcase',
      v1Title: 'nogvia Host Kit - Real Standalone App Demo',
      v1Sub: '"BUY ONCE, USE LIFETIME! NO CANVA. NO TEMPLATES."',
      v1Timeline: {
        t1: 'QR Scan Wall',
        t2: 'Mobile Guest Guide',
        t3: 'Desktop Builder',
        t4: 'Finance Dashboard',
      },
      v1Feat1Title: 'Instant QR Scanning',
      v1Feat1Desc: 'Guests scan the wall frame or sticker to instantly view WiFi passwords and house rules on their mobile screen.',
      v1Feat2Title: 'Unified Desktop Hub',
      v1Feat2Desc: 'Launch `start-hub` to manage guest guides and rental finances locally from one computer workspace.',
      v2Tag: 'Transformation Story',
      v2Title: 'From Spreadsheet Chaos to Offline Peace of Mind',
      v2Sub: 'Watch how host clutter transforms into a sleek, organized offline workspace with nogvia.',
      v2Timeline: {
        t1: 'Paper Chaos & Stress',
        t2: 'Transformation',
        t3: 'Clean nogvia Workspace',
      },
      v2FeatTitle: 'Never Settle for Messy Notes Again',
      v2FeatDesc: 'Replace stacks of sticky notes, calculators, and coffee-stained paper house rules with an elegant, digital offline solution that lasts a lifetime.',
      ctaTitle: 'Ready to streamline your rental?',
      ctaSub: 'Instant digital download via nogvia.com. Pay once $49.',
      buyButton: 'Buy Host Kit — $49',
    },
    bundle: {
      kicker: 'All-In-One Host Kit',
      title: 'One Workspace on Your Computer.',
      titleAccent: 'Zero Monthly Fees.',
      subtitle: 'The nogvia Host Kit includes both essential host applications in one unified local environment. Manage guest guidebooks and track rental revenue side-by-side on your Mac or Windows PC.',
      f1Title: 'Guest Guide Builder Included',
      f1Desc: 'Generate instant mobile guidebooks with QR codes for house rules, WiFi, check-in, and local spots.',
      f2Title: 'nogvia Finance Included',
      f2Desc: 'Log income & expenses across Airbnb, Vrbo, Booking, and Direct bookings with 1-click Excel exports.',
      processTitle: '3-Step Setup Process:',
      step1Title: 'Step 1',
      step1Desc: 'Download ZIP from nogvia.com after purchase',
      step2Title: 'Step 2',
      step2Desc: 'Double-click `start-hub`',
      step3Title: 'Step 3',
      step3Desc: 'Enjoy your offline rental suite forever',
      licenseTag: 'Lifetime License',
      buyButton: 'Buy Now — $49',
      guarantee: 'Instant Digital Download • nogvia.com Purchase Guarantee',
      checklist: [
        'Guest Guide Builder (Full Version)',
        'nogvia Finance Tracker (Full Version)',
        'nogvia Local Hub Workspace',
        'High-Res QR Code Exporter',
        'Excel Spreadsheet Exporter (.xlsx)',
        'Mac & Windows Compatible',
      ],
    },
    faq: {
      kicker: 'Frequently Asked Questions',
      title: 'Got Questions?',
      titleAccent: 'We Have Answers.',
      subtitle: 'Learn more about how nogvia Host Kit operates offline on your computer.',
      allCat: 'All FAQs',
      genCat: 'General',
      instCat: 'Installation',
      priceCat: 'Pricing',
      guideCat: 'Guest Guide',
      finCat: 'Finance',
      ctaTitle: 'Ready to buy the nogvia Host Kit?',
      ctaSub: 'Get instant download access on nogvia.com. One-time payment of $49, no subscriptions.',
      buyButton: 'Buy Now — $49',
    },
    cta: {
      kicker: 'Pay Once $49 • Own Forever',
      title: 'Ready to Run Your Rental',
      titleAccent: '100% Offline?',
      subtitle: 'Join vacation rental hosts who dropped monthly cloud subscriptions for real offline desktop software. Get the complete nogvia Host Kit on nogvia.com today.',
      cardTag: 'Complete Bundle Included',
      cardTitle: 'nogvia Host Kit',
      cardSub: 'Guest Guide Builder + nogvia Finance + Local Hub',
      oneTimeText: 'One-time payment',
      buyButton: 'Buy Now — $49',
      guarantee: 'Instant Digital Download • Guaranteed nogvia.com Seller Transaction',
      checklist: [
        'Digital Guest Guide Builder',
        'nogvia Finance & Excel Exporter',
        'Instant Vector QR Code Generator',
        '100% Offline & Private Storage',
      ],
    },
    comparisonData: [
      {
        feature: 'Pricing Model',
        saas: '$20 - $50 / month ($360+/year)',
        saasNegative: true,
        nogvia: 'Pay Once $49 (Lifetime Ownership)',
        nogviaPositive: true,
      },
      {
        feature: 'Internet Dependency',
        saas: 'Fails when offline or API goes down',
        saasNegative: true,
        nogvia: '100% Offline Desktop Software',
        nogviaPositive: true,
      },
      {
        feature: 'Data Privacy',
        saas: 'Hosted on 3rd party servers & tracked',
        saasNegative: true,
        nogvia: '100% Local Storage on Your Laptop',
        nogviaPositive: true,
      },
      {
        feature: 'Guest Guide Engine',
        saas: 'Requires Canva / PDF links or paid subscriptions',
        saasNegative: true,
        nogvia: 'Standalone App + Instant QR Generator',
        nogviaPositive: true,
      },
      {
        feature: 'Financial Tracker',
        saas: 'Generic spreadsheets or expensive accounting SaaS',
        saasNegative: true,
        nogvia: 'Dedicated Host Finance Tracker + Excel Export',
        nogviaPositive: true,
      },
      {
        feature: 'Setup Effort',
        saas: 'Complex signups & recurring payment cards',
        saasNegative: true,
        nogvia: '1-Click Local Installation (Mac & Windows)',
        nogviaPositive: true,
      },
    ],
    faqData: [
      {
        category: 'pricing',
        question: 'Is this really a one-time payment with no monthly fees?',
        answer: 'Yes! Absolutely zero monthly subscriptions or hidden charges. You purchase the nogvia Host Kit once on nogvia.com and own the software forever on your machine.',
      },
      {
        category: 'general',
        question: 'Is nogvia a Canva template or a real software application?',
        answer: 'nogvia is real standalone desktop software. Unlike Canva templates that require manual design work, nogvia automatically builds and formats your digital guest guide and finance reports locally in seconds.',
      },
      {
        category: 'installation',
        question: 'How difficult is the installation?',
        answer: 'It is built for non-technical hosts! The download folder includes a simple 1-click launcher (`start-hub`). Just click to launch the nogvia local workspace on your Mac or Windows computer.',
      },
      {
        category: 'guest-guide',
        question: 'How do guests view the digital guest guide on their phone?',
        answer: 'When you print or display the generated QR code inside your rental property (or send the local link), guests simply point their phone camera at the QR code. The guide opens instantly in a clean mobile web layout without requiring them to download any app.',
      },
      {
        category: 'finance',
        question: 'Can I track multiple rental properties in nogvia Finance?',
        answer: 'Yes! You can log income and expenses for multiple properties (e.g. Sunset Bay Villa, Beach House, Downtown Apartment), filter revenue by platform (Airbnb, Vrbo, Booking.com, Direct), and export tax-ready reports to Microsoft Excel with one click.',
      },
      {
        category: 'general',
        question: 'Does my data stay private?',
        answer: '100%. All your guest details, property notes, revenue records, and expense logs are stored locally on your device. Nothing is sent to remote cloud servers or sold to third parties.',
      },
    ],
    sampleGuestGuide: {
      propertyName: 'Sunset Bay Estate',
      subtitle: 'Coastal luxury with private pool and ocean views',
      address: '1428 Coastal Highway, Malibu, CA',
      wifiNetwork: 'SunsetBay_Guest_5G',
      wifiPassword: 'SunnyBay2026!',
      checkInTime: '3:00 PM',
      checkOutTime: '11:00 AM',
      quietHours: '10:00 PM - 8:00 AM',
      hostName: 'Sarah & Mark',
      hostPhone: '+1 (555) 234-5678',
      whatsApp: '+1 (555) 234-5678',
      houseRules: [
        'No smoking or vaping inside the property.',
        'Quiet hours observed between 10:00 PM and 8:00 AM out of respect for neighbors.',
        'Please remove shoes in the entrance hall.',
        'No unregistered guests or parties allowed.',
      ],
      localRecommendations: [
        { title: 'The Anchor Bistro', type: 'Dining', note: 'Best seafood pasta with ocean sunset view (2 mins walk)' },
        { title: 'Sunrise Cove Beach', type: 'Attraction', note: 'Calm water beach perfect for morning swims (0.5 miles)' },
        { title: 'Organic Market & Cafe', type: 'Groceries', note: 'Fresh local bakery and coffee roasted daily' },
      ],
    },
  },
};
