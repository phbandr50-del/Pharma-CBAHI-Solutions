import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, LineChart } from 'lucide-react';
import { motion } from 'motion/react';

export function Home() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
      title: t('home.features.items.0.title'),
      description: t('home.features.items.0.description'),
    },
    {
      icon: <Activity className="w-10 h-10 text-emerald-600" />,
      title: t('home.features.items.1.title'),
      description: t('home.features.items.1.description'),
    },
    {
      icon: <LineChart className="w-10 h-10 text-indigo-600" />,
      title: t('home.features.items.2.title'),
      description: t('home.features.items.2.description'),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-24 pb-32">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pharmacy/1920/1080?blur=4')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 to-slate-100/90" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-6 tracking-wide uppercase">
                {isRtl ? 'استشارات صيدلة المستشفيات' : 'Hospital Pharmacy Consulting'}
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
                {t('home.hero.headline')}
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                {t('home.hero.subheadline')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/services"
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {t('home.hero.ctaPrimary')}
                  <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
                <Link
                  to="/assessment"
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-lg font-semibold text-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  {t('home.hero.ctaSecondary')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('home.features.title')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-12 text-slate-400">
            {isRtl ? 'موثوقون من قبل مؤسسات الرعاية الصحية الرائدة' : 'Trusted by Leading Healthcare Institutions'}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder for logos */}
            <div className="text-2xl font-bold font-serif">Medical Center A</div>
            <div className="text-2xl font-bold font-serif">Hospital B</div>
            <div className="text-2xl font-bold font-serif">Healthcare Group C</div>
            <div className="text-2xl font-bold font-serif">Clinic D</div>
          </div>
        </div>
      </section>
    </div>
  );
}
