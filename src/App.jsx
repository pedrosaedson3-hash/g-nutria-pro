// CÓDIGO FINAL DO G-NUTRIA PRO (EFPG creation) - COPIAR TUDO ABAIXO E COLAR NO src/App.jsx

import { useState, useMemo, useEffect } from 'react';
import { Send, Globe, Award, Zap, CheckCircle, XCircle } from 'lucide-react';

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
        upgradeSuccessMessage: 'Seu acesso PRO foi ativado no Firestore. O próximo passo seria o pagamento real.',
        backToDashboard: 'Voltar ao Dashboard',
        paymentSimulated: 'Pagamento Simulado',
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
        upgradeSuccessMessage: 'O seu acesso PRO foi ativado no Firestore. O próximo passo seria o pagamento real.',
        backToDashboard: 'Voltar ao Painel',
        paymentSimulated: 'Pagamento Simulado',
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
        upgradeSuccessMessage: 'Tu acceso PRO ha sido activado en Firestore. El siguiente paso sería el pago real.',
        backToDashboard: 'Volver al Panel',
        paymentSimulated: 'Pago Simulado',
    }
};

const App = () => {
    // Simula o status da assinatura do usuário no Firestore
    const [isPro, setIsPro] = useState(false);
    // Simula o idioma atual
    const [currentLang, setCurrentLang] = useState('pt-BR');
    // Controla a navegação entre dashboard e tela de upgrade/sucesso
    const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard', 'upgrade', 'success'

    // Alias para o dicionário de tradução atual
    const T = useMemo(() => TRANSLATIONS[currentLang], [currentLang]);

    // Simulação de dados do usuário
    const [userData, setUserData] = useState({
        weight: '85.2',
        pressure: '120/80',
        glucose: '95',
    });

    // Função que simula a ativação da assinatura no Firestore
    const handleUpgradeSubscription = () => {
        // Simula a lógica de pagamento e atualização do Firestore
        // console.log("Simulação de pagamento iniciada...");

        // Na vida real, aqui você chamaria uma Cloud Function para iniciar o Stripe Checkout/PIX.

        // Atualiza o estado para simular o sucesso e vai para a tela de sucesso
        setTimeout(() => {
            setIsPro(true);
            setCurrentPage('success');
            // console.log("Status PRO atualizado no Firestore (simulado).");
        }, 1000);
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
            <p className="text-xs text-gray-400 mt-1">{T.lastRecord}: Hoje</p>
        </div>
    );

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
                {T.backToDashboard}
            </button>
        </div>
    );


    // Renderiza a tela apropriada
    if (currentPage === 'upgrade') {
        return (
            <div className="min-h-screen bg-gray-100 p-4">
                <header className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
                    <h1 className="text-xl font-bold text-gray-900">{T.appName}</h1>
                    <LanguageSelector />
                </header>
                <UpgradeScreen />
            </div>
        );
    }

    if (currentPage === 'success') {
        return (
            <div className="min-h-screen bg-gray-100 p-4">
                <header className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
                    <h1 className="text-xl font-bold text-gray-900">{T.appName}</h1>
                    <LanguageSelector />
                </header>
                <SuccessScreen />
            </div>
        );
    }


    // Renderiza o Dashboard (página padrão)
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
                <h1 className="text-xl font-bold text-gray-900">{T.appName}</h1>
                <LanguageSelector />
            </header>

            <main className="max-w-7xl mx-auto p-6 lg:p-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">{T.dashboard}</h2>

                {/* --- Grid de Informações e Status --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <SubscriptionCard />

                    <DataCard
                        title={T.titleWeight}
                        value={userData.weight}
                        unit="Kg"
                        icon={Zap}
                        color="#EF4444" // Vermelho
                    />
                    <DataCard
                        title={T.titlePressure}
                        value={userData.pressure}
                        unit=""
                        icon={Zap}
                        color="#3B82F6" // Azul
                    />
                    <DataCard
                        title={T.titleGlucose}
                        value={userData.glucose}
                        unit="mg/dL"
                        icon={Zap}
                        color="#10B981" // Verde
                    />
                </div>

                {/* --- Proactive Alert / Upgrade Section (Se não for PRO) --- */}
                {!isPro && (
                    <div className="p-6 bg-purple-100 border-l-4 border-purple-500 rounded-lg shadow-lg mb-8 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-purple-800">{T.upgradeToPro}</h3>
                            <p className="text-sm text-purple-700">{T.upgradeDescription}</p>
                            <ul className="mt-2 text-sm text-purple-700 list-disc list-inside">
                                <li>{T.feature1}</li>
                                <li>{T.feature2}</li>
                                <li>{T.feature3}</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => setCurrentPage('upgrade')}
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
                        >
                            {T.startUpgrade}
                        </button>
                    </div>
                )}

                {/* --- Área de Chat (Central) --- */}
                <div className="bg-white rounded-xl shadow-2xl p-6 h-96 flex flex-col">
                    <div className="flex-grow overflow-y-auto mb-4 p-4 border rounded-lg bg-gray-50">
                        {/* Aqui entrariam as mensagens do chat */}
                        <p className="text-gray-500 italic">Área de Chat com o modelo G/Gemini (Implementação futura).</p>
                    </div>

                    <form className="flex items-center">
                        <input
                            type="text"
                            placeholder={T.chatPlaceholder}
                            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {/* Botão de envio, finalizado no trecho anterior */}
                        <button
                            type="submit"
                            className="w-12 h-12 flex items-center justify-center
                bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition
                duration-150 disabled:bg-gray-400 hover:shadow-xl"
                            aria-label="Enviar mensagem"
                        >
                            <Send className="w-5 h-5" aria-hidden="true" />
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default App;
