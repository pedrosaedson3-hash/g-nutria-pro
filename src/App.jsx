// CÓDIGO FINAL DO G-NUTRIA PRO (EFPG creation) - COPIAR TUDO ABAIXO E COLAR NO src/App.jsx

import { useState, useMemo } from 'react';
// Ícones de peso, pressão (coração), glicose (gota), e outros ícones
import { Send, Globe, Award, Zap, CheckCircle, XCircle, Scale, Heart, Droplet, PlusCircle } from 'lucide-react';

// --- TRANSLATIONS (i18n) ---
const TRANSLATIONS = {
    'pt-BR': {
        appName: 'G-NUTRIA PRO (EFPG creation)',
        dashboard: 'Dashboard',
        freeTrial: 'Teste Gratuito de 7 Dias',
        subscriptionStatus: 'Status da Assinatura',
        active: 'Ativa',
        pendingUpgrade: 'Pendente: Upgrade',
        titleWeight: 'Peso (Kg)',
        titlePressure: 'Pressão Arterial (PA)',
        titleGlucose: 'Glicose (mg/dL)',
        lastRecord: 'Último Registro',
        upgradeToPro: 'Upgrade para PRO',
        upgradeDescription: 'Desbloqueie todos os recursos PRO com uma assinatura mensal.',
        feature1: 'Análise de dados completa',
        feature2: 'Relatórios avançados do Professor G',
        feature3: 'Suporte prioritário 24/7',
        price: 'R$ 29,90 / mês',
        startUpgrade: 'Iniciar Upgrade',
        cancel: 'Cancelar',
        chatPlaceholder: 'Enviar mensagem',
        upgradeScreenTitle: 'Escolha seu Plano PRO',
        basicPlanTitle: 'Plano Básico',
        proPlanTitle: 'Plano PRO',
        planFeature1: '7 dias grátis',
        planFeature2: 'Acesso a todos os cards',
        planFeature3: 'Sem anúncios',
        planFeature4: 'Relatórios diários',
        planFeature5: 'Relatórios avançados',
        planFeature6: 'Suporte dedicado G/Gemini',
        selectPlan: 'Selecionar Plano',
        upgradeSuccessTitle: 'Parabéns, Assinatura Ativada!',
        upgradeSuccessMessage: 'Seu acesso PRO foi ativado no Firestore (Simulado).',
        backToDashboard: 'Voltar ao Dashboard',
        paymentSimulated: 'Pagamento Simulado',
        // NOVOS TEXTOS PARA FUNCIONALIDADE
        enterData: 'Registrar Dados',
        weightPlaceholder: 'Ex: 85.2',
        pressurePlaceholder: 'Ex: 120/80',
        glucosePlaceholder: 'Ex: 95',
        saveData: 'Salvar Registro',
        dataSavedSuccess: 'Dados salvos com sucesso!',
        dataEntryTitle: 'Novo Registro de Saúde',
    },
    'pt-PT': {
        appName: 'G-NUTRIA PRO (EFPG creation)',
        dashboard: 'Painel',
        freeTrial: 'Teste Gratuito de 7 Dias',
        subscriptionStatus: 'Estado da Subscrição',
        active: 'Ativa',
        pendingUpgrade: 'Pendente: Upgrade',
        titleWeight: 'Peso (Kg)',
        titlePressure: 'Tensão Arterial (TA)',
        titleGlucose: 'Glicose (mg/dL)',
        lastRecord: 'Último Registo',
        upgradeToPro: 'Upgrade para PRO',
        upgradeDescription: 'Desbloqueie todas as funcionalidades PRO com uma subscrição mensal.',
        feature1: 'Análise de dados completa',
        feature2: 'Relatórios avançados do Professor G',
        feature3: 'Apoio prioritário 24/7',
        price: '€ 6,90 / mês',
        startUpgrade: 'Iniciar Upgrade',
        cancel: 'Cancelar',
        chatPlaceholder: 'Enviar mensagem',
        upgradeScreenTitle: 'Escolha o seu Plano PRO',
        basicPlanTitle: 'Plano Básico',
        proPlanTitle: 'Plano PRO',
        planFeature1: '7 dias grátis',
        planFeature2: 'Acesso a todos os cards',
        planFeature3: 'Sem anúncios',
        planFeature4: 'Relatórios diários',
        planFeature5: 'Relatórios avançados',
        planFeature6: 'Apoio dedicado G/Gemini',
        selectPlan: 'Selecionar Plano',
        upgradeSuccessTitle: 'Parabéns, Subscrição Ativada!',
        upgradeSuccessMessage: 'O seu acesso PRO foi ativado no Firestore (Simulado).',
        backToDashboard: 'Voltar ao Painel',
        paymentSimulated: 'Pagamento Simulado',
        // NOVOS TEXTOS PARA FUNCIONALIDADE
        enterData: 'Registar Dados',
        weightPlaceholder: 'Ex: 85.2',
        pressurePlaceholder: 'Ex: 120/80',
        glucosePlaceholder: 'Ex: 95',
        saveData: 'Guardar Registo',
        dataSavedSuccess: 'Dados guardados com sucesso!',
        dataEntryTitle: 'Novo Registo de Saúde',
    },
    'es-ES': {
        appName: 'G-NUTRIA PRO (EFPG creation)',
        dashboard: 'Panel de Control',
        freeTrial: 'Prueba Gratuita de 7 Días',
        subscriptionStatus: 'Estado de Suscripción',
        active: 'Activa',
        pendingUpgrade: 'Pendiente: Actualización',
        titleWeight: 'Peso (Kg)',
        titlePressure: 'Presión Arterial (PA)',
        titleGlucose: 'Glucosa (mg/dL)',
        lastRecord: 'Último Registro',
        upgradeToPro: 'Actualizar a PRO',
        upgradeDescription: 'Desbloquea todas las funciones PRO con una suscripción mensual.',
        feature1: 'Análisis de datos completo',
        feature2: 'Informes avanzados del Profesor G',
        feature3: 'Soporte prioritario 24/7',
        price: '€ 7,90 / mes',
        startUpgrade: 'Iniciar Actualización',
        cancel: 'Cancelar',
        chatPlaceholder: 'Enviar mensaje',
        upgradeScreenTitle: 'Elige tu Plan PRO',
        basicPlanTitle: 'Plan Básico',
        proPlanTitle: 'Plan PRO',
        planFeature1: '7 días gratis',
        planFeature2: 'Acceso a todas las tarjetas',
        planFeature3: 'Sin anuncios',
        planFeature4: 'Informes diarios',
        planFeature5: 'Informes avanzados',
        planFeature6: 'Soporte dedicado G/Gemini',
        selectPlan: 'Seleccionar Plano',
        upgradeSuccessTitle: '¡Felicidades, Suscripción Activada!',
        upgradeSuccessMessage: 'Tu acceso PRO ha sido activado en Firestore (Simulado).',
        backToDashboard: 'Volver al Panel',
        paymentSimulated: 'Pago Simulado',
        // NOVOS TEXTOS PARA FUNCIONALIDADE
        enterData: 'Registrar Datos',
        weightPlaceholder: 'Ej: 85.2',
        pressurePlaceholder: 'Ej: 120/80',
        glucosePlaceholder: 'Ej: 95',
        saveData: 'Guardar Registro',
        dataSavedSuccess: '¡Datos guardados con éxito!',
        dataEntryTitle: 'Nuevo Registro de Salud',
    }
};

const App = () => {
    // Simula o status da assinatura do usuário no Firestore
    const [isPro, setIsPro] = useState(false);
    // Simula o idioma atual
    const [currentLang, setCurrentLang] = useState('pt-BR');
    // Controla a navegação entre dashboard e tela de upgrade/sucesso/dataentry
    const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard', 'upgrade', 'success', 'dataentry'

    // Alias para o dicionário de tradução atual
    const T = useMemo(() => TRANSLATIONS[currentLang], [currentLang]);

    // Simulação de DADOS ATUAIS do usuário (Seriam puxados do Firestore)
    const [userData, setUserData] = useState({
        weight: '85.2',
        pressure: '120/80',
        glucose: '95',
        lastRecordTime: 'Hoje'
    });

    // Estado temporário para a entrada de novos dados (INPUTS)
    const [newData, setNewData] = useState({
        weight: '',
        pressure: '',
        glucose: '',
    });

    // Função que simula a ativação da assinatura no Firestore
    const handleUpgradeSubscription = () => {
        // Simula a lógica de pagamento e atualização do Firestore
        setTimeout(() => {
            setIsPro(true);
            setCurrentPage('success');
        }, 1000);
    };

    // FUNÇÃO QUE SALVA OS NOVOS DADOS
    const handleSaveData = (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        // Na vida real, esta função chamaria uma Cloud Function para salvar no Firestore.

        // Atualiza o Dashboard com os novos dados
        setUserData({
            weight: newData.weight || userData.weight, // Se vazio, mantém o antigo
            pressure: newData.pressure || userData.pressure,
            glucose: newData.glucose || userData.glucose,
            lastRecordTime: new Date().toLocaleTimeString(currentLang, { hour: '2-digit', minute: '2-digit' }),
        });

        // Limpa os inputs
        setNewData({ weight: '', pressure: '', glucose: '' });

        // Volta para o Dashboard e exibe a mensagem de sucesso
        setCurrentPage('dashboard');
        alert(T.dataSavedSuccess);
    };

    // --- Componentes ---

    const LanguageSelector = () => (
        <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-purple-600" />
            <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="bg-transparent text-gray-700 text-sm font-medium focus:outline-none"
            >
                {Object.keys(TRANSLATIONS).map((lang) => (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>
        </div>
    );

    const SubscriptionCard = () => (
        <div className={`p-4 rounded-xl shadow-lg ${isPro ? 'bg-green-50' : 'bg-yellow-50'} border ${isPro ? 'border-green-300' : 'border-yellow-300'}`}>
            <div className="flex justify-between items-center">
                <h3 className={`font-semibold ${isPro ? 'text-green-700' : 'text-yellow-700'}`}>
                    {T.subscriptionStatus}
                </h3>
                <Award className={`w-6 h-6 ${isPro ? 'text-green-500' : 'text-yellow-500'}`} />
            </div>
            <p className={`mt-1 text-sm ${isPro ? 'text-green-600' : 'text-yellow-600'}`}>
                {isPro ? T.active : T.freeTrial}
            </p>

            {!isPro && (
                <button
                    onClick={() => setCurrentPage('upgrade')}
                    className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
                >
                    {T.upgradeToPro}
                </button>
            )}
        </div>
    );

    const DataCard = ({ title, value, unit, icon: Icon, color }) => (
        <div className="p-4 bg-white rounded-xl shadow-md flex flex-col items-start border-l-4" style={{ borderColor: color }}>
            <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5" style={{ color: color }} />
                <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-2">
                {value} <span className="text-base font-normal text-gray-500">{unit}</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">{T.lastRecord}: {userData.lastRecordTime}</p>
        </div>
    );// ... no final do componente App, onde você decide o que renderizar
    if (currentPage === 'dashboard') {
        return (
            <div className="min-h-screen bg-gray-100 p-4 md:p-8">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-extrabold text-purple-700">{T.dashboard}</h1>
                    <LanguageSelector />
                </header>

                {/* --- AQUI É O LUGAR IDEAL PARA INSERIR O CÓDIGO DO BOTÃO --- */}
                <div className="mb-6">
                    <button
                        onClick={() => setCurrentPage('dataentry')}
                        className="w-full bg-purple-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-purple-600 transition shadow-lg flex items-center justify-center space-x-2"
                    >
                        <PlusCircle className="w-6 h-6" />
                        <span>{T.enterData}</span>
                    </button>
                </div>
                {/* ------------------------------------------------------------------ */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* O SubscriptionCard deve vir aqui ou em uma linha separada */}
                    <SubscriptionCard />

                    {/* Os DataCards (Peso, Pressão, Glicose) vêm logo abaixo */}
                    <DataCard
                        title={T.titleWeight}
                        value={userData.weight}
                        unit="Kg"
                        icon={Scale}
                        color="#EF4444" // Red-500
                    />
                    {/* ... (e o resto dos cards) */}
    // ...

    // --- NOVA TELA: ENTRADA DE DADOS ---
    const DataEntryScreen = () => (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-2xl mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{T.dataEntryTitle}</h2>
            <form onSubmit={handleSaveData} className="space-y-4">

                {/* Campo Peso */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                        <Scale className="w-4 h-4 mr-2 text-red-500" /> {T.titleWeight}
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        value={newData.weight}
                        onChange={(e) => setNewData({ ...newData, weight: e.target.value })}
                        placeholder={T.weightPlaceholder}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>

                {/* Campo Pressão Arterial */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                        <Heart className="w-4 h-4 mr-2 text-blue-500" /> {T.titlePressure}
                    </label>
                    <input
                        type="text"
                        value={newData.pressure}
                        onChange={(e) => setNewData({ ...newData, pressure: e.target.value })}
                        placeholder={T.pressurePlaceholder}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>

                {/* Campo Glicose */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                        <Droplet className="w-4 h-4 mr-2 text-green-500" /> {T.titleGlucose}
                    </label>
                    <input
                        type="number"
                        value={newData.glucose}
                        onChange={(e) => setNewData({ ...newData, glucose: e.target.value })}
                        placeholder={T.glucosePlaceholder}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>

                {/* Botões de Ação */}
                <div className="flex space-x-3 pt-2">
                    <button
                        type="button"
                        onClick={() => setCurrentPage('dashboard')}
                        className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg text-base font-medium hover:bg-gray-400 transition"
                    >
                        {T.cancel}
                    </button>
                    <button
                        type="submit"
                        className="flex-1 bg-purple-600 text-white py-3 rounded-lg text-base font-medium hover:bg-purple-700 transition"
                    >
                        {T.saveData}
                    </button>
                </div>
            </form>
        </div>
    );
    // --- FIM NOVA TELA: ENTRADA DE DADOS ---

    // (O restante dos componentes UpgradeScreen e SuccessScreen permanecem aqui, mas foram omitidos para brevidade)

    const UpgradeScreen = () => (
        <div className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow-2xl mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{T.upgradeScreenTitle}</h2>

            <div className="flex space-x-4">
                {/* Plano Básico (Simulado - Free Trial) */}
                <div className="flex-1 p-6 border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-gray-700">{T.basicPlanTitle}</h3>
                    <p className="text-4xl font-extrabold text-gray-900 mt-2">Grátis</p>
                    <ul className="mt-4 space-y-2 text-gray-600">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> {T.planFeature1}</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> {T.planFeature2}</li>
                        <li className="flex items-center"><XCircle className="w-4 h-4 text-red-500 mr-2" /> {T.planFeature5}</li>
                    </ul>
                    <button
                        onClick={() => setCurrentPage('dashboard')}
                        className="mt-6 w-full bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-medium"
                    >
                        {T.cancel}
                    </button>
                </div>

                {/* Plano PRO (O alvo) */}
                <div className="flex-1 p-6 border-2 border-purple-600 rounded-xl shadow-lg bg-purple-50">
                    <div className="text-xs font-semibold text-white bg-purple-600 inline-block px-3 py-1 rounded-full mb-2">PRO</div>
                    <h3 className="text-xl font-bold text-purple-700">{T.proPlanTitle}</h3>
                    <p className="text-4xl font-extrabold text-purple-900 mt-2">{T.price.split(' ')[0]}<span className="text-base font-normal text-gray-500"> {T.price.split(' ')[1]}</span></p>
                    <ul className="mt-4 space-y-2 text-gray-700">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-500 mr-2" /> {T.planFeature1}</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-500 mr-2" /> {T.planFeature2}</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-500 mr-2" /> {T.planFeature5}</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-500 mr-2" /> {T.planFeature6}</li>
                    </ul>
                    <button
                        onClick={handleUpgradeSubscription}
                        className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
                    >
                        {T.selectPlan}
                    </button>
                </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-6 font-semibold border-t pt-4">
                {T.paymentSimulated}
            </p>
        </div>
    );

    const SuccessScreen = () => (
        <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-2xl mt-20 text-center border-t-8 border-green-500">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{T.upgradeSuccessTitle}</h2>
            <p className="text-gray-600 mb-6">{T.upgradeSuccessMessage}</p>
            <button
                onClick={() => setCurrentPage('dashboard')}
                className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
            >
                {T.

