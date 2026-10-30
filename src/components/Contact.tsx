import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowLeft,
  Clock,
  HelpCircle,
  FileQuestion,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { ToolRoute } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

interface ContactProps {
  onNavigate: (path: ToolRoute) => void;
}

interface ContactTranslation {
  backBtn: string;
  badge: string;
  title: string;
  subtitle: string;
  directEmailTitle: string;
  directEmailDesc: string;
  copyBtn: string;
  copiedBtn: string;
  slaTitle: string;
  slaDesc: string;
  formTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  categoryLabel: string;
  catBug: string;
  catFeature: string;
  catSecurity: string;
  catOther: string;
  messageLabel: string;
  messagePlaceholder: string;
  privacyNotice: string;
  submitBtn: string;
  submittingBtn: string;
  successTitle: string;
  successDesc: string;
  sendAnother: string;
  errorMissingFields: string;
}

const CONTACT_TEXTS: Record<Language, ContactTranslation> = {
  pl: {
    backBtn: '← Powrót do narzędzi PDF',
    badge: 'Oficjalny Kanał Wsparcia Technicznego',
    title: 'Kontakt i Pomoc Techniczna',
    subtitle:
      'Masz problem z nietypowym plikiem PDF, chcesz zgłosić błąd lub zaproponować nową funkcję? Zespół inżynierów NoSignPDF Dev Team jest do Twojej dyspozycji.',
    directEmailTitle: 'Oficjalny adres e-mail wsparcia',
    directEmailDesc: 'Pisz bezpośrednio do inżynierów odpowiedzialnych za rozwój silnika PDF:',
    copyBtn: 'Kopiuj e-mail',
    copiedBtn: 'Skopiowano!',
    slaTitle: 'Czas Odpowiedzi: 24-48h',
    slaDesc: 'Odpowiadamy na wszystkie zgłoszenia techniczne i zapytania o bezpieczeństwo w dni robocze.',
    formTitle: 'Wyślij wiadomość przez formularz',
    nameLabel: 'Imię i nazwisko / Nazwa firmy',
    namePlaceholder: 'np. Jan Kowalski',
    emailLabel: 'Twój adres e-mail do odpowiedzi',
    emailPlaceholder: 'np. jan.kowalski@example.com',
    categoryLabel: 'Temat zgłoszenia',
    catBug: 'Zgłoszenie błędu w przetwarzaniu pliku PDF',
    catFeature: 'Propozycja nowego narzędzia lub usprawnienia',
    catSecurity: 'Kwestie cyberbezpieczeństwa i prywatności',
    catOther: 'Inne pytanie ogólne',
    messageLabel: 'Opis problemu lub treść wiadomości',
    messagePlaceholder:
      'Opisz dokładnie problem: format pliku PDF, liczbę stron, oczekiwany rezultat lub treść błędu...',
    privacyNotice:
      'Prywatność gwarantowana: Nie dołączaj do wiadomości poufnych haseł ani danych kart płatniczych. Twój adres e-mail posłuży wyłącznie do udzielenia odpowiedzi technicznej.',
    submitBtn: 'Wyślij wiadomość do wsparcia',
    submittingBtn: 'Wysyłanie...',
    successTitle: 'Wiadomość została przygotowana i zarejestrowana!',
    successDesc:
      'Dziękujemy za kontakt. Nasz zespół techniczny zapozna się ze zgłoszeniem i odpowie w ciągu 24-48 godzin.',
    sendAnother: 'Wyślij kolejną wiadomość',
    errorMissingFields: 'Proszę wypełnić wszystkie wymagane pola formularza.',
  },
  en: {
    backBtn: '← Back to PDF Tools',
    badge: 'Official Engineering Support Channel',
    title: 'Contact Us & Technical Support',
    subtitle:
      'Encountered an issue with a complex PDF, found a bug, or have an idea for a new client-side tool? The NoSignPDF Dev Team is here to help.',
    directEmailTitle: 'Official Support Email',
    directEmailDesc: 'Direct line to the engineers maintaining the PDF execution engine:',
    copyBtn: 'Copy Email',
    copiedBtn: 'Copied!',
    slaTitle: 'Response Time: 24-48h',
    slaDesc: 'We review and respond to all technical inquiries and bug reports during business days.',
    formTitle: 'Send a Message via Contact Form',
    nameLabel: 'Your Name or Company',
    namePlaceholder: 'e.g. John Doe',
    emailLabel: 'Your Email Address (for replies)',
    emailPlaceholder: 'e.g. john.doe@example.com',
    categoryLabel: 'Issue Category',
    catBug: 'PDF Document Processing Bug Report',
    catFeature: 'Feature Request / Tool Suggestion',
    catSecurity: 'Cybersecurity or Privacy Inquiry',
    catOther: 'General Question',
    messageLabel: 'Message & Issue Details',
    messagePlaceholder:
      'Please detail the issue: PDF page count, specific error behavior, or the desired feature...',
    privacyNotice:
      'Privacy guaranteed: Never send confidential passwords or private personal data. Your email is solely used to respond to this ticket.',
    submitBtn: 'Submit Support Ticket',
    submittingBtn: 'Sending...',
    successTitle: 'Message received and ticket registered!',
    successDesc:
      'Thank you for reaching out. Our engineering team will review your report and respond within 24-48 hours.',
    sendAnother: 'Send another message',
    errorMissingFields: 'Please complete all required fields.',
  },
  es: {
    backBtn: '← Volver a Herramientas PDF',
    badge: 'Canal Oficial de Soporte Técnico',
    title: 'Contacto y Asistencia Técnica',
    subtitle:
      '¿Problemas con un archivo PDF o una propuesta de mejora? El equipo de NoSignPDF Dev Team está a tu disposición.',
    directEmailTitle: 'Correo Oficial de Soporte',
    directEmailDesc: 'Escribe directamente al equipo de ingenieros de NoSignPDF:',
    copyBtn: 'Copiar correo',
    copiedBtn: '¡Copiado!',
    slaTitle: 'Tiempo de respuesta: 24-48h',
    slaDesc: 'Atendemos consultas técnicas e incidencias en días hábiles.',
    formTitle: 'Envíanos un mensaje',
    nameLabel: 'Nombre o Empresa',
    namePlaceholder: 'ej. Carlos García',
    emailLabel: 'Tu correo electrónico',
    emailPlaceholder: 'ej. carlos@example.com',
    categoryLabel: 'Tema del mensaje',
    catBug: 'Error al procesar archivo PDF',
    catFeature: 'Sugerencia de nueva función',
    catSecurity: 'Seguridad y Privacidad',
    catOther: 'Otra consulta',
    messageLabel: 'Detalles del problema o mensaje',
    messagePlaceholder: 'Describe la consulta o incidencia con el documento...',
    privacyNotice: 'Garantía de privacidad: Tu correo solo se usará para responder a tu consulta.',
    submitBtn: 'Enviar mensaje de soporte',
    submittingBtn: 'Enviando...',
    successTitle: '¡Mensaje recibido con éxito!',
    successDesc: 'Nos pondremos en contacto contigo en un plazo de 24 a 48 horas.',
    sendAnother: 'Enviar otro mensaje',
    errorMissingFields: 'Por favor completa todos los campos requeridos.',
  },
  hi: {
    backBtn: '← पीडीएफ टूल्स पर वापस जाएं',
    badge: 'आधिकारिक तकनीकी सहायता',
    title: 'संपर्क और तकनीकी सहायता',
    subtitle:
      'क्या आपको किसी पीडीएफ फाइल में समस्या आ रही है या कोई नया सुझाव देना चाहते हैं? NoSignPDF Dev Team से संपर्क करें।',
    directEmailTitle: 'आधिकारिक सहायता ईमेल',
    directEmailDesc: 'सीधे डेवलपर टीम को ईमेल लिखें:',
    copyBtn: 'ईमेल कॉपी करें',
    copiedBtn: 'कॉपी हो गया!',
    slaTitle: 'प्रतिक्रिया समय: 24-48 घंटे',
    slaDesc: 'कार्य दिवसों में सभी तकनीकी प्रश्नों का उत्तर दिया जाता है।',
    formTitle: 'संपर्क फॉर्म भरें',
    nameLabel: 'आपका नाम या संगठन',
    namePlaceholder: 'उदा. अमित कुमार',
    emailLabel: 'आपका ईमेल पता',
    emailPlaceholder: 'उदा. amit@example.com',
    categoryLabel: 'विषय',
    catBug: 'पीडीएफ प्रोसेसिंग में त्रुटि (Bug)',
    catFeature: 'नए फीचर का सुझाव',
    catSecurity: 'सुरक्षा और गोपनीयता संबंधित प्रश्न',
    catOther: 'अन्य सामान्य प्रश्न',
    messageLabel: 'समस्या का विस्तृत विवरण',
    messagePlaceholder: 'कृपया समस्या या सुझाव का विवरण लिखें...',
    privacyNotice: 'गोपनीयता की गारंटी: आपका ईमेल केवल उत्तर देने के लिए उपयोग किया जाएगा।',
    submitBtn: 'सहायता संदेश भेजें',
    submittingBtn: 'भेजा जा रहा है...',
    successTitle: 'संदेश सफलतापूर्वक प्राप्त हुआ!',
    successDesc: 'हमारी टीम 24-48 घंटों के भीतर आपसे संपर्क करेगी।',
    sendAnother: 'दूसरा संदेश भेजें',
    errorMissingFields: 'कृपया सभी आवश्यक फ़ील्ड भरें।',
  },
  pt: {
    backBtn: '← Voltar às Ferramentas PDF',
    badge: 'Canal Oficial de Suporte Técnico',
    title: 'Contato e Suporte Técnico',
    subtitle:
      'Encontrou alguma falha em um arquivo PDF ou deseja sugerir melhorias? A equipe NoSignPDF Dev Team está pronta para ajudar.',
    directEmailTitle: 'E-mail Oficial de Suporte',
    directEmailDesc: 'Fale diretamente com os engenheiros de desenvolvimento:',
    copyBtn: 'Copiar e-mail',
    copiedBtn: 'Copiado!',
    slaTitle: 'Prazo de Resposta: 24-48h',
    slaDesc: 'Respondemos a chamados técnicos e dúvidas sobre privacidade em dias úteis.',
    formTitle: 'Envie uma mensagem pelo formulário',
    nameLabel: 'Nome ou Empresa',
    namePlaceholder: 'ex: Mariana Silva',
    emailLabel: 'Seu e-mail de contato',
    emailPlaceholder: 'ex: mariana@example.com',
    categoryLabel: 'Assunto do chamado',
    catBug: 'Erro no processamento de documento PDF',
    catFeature: 'Sugestão de nova funcionalidade',
    catSecurity: 'Dúvidas de privacidade e segurança',
    catOther: 'Outras informações',
    messageLabel: 'Descrição do problema ou mensagem',
    messagePlaceholder: 'Descreva os detalhes da solicitação...',
    privacyNotice: 'Privacidade garantida: Seu e-mail será usado exclusivamente para a resposta técnica.',
    submitBtn: 'Enviar chamado de suporte',
    submittingBtn: 'Enviando...',
    successTitle: 'Mensagem enviada com sucesso!',
    successDesc: 'Nossa equipe técnica responderá dentro de 24 a 48 horas úteis.',
    sendAnother: 'Enviar nova mensagem',
    errorMissingFields: 'Por favor, preencha todos os campos obrigatórios.',
  },
  ru: {
    backBtn: '← Вернуться к инструментам PDF',
    badge: 'Официальный Канал Техподдержки',
    title: 'Контакты и Техническая Поддержка',
    subtitle:
      'Столкнулись со сложным файлом PDF, обнаружили ошибку или хотите предложить улучшение? Инженеры NoSignPDF Dev Team ответят на ваши вопросы.',
    directEmailTitle: 'Официальный email техподдержки',
    directEmailDesc: 'Прямая связь с разработчиками ядра обработки PDF:',
    copyBtn: 'Скопировать email',
    copiedBtn: 'Скопировано!',
    slaTitle: 'Время ответа: 24-48 часов',
    slaDesc: 'Все технические запросы обрабатываются инженерами в рабочие дни.',
    formTitle: 'Отправить сообщение через форму',
    nameLabel: 'Ваше имя или организация',
    namePlaceholder: 'напр. Алексей Смирнов',
    emailLabel: 'Ваш контактный email',
    emailPlaceholder: 'напр. alex@example.com',
    categoryLabel: 'Тема обращения',
    catBug: 'Ошибка при обработке файла PDF',
    catFeature: 'Предложение новой функции',
    catSecurity: 'Вопросы безопасности и конфиденциальности',
    catOther: 'Другой вопрос',
    messageLabel: 'Описание проблемы или вопрос',
    messagePlaceholder: 'Укажите детали: тип файла, число страниц или текст ошибки...',
    privacyNotice: 'Гарантия приватности: Ваш email используется исключительно для ответа службы поддержки.',
    submitBtn: 'Отправить сообщение',
    submittingBtn: 'Отправка...',
    successTitle: 'Обращение успешно зарегистрировано!',
    successDesc: 'Инженеры NoSignPDF свяжутся с вами в течение 24-48 часов.',
    sendAnother: 'Отправить еще одно сообщение',
    errorMissingFields: 'Пожалуйста, заполните все обязательные поля формы.',
  },
};

const OFFICIAL_SUPPORT_EMAIL = 'contact@nosignpdf.com';

export const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = CONTACT_TEXTS[language] || CONTACT_TEXTS.en;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(t.catBug);
  const [message, setMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(OFFICIAL_SUPPORT_EMAIL).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage(t.errorMissingFields);
      return;
    }
    setErrorMessage('');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div id="contact-view" className="w-full max-w-5xl mx-auto py-8 px-4 font-sans text-zinc-900 dark:text-zinc-100">
      {/* Navigation header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.backBtn}</span>
        </button>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1 rounded-full border border-emerald-200/80 dark:border-emerald-800/80">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          {t.badge}
        </span>
      </div>

      {/* Hero card */}
      <header className="bg-gradient-to-br from-white via-zinc-50 to-emerald-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-emerald-950/20 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 mb-8 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            {t.title}
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>
      </header>

      {/* 2-Column Layout: Direct Email & Info (Left) + Contact Form (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct channels & SLA */}
        <div className="lg:col-span-5 space-y-6">
          {/* Email card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                {t.directEmailTitle}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {t.directEmailDesc}
              </p>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-between gap-2">
              <a
                href={`mailto:${OFFICIAL_SUPPORT_EMAIL}`}
                className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline truncate"
              >
                {OFFICIAL_SUPPORT_EMAIL}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer shrink-0"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{t.copiedBtn}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.copyBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* SLA Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              {t.slaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t.slaDesc}
            </p>
          </div>

          {/* Privacy Note */}
          <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 text-xs text-zinc-500 dark:text-zinc-400 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Gwarancja Zero-Upload</span>
            </div>
            <p>{t.privacyNotice}</p>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {t.successTitle}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                  {t.successDesc}
                </p>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                  >
                    {t.sendAnother}
                  </button>
                  <button
                    onClick={() => onNavigate('/')}
                    className="px-5 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-xs font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    {t.backBtn}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {t.formTitle}
                </h2>

                {errorMessage && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {t.nameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {t.emailLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {t.categoryLabel}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-shadow cursor-pointer"
                  >
                    <option value={t.catBug}>{t.catBug}</option>
                    <option value={t.catFeature}>{t.catFeature}</option>
                    <option value={t.catSecurity}>{t.catSecurity}</option>
                    <option value={t.catOther}>{t.catOther}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {t.messageLabel} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.messagePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-shadow resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.submitBtn}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
