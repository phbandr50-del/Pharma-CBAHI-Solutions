import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FileText, ClipboardCheck, AlertTriangle, TrendingUp, Database, FileSignature, ArrowRight } from 'lucide-react';

export function Services() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const services = [
    {
      id: 'policies',
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: t('services.items.policies.title'),
      description: t('services.items.policies.description'),
      deliverables: t('services.items.policies.deliverables', { returnObjects: true }) as string[],
    },
    {
      id: 'cbahi',
      icon: <ClipboardCheck className="w-8 h-8 text-emerald-600" />,
      title: t('services.items.cbahi.title'),
      description: t('services.items.cbahi.description'),
      deliverables: t('services.items.cbahi.deliverables', { returnObjects: true }) as string[],
    },
    {
      id: 'safety',
      icon: <AlertTriangle className="w-8 h-8 text-amber-600" />,
      title: t('services.items.safety.title'),
      description: t('services.items.safety.description'),
      deliverables: t('services.items.safety.deliverables', { returnObjects: true }) as string[],
    },
    {
      id: 'pip',
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      title: t('services.items.pip.title'),
      description: t('services.items.pip.description'),
      deliverables: t('services.items.pip.deliverables', { returnObjects: true }) as string[],
    },
    {
      id: 'data',
      icon: <Database className="w-8 h-8 text-cyan-600" />,
      title: t('services.items.data.title'),
      description: t('services.items.data.description'),
      deliverables: t('services.items.data.deliverables', { returnObjects: true }) as string[],
    },
    {
      id: 'forms',
      icon: <FileSignature className="w-8 h-8 text-rose-600" />,
      title: t('services.items.forms.title'),
      description: t('services.items.forms.description'),
      deliverables: t('services.items.forms.deliverables', { returnObjects: true }) as string[],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {t('services.title')}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all flex flex-col h-full group"
            >
              <div className="p-8 flex-1 flex flex-col">
                <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-8 flex-1 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                    {isRtl ? 'المخرجات:' : 'Deliverables:'}
                  </h4>
                  <ul className="space-y-3">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 border-t border-slate-100 mt-auto">
                <Link
                  to={`/services/${service.id}`}
                  className="w-full py-3 px-4 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-900 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {isRtl ? 'عرض الباقات' : 'View Packages'}
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
