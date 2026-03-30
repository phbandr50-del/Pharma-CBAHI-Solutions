import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ClipboardList, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function SelfAssessment() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const questions = t('assessment.questions', { returnObjects: true }) as string[];
  const [currentStep, setCurrentStep] = useState(-1); // -1 is start screen
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleStart = () => setCurrentStep(0);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentStep]: answer });
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    Object.values(answers).forEach((ans) => {
      if (ans === 'yes') score += 100;
      if (ans === 'partial') score += 50;
    });
    return Math.round(score / questions.length);
  };

  if (isComplete) {
    const score = calculateScore();
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-24">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl max-w-2xl w-full text-center"
        >
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 bg-blue-100">
            <CheckCircle2 className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {t('assessment.results.title')}
          </h2>
          <div className="text-6xl font-extrabold text-blue-600 mb-8">
            {score}%
          </div>
          
          <div className="bg-slate-50 p-6 rounded-2xl mb-8 text-left border border-slate-100">
            <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              {t('assessment.results.recommended')}
            </h3>
            <ul className="space-y-4">
              {score < 100 && (
                <li className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-200">
                  <span className="font-semibold text-slate-700">{t('services.items.cbahi.title')}</span>
                  <Link to="/services/cbahi" className="text-sm font-bold text-blue-600 hover:text-blue-700">
                    {isRtl ? 'عرض التفاصيل' : 'View Details'} →
                  </Link>
                </li>
              )}
              {answers[0] !== 'yes' && (
                <li className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-200">
                  <span className="font-semibold text-slate-700">{t('services.items.policies.title')}</span>
                  <Link to="/services/policies" className="text-sm font-bold text-blue-600 hover:text-blue-700">
                    {isRtl ? 'عرض التفاصيل' : 'View Details'} →
                  </Link>
                </li>
              )}
              {answers[1] !== 'yes' && (
                <li className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-200">
                  <span className="font-semibold text-slate-700">{t('services.items.safety.title')}</span>
                  <Link to="/services/safety" className="text-sm font-bold text-blue-600 hover:text-blue-700">
                    {isRtl ? 'عرض التفاصيل' : 'View Details'} →
                  </Link>
                </li>
              )}
            </ul>
          </div>
          
          <button
            onClick={() => {
              setCurrentStep(-1);
              setAnswers({});
              setIsComplete(false);
            }}
            className="text-slate-500 hover:text-slate-700 font-medium transition-colors"
          >
            {isRtl ? 'إعادة التقييم' : 'Retake Assessment'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        {currentStep === -1 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-12 rounded-3xl shadow-xl text-center border border-slate-200"
          >
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <ClipboardList className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
              {t('assessment.title')}
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              {t('assessment.subtitle')}
            </p>
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mx-auto"
            >
              {t('assessment.start')}
              <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
            className="bg-white p-10 rounded-3xl shadow-xl border border-slate-200"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
                {isRtl ? 'سؤال' : 'Question'} {currentStep + 1} / {questions.length}
              </span>
              <div className="flex gap-1">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 w-8 rounded-full ${
                      idx <= currentStep ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-12 leading-relaxed">
              {questions[currentStep]}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => handleAnswer('yes')}
                className="p-6 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 font-bold text-lg text-slate-700 hover:text-emerald-700 transition-all"
              >
                {t('assessment.yes')}
              </button>
              <button
                onClick={() => handleAnswer('partial')}
                className="p-6 rounded-2xl border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50 font-bold text-lg text-slate-700 hover:text-amber-700 transition-all"
              >
                {t('assessment.partial')}
              </button>
              <button
                onClick={() => handleAnswer('no')}
                className="p-6 rounded-2xl border-2 border-slate-200 hover:border-rose-500 hover:bg-rose-50 font-bold text-lg text-slate-700 hover:text-rose-700 transition-all"
              >
                {t('assessment.no')}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
