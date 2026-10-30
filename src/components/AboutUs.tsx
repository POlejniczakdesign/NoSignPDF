import React from 'react';
import {
  ShieldCheck,
  Cpu,
  Lock,
  ArrowLeft,
  CheckCircle2,
  FileCode2,
  Users,
  Award,
  Globe2,
  ExternalLink,
} from 'lucide-react';
import { ToolRoute } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

interface AboutUsProps {
  onNavigate: (path: ToolRoute) => void;
}

interface AboutTranslation {
  backBtn: string;
  badge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  missionHeading: string;
  missionP1: string;
  missionP2: string;
  pillarsTitle: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  pillar4Title: string;
  pillar4Desc: string;
  teamHeading: string;
  teamDesc: string;
  techTitle: string;
  techDesc: string;
  ethicsTitle: string;
  ethicsP1: string;
  ethicsP2: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
  contactButton: string;
}

const ABOUT_TEXTS: Record<Language, AboutTranslation> = {
  pl: {
    backBtn: '← Powrót do narzędzi PDF',
    badge: 'Inicjatywa Inżynierów Cyberbezpieczeństwa',
    heroTitle: 'O projekcie NoSignPDF i zespole',
    heroHighlight: 'NoSignPDF Dev Team',
    heroSubtitle:
      'Stworzyliśmy NoSignPDF, aby zakończyć erę wysyłania poufnych dokumentów biznesowych na obce serwery chmurowe. Przetwarzaj pliki PDF w 100% lokalnie w pamięci RAM swojej przeglądarki.',
    missionHeading: 'Nasza Misja: Wolność, Prywatność i Bezpieczeństwo Danych',
    missionP1:
      'Projekt NoSignPDF narodził się jako niezależna inicjatywa inżynierów cyberbezpieczeństwa, analityków danych i programistów systemowych. W dobie powszechnej chmury większość popularnych konwerterów i edytorów PDF wymaga od użytkowników przesyłania plików na odległe serwery. Oznacza to, że poufne umowy handlowe, faktury z numerami NIP/PESEL, dokumentacja medyczna czy wyciągi bankowe opuszczają urządzenie i trafiają do zewnętrznych baz danych.',
    missionP2:
      'Postanowiliśmy to radykalnie zmienić. Wykorzystując nowoczesne możliwości standardu WebAssembly (WASM), nowoczesnego silnika JavaScript oraz akceleracji sprzętowej w przeglądarce, przenieśliśmy całą logikę manipulacji plikami PDF bezpośrednio do pamięci RAM urządzenia użytkownika. Ani jeden bajt Twojego pliku nigdy nie opuszcza Twojego komputera ani telefonu.',
    pillarsTitle: 'Filary Architektury Bezpieczeństwa NoSignPDF',
    pillar1Title: '100% Client-Side RAM Sandbox',
    pillar1Desc:
      'Wszystkie operacje (wypełnianie AcroForms, scalanie, dzielenie, usuwanie metadanych, kompresja i konwersja obrazów) zachodzą w izolowanej piaskownicy przeglądarki. Pliki nie są uploadowane na żaden zewnętrzny serwer.',
    pillar2Title: 'Zgodność ze Standardami ISO 32000',
    pillar2Desc:
      'Stosujemy rygorystyczne normy ISO 32000-1 oraz ISO 32000-2 dla struktury plików PDF oraz archiwizacji długoterminowej PDF/A, gwarantując integralność cyfrową i poprawność prawną generowanych dokumentów.',
    pillar3Title: 'Zero-Telemetry & Zero Rejestracji',
    pillar3Desc:
      'Nie wymagamy tworzenia kont, podawania adresów e-mail, haseł ani instalacji wtyczek. Nie prowadzimy logów użytkownika ani profilowania telemetrycznego. Twoja prywatność jest bezwarunkowa.',
    pillar4Title: 'Zgodność z RODO / GDPR i Dyrektywą NIS2',
    pillar4Desc:
      'Brak transferu danych oznacza, że firmy i instytucje korzystające z NoSignPDF nie muszą podpisywać umów powierzenia przetwarzania danych (DPA) i całkowicie eliminują ryzyko wycieków w łańcuchu dostaw.',
    teamHeading: 'Kim jest NoSignPDF Dev Team?',
    teamDesc:
      'Jesteśmy międzynarodową grupą inżynierów oprogramowania i pasjonatów prywatności cyfrowej z wieloletnim doświadczeniem w inżynierii bezpieczeństwa aplikacji webowych, kryptografii stosowanej i optymalizacji silników renderujących. Rozwijamy NoSignPDF jako transparentne narzędzie użyteczności publicznej, udowadniając, że zaawansowane narzędzia do pracy z dokumentami mogą być w pełni bezpłatne i bezpieczne bez kompromisów.',
    techTitle: 'Nasz Stos Technologiczny i Silnik Przetwarzania',
    techDesc:
      'Aplikacja łączy biblioteki niskopoziomowe takie jak pdf-lib, silnik pdfjs-dist od Mozilla oraz natywne Canvas API przeglądarki. Całość jest hostowana na globalnej, rozproszonej sieci Cloudflare Pages w architekturze Static SPA, co zapewnia sub-sekundowy czas odpowiedzi na całym świecie.',
    ethicsTitle: 'Etyczny Model Finansowania',
    ethicsP1:
      'Wielu dostawców bezpłatnych narzędzi monetyzuje dane użytkowników poprzez ich agregację, analizę lub sprzedaż baz kontaktowych. Nasz model jest w 100% transparentny: nigdy nie dotykamy Twoich plików.',
    ethicsP2:
      'Utrzymanie infrastruktury serwerowej i dalszy rozwój funkcjonalności finansujemy wyłącznie ze standardowych, nieinwazyjnych reklam partnerskich Google AdSense wyświetlanych w interfejsie. Dzięki temu narzędzie pozostaje 100% darmowe dla każdego użytkownika na świecie.',
    ctaTitle: 'Chcesz przetestować nasze narzędzia?',
    ctaDesc:
      'Wypróbuj w pełni lokalne scalanie, podział, wypełnianie formularzy lub konwersję obrazów już teraz.',
    ctaButton: 'Otwórz pulpit narzędzi PDF',
    contactButton: 'Skontaktuj się z zespołem inżynierów',
  },
  en: {
    backBtn: '← Back to PDF Tools',
    badge: 'Cybersecurity Engineering Initiative',
    heroTitle: 'About NoSignPDF & the Engineers Behind It',
    heroHighlight: 'NoSignPDF Dev Team',
    heroSubtitle:
      'We built NoSignPDF to end the era of sending confidential business documents to third-party cloud servers. Process PDF files 100% locally in your browser RAM.',
    missionHeading: 'Our Mission: Freedom, Privacy, and Sovereign Document Security',
    missionP1:
      'NoSignPDF was founded as an independent initiative by cybersecurity engineers, data analysts, and systems developers. In the cloud-first era, most PDF converters and online editors require users to upload documents to remote servers. This exposes confidential business contracts, financial statements, medical records, and identity data to external data storage and sub-processor risks.',
    missionP2:
      'We set out to change this paradigm. By leveraging WebAssembly (WASM), modern browser execution sandboxes, and hardware acceleration, we shifted the entire document manipulation pipeline into local client memory. Not a single byte of your file ever leaves your device.',
    pillarsTitle: 'Pillars of the NoSignPDF Security Architecture',
    pillar1Title: '100% Client-Side RAM Sandbox',
    pillar1Desc:
      'Every operation (AcroForms filling, merging, splitting, metadata sanitization, compression, and image conversion) runs inside an isolated browser sandbox. Zero files are uploaded to any server.',
    pillar2Title: 'Strict ISO 32000 Compliance',
    pillar2Desc:
      'We strictly adhere to ISO 32000-1 and ISO 32000-2 specifications as well as PDF/A archival guidelines, ensuring full legal validity and document integrity across corporate and government workflows.',
    pillar3Title: 'Zero-Telemetry & Zero Sign Up',
    pillar3Desc:
      'No account creation, no email harvesting, no password requirements, and no plugin installations. We do not track telemetry or profile users. Privacy is unconditional.',
    pillar4Title: 'GDPR / RODO & NIS2 Compliance',
    pillar4Desc:
      'Because no data is transferred across the network, organizations using NoSignPDF eliminate data processor liabilities (DPA) and protect against supply chain data leaks.',
    teamHeading: 'Who is the NoSignPDF Dev Team?',
    teamDesc:
      'We are an international collective of software engineers and digital privacy advocates with extensive backgrounds in application security, applied cryptography, and high-performance browser engines. We maintain NoSignPDF as a transparent public utility, demonstrating that high-grade PDF tooling can be free and secure without compromise.',
    techTitle: 'Technology Stack & Engine Architecture',
    techDesc:
      'The platform integrates low-level client engines including pdf-lib, Mozilla pdfjs-dist, and hardware-accelerated Canvas APIs. Delivered globally via Cloudflare Pages edge network as a static SPA, ensuring sub-second response times worldwide.',
    ethicsTitle: 'Ethical & Transparent Monetization',
    ethicsP1:
      'Many "free" tools monetize user data through hidden document profiling, scraping, or selling user databases. Our philosophy is diametrically opposed: we cannot view, monetize, or harvest what never touches a server.',
    ethicsP2:
      'Infrastructure overhead and ongoing tool development are funded solely through non-intrusive Google AdSense display advertising on our web interface. This guarantees that all tools remain 100% free with unlimited access for all users.',
    ctaTitle: 'Ready to experience true client-side security?',
    ctaDesc:
      'Try our browser-native PDF merger, splitter, form filler, or image converter right now.',
    ctaButton: 'Open PDF Tools Workspace',
    contactButton: 'Contact Engineering Team',
  },
  es: {
    backBtn: '← Volver a Herramientas PDF',
    badge: 'Iniciativa de Ingeniería en Ciberseguridad',
    heroTitle: 'Acerca del proyecto NoSignPDF y su equipo',
    heroHighlight: 'NoSignPDF Dev Team',
    heroSubtitle:
      'Creamos NoSignPDF para terminar con la subida de documentos confidenciales a servidores externos. Procesa archivos PDF 100% localmente en la memoria RAM de tu navegador.',
    missionHeading: 'Nuestra Misión: Privacidad, Libertad y Seguridad Digital',
    missionP1:
      'NoSignPDF nació como una iniciativa independiente de ingenieros de ciberseguridad y desarrolladores de sistemas. La mayoría de los editores y conversores de PDF en línea obligan a subir contratos, nóminas e información médica a servidores remotos con riesgo de filtraciones.',
    missionP2:
      'Revolucionamos este proceso trasladando toda la lógica de manipulación de PDF a la memoria local de tu dispositivo mediante WebAssembly (WASM). Ni un solo byte de tu información sale de tu equipo.',
    pillarsTitle: 'Pilares de Seguridad de NoSignPDF',
    pillar1Title: 'Ejecución 100% Local en RAM',
    pillar1Desc:
      'Todas las funciones se ejecutan en un entorno seguro y aislado en tu navegador sin conectarse a servidores de almacenamiento.',
    pillar2Title: 'Estándares Internacionales ISO 32000',
    pillar2Desc:
      'Cumplimos con las especificaciones ISO 32000-1/2 y PDF/A, asegurando la validez legal y formato oficial de tus documentos.',
    pillar3Title: 'Cero Telemetría y Sin Registro',
    pillar3Desc:
      'Sin cuentas, sin correos electrónicos y sin contraseñas. Acceso inmediato y privado sin recopilación de datos.',
    pillar4Title: 'Conformidad con RGPD y Directiva NIS2',
    pillar4Desc:
      'Al no existir transferencia de datos a la nube, las empresas garantizan la máxima protección de privacidad sin riesgos de filtración.',
    teamHeading: '¿Quiénes integran NoSignPDF Dev Team?',
    teamDesc:
      'Somos un grupo internacional de ingenieros de software dedicados a la protección de datos y la criptografía aplicada. Mantenemos NoSignPDF como un servicio público y transparente.',
    techTitle: 'Arquitectura Tecnológica',
    techDesc:
      'Implementado con pdf-lib, pdfjs-dist y Canvas nativo, distribuido a través de la red global de Cloudflare Pages.',
    ethicsTitle: 'Modelo Ético de Financiación',
    ethicsP1:
      'Jamás monetizamos con datos de usuarios. No recopilamos ni vendemos información.',
    ethicsP2:
      'Mantenemos el servicio 100% gratuito mediante publicidad respetuosa de Google AdSense en la interfaz.',
    ctaTitle: '¿Quieres probar nuestras herramientas seguras?',
    ctaDesc:
      'Une, divide, rellena formularios o convierte imágenes a PDF con total privacidad.',
    ctaButton: 'Abrir Herramientas PDF',
    contactButton: 'Contactar al Equipo',
  },
  hi: {
    backBtn: '← पीडीएफ टूल्स पर वापस जाएं',
    badge: 'साइबर सुरक्षा इंजीनियर्स की स्वतंत्र पहल',
    heroTitle: 'NoSignPDF परियोजना और डेवलपर्स के बारे में',
    heroHighlight: 'NoSignPDF Dev Team',
    heroSubtitle:
      'हमने क्लाउड सर्वरों पर गोपनीय व्यावसायिक दस्तावेज़ भेजने की बाध्यता समाप्त करने के लिए NoSignPDF बनाया है। अपनी फाइलों को 100% स्थानीय रूप से ब्राउज़र रैम में प्रोसेस करें।',
    missionHeading: 'हमारा मिशन: डेटा संप्रभुता, गोपनीयता और सुरक्षा',
    missionP1:
      'NoSignPDF की स्थापना साइबर सुरक्षा इंजीनियरों और सिस्टम डेवलपर्स द्वारा की गई। अधिकांश ऑनलाइन पीडीएफ टूल फाइलों को क्लाउड सर्वर पर अपलोड करवाते हैं, जिससे वित्तीय व व्यक्तिगत डेटा लीक होने का खतरा बना रहता है।',
    missionP2:
      'हमने WebAssembly (WASM) और ब्राउज़र मेमोरी का उपयोग करके पूरे पीडीएफ प्रोसेसिंग इंजन को आपके डिवाइस में स्थानांतरित कर दिया है। आपकी फाइल का एक बाइट भी आपके कंप्यूटर से बाहर नहीं जाता।',
    pillarsTitle: 'सुरक्षा वास्तुकला के मुख्य स्तंभ',
    pillar1Title: '100% क्लाइंट-साइड रैम निष्पादन',
    pillar1Desc:
      'सभी कार्य ब्राउज़र के सुरक्षित सैंडबॉक्स में होते हैं। किसी भी सर्वर पर फाइल अपलोड नहीं होती।',
    pillar2Title: 'आईएसओ 32000 और पीडीएफ/ए मानक',
    pillar2Desc:
      'अंतर्राष्ट्रीय दस्तावेज़ मानकों का पूर्ण अनुपालन ताकि कानूनी और आधिकारिक वैधता बनी रहे।',
    pillar3Title: 'बिना लॉगिन और बिना डेटा ट्रैकिंग',
    pillar3Desc:
      'खाता बनाने, ईमेल या पासवर्ड दर्ज करने की आवश्यकता नहीं। पूर्ण गोपनीयता की गारंटी।',
    pillar4Title: 'जीडीपीआर व गोपनीयता नियमों का अनुपालन',
    pillar4Desc:
      'डेटा ट्रांसफर न होने से कॉर्पोरेट और व्यक्तिगत उपयोगकर्ताओं के लिए शून्य जोखिम।',
    teamHeading: 'NoSignPDF Dev Team कौन हैं?',
    teamDesc:
      'हम सॉफ्टवेयर सुरक्षा और डेटा गोपनीयता के क्षेत्र में कार्यरत अनुभवी इंजीनियरों की अंतरराष्ट्रीय टीम हैं।',
    techTitle: 'तकनीकी स्टैक',
    techDesc:
      'pdf-lib, pdfjs-dist और Cloudflare Pages द्वारा वैश्विक स्तर पर तीव्र गति से संचालित।',
    ethicsTitle: 'नैतिक वित्तीय मॉडल',
    ethicsP1:
      'हम उपयोगकर्ताओं के डेटा को कभी नहीं बेचते या एकत्र करते हैं।',
    ethicsP2:
      'सेवा को 100% मुफ्त बनाए रखने के लिए हम केवल Google AdSense के गैर-हस्तक्षेपकारी विज्ञापनों का उपयोग करते हैं।',
    ctaTitle: 'स्थानीय सुरक्षा का अनुभव करें',
    ctaDesc:
      'पीडीएफ जोड़ें, अलग करें या फॉर्म भरें बिना किसी फाइल अपलोड के।',
    ctaButton: 'पीडीएफ टूल्स खोलें',
    contactButton: 'डेवलपर टीम से संपर्क करें',
  },
  pt: {
    backBtn: '← Voltar às Ferramentas PDF',
    badge: 'Iniciativa de Engenharia em Cibersegurança',
    heroTitle: 'Sobre o Projeto NoSignPDF e a Equipe',
    heroHighlight: 'NoSignPDF Dev Team',
    heroSubtitle:
      'Desenvolvemos o NoSignPDF para eliminar a necessidade de enviar documentos confidenciais para servidores na nuvem. Processe PDFs 100% localmente na memória RAM do seu navegador.',
    missionHeading: 'Nossa Missão: Privacidade, Soberania e Segurança de Dados',
    missionP1:
      'O NoSignPDF nasceu como uma iniciativa independente de engenheiros de segurança da informação e desenvolvedores de software. A maioria das ferramentas online exige o upload de contratos comerciais, notas fiscais e relatórios confidenciais para servidores remotos com riscos à privacidade.',
    missionP2:
      'Transformamos esse cenário utilizando WebAssembly (WASM) e aceleração de hardware. Toda a manipulação de PDFs ocorre exclusivamente na memória RAM do seu dispositivo. Nenhum byte sai do seu computador ou smartphone.',
    pillarsTitle: 'Pilares da Arquitetura de Segurança NoSignPDF',
    pillar1Title: 'Sandbox 100% Local na Memória RAM',
    pillar1Desc:
      'Preenchimento de AcroForms, junção, divisão, limpeza de metadados e conversão executados localmente sem upload.',
    pillar2Title: 'Conformidade Rigorosa com ISO 32000',
    pillar2Desc:
      'Aderência aos padrões ISO 32000-1/2 e PDF/A, garantindo validade jurídica e compatibilidade oficial.',
    pillar3Title: 'Zero Telemetria e Sem Cadastro',
    pillar3Desc:
      'Sem necessidade de contas, e-mails, senhas ou extensões. Acesso instantâneo e privacidade sem concessões.',
    pillar4Title: 'Conformidade com LGPD e GDPR',
    pillar4Desc:
      'Como não há transferência de dados para terceiros, empresas eliminam riscos de vazamento e responsabilidade regulatória.',
    teamHeading: 'Quem é a NoSignPDF Dev Team?',
    teamDesc:
      'Somos um coletivo internacional de engenheiros apaixonados por segurança digital e criptografia aplicada, dedicados a construir utilitários públicos transparentes.',
    techTitle: 'Tecnologia e Infraestrutura',
    techDesc:
      'Construído com bibliotecas de baixo nível (pdf-lib, pdfjs-dist) e servido via rede global Cloudflare Pages.',
    ethicsTitle: 'Monetização Ética e Transparente',
    ethicsP1:
      'Nunca monetizamos dados de usuários. Seus arquivos permanecem estritamente privados.',
    ethicsP2:
      'Mantemos a plataforma 100% gratuita através de anúncios discretos do Google AdSense.',
    ctaTitle: 'Experimente a segurança local agora mesmo',
    ctaDesc:
      'Junte, divida, preencha formulários ou converta imagens com total privacidade.',
    ctaButton: 'Acessar Ferramentas PDF',
    contactButton: 'Falar com a Equipe',
  },
  ru: {
    backBtn: '← Вернуться к инструментам PDF',
    badge: 'Инициатива Инженеров Кибербезопасности',
    heroTitle: 'О проекте NoSignPDF и команде разработчиков',
    heroHighlight: 'NoSignPDF Dev Team',
    heroSubtitle:
      'Мы создали NoSignPDF, чтобы покончить с отправкой конфиденциальных документов на сторонние облачные серверы. Обрабатывайте файлы PDF на 100% локально в оперативной памяти браузера.',
    missionHeading: 'Наша Миссия: Суверенитет, Приватность и Безопасность Данных',
    missionP1:
      'Проект NoSignPDF зародился как независимая инициатива инженеров по информационной безопасности и системных программистов. В эпоху повсеместных облачных сервисов большинство онлайн-редакторов PDF принуждают пользователей загружать файлы на удаленные серверы, подвергая утечкам коммерческие договоры, финансовые отчеты и персональные данные.',
    missionP2:
      'Мы изменили этот подход благодаря технологиям WebAssembly (WASM) и изолированным средам браузера. Весь процесс редактирования, объединения и конвертации выполняется исключительно в оперативной памяти (RAM) вашего устройства. Ни единый байт не покидает ваш компьютер или смартфон.',
    pillarsTitle: 'Фундаментальные Принципы Безопасности NoSignPDF',
    pillar1Title: '100% Client-Side RAM Sandbox',
    pillar1Desc:
      'Все операции (заполнение AcroForms, слияние, разделение, очистка метаданных и сжатие) происходят в локальной песочнице браузера без загрузки на серверы.',
    pillar2Title: 'Соответствие Стандартам ISO 32000',
    pillar2Desc:
      'Строгое соблюдение спецификаций ISO 32000-1/2 и архивного стандарта PDF/A обеспечивает юридическую чистоту и корректность документов.',
    pillar3Title: 'Zero-Telemetry и Без Регистрации',
    pillar3Desc:
      'Никаких учетных записей, сбора email-адресов, паролей и плагинов. Мы не ведем логов и не составляем профилей пользователей.',
    pillar4Title: 'Соответствие Требованиям GDPR и NIS2',
    pillar4Desc:
      'Отсутствие передачи данных по сети полностью снимает риски регуляторных штрафов и утечек в цепочке поставок.',
    teamHeading: 'Кто такие NoSignPDF Dev Team?',
    teamDesc:
      'Мы — международное сообщество инженеров-разработчиков и специалистов по прикладной криптографии. Мы развиваем NoSignPDF как открытый общедоступный инструмент высокой надежности.',
    techTitle: 'Технологический Стек и Архитектура',
    techDesc:
      'Система построена на связке pdf-lib, Mozilla pdfjs-dist и Canvas API, а статическое размещение на Cloudflare Pages гарантирует максимальную скорость отклика.',
    ethicsTitle: 'Этичная Модель Монетизации',
    ethicsP1:
      'Мы категорически против монетизации данных пользователей. Ваши файлы принадлежат только вам.',
    ethicsP2:
      'Развитие инфраструктуры поддерживается исключительно за счет аккуратной рекламы Google AdSense на страницах сервиса.',
    ctaTitle: 'Готовы оценить безопасность локальной обработки?',
    ctaDesc:
      'Объединяйте, разделяйте, заполняйте формы и конвертируйте файлы прямо сейчас.',
    ctaButton: 'Открыть панель инструментов PDF',
    contactButton: 'Связаться с инженерами',
  },
};

export const AboutUs: React.FC<AboutUsProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = ABOUT_TEXTS[language] || ABOUT_TEXTS.en;

  return (
    <div id="about-us-view" className="w-full max-w-5xl mx-auto py-8 px-4 font-sans text-zinc-900 dark:text-zinc-100">
      {/* Top back navigation & trust badge */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.backBtn}</span>
        </button>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1 rounded-full border border-indigo-200/80 dark:border-indigo-800/80">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          {t.badge}
        </span>
      </div>

      {/* Hero section */}
      <header className="bg-gradient-to-br from-white via-zinc-50 to-indigo-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-indigo-950/20 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 mb-8 shadow-xs">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-[11px] font-bold tracking-wider uppercase">
            <Users className="w-3 h-3" />
            <span>NoSignPDF Dev Team</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            {t.heroTitle} <span className="text-indigo-600 dark:text-indigo-400">{t.heroHighlight}</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
            {t.heroSubtitle}
          </p>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="space-y-8">
        {/* Mission Statement */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-10 space-y-4 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2.5">
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>{t.missionHeading}</span>
          </h2>
          <div className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 space-y-4 leading-relaxed">
            <p>{t.missionP1}</p>
            <p>{t.missionP2}</p>
          </div>
        </section>

        {/* Pillars Grid */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white px-1">
            {t.pillarsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-2.5 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                {t.pillar1Title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {t.pillar1Desc}
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-2.5 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
                <FileCode2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                {t.pillar2Title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {t.pillar2Desc}
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-2.5 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                {t.pillar3Title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {t.pillar3Desc}
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-2.5 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-3">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                {t.pillar4Title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {t.pillar4Desc}
              </p>
            </div>
          </div>
        </section>

        {/* Team & Technology Stack */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>{t.teamHeading}</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {t.teamDesc}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>{t.techTitle}</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {t.techDesc}
            </p>
          </div>
        </section>

        {/* Ethics & Monetization (AdSense transparency) */}
        <section className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-3">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            {t.ethicsTitle}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t.ethicsP1}
          </p>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t.ethicsP2}
          </p>
        </section>

        {/* Call to action & Contact CTA */}
        <section className="bg-indigo-600 dark:bg-indigo-900/70 text-white rounded-3xl p-8 sm:p-10 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold">{t.ctaTitle}</h3>
          <p className="text-sm sm:text-base text-indigo-100 max-w-xl mx-auto leading-relaxed">
            {t.ctaDesc}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="px-6 py-3 rounded-xl bg-white text-indigo-900 text-sm font-bold hover:bg-indigo-50 transition-colors shadow-sm cursor-pointer"
            >
              {t.ctaButton}
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3 rounded-xl bg-indigo-700/80 hover:bg-indigo-700 text-white border border-indigo-400/40 text-sm font-bold transition-colors cursor-pointer"
            >
              {t.contactButton}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
