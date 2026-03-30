import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';

export function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // In a real app, fetch details based on ID. Here we use translations.
  const serviceKey = `services.items.${id}`;
  const title = t(`${serviceKey}.title`);
  const description = t(`${serviceKey}.description`);
  const deliverables = t(`${serviceKey}.deliverables`, { returnObjects: true }) as string[];

  if (!title || title === `${serviceKey}.title`) {
    return <div className="p-24 text-center">Service not found</div>;
  }

  const packages = [
    {
      name: t('services.packages.basic'),
      price: 'SAR 5,000',
      features: deliverables.slice(0, 1),
      isPopular: false,
    },
    {
      name: t('services.packages.standard'),
      price: 'SAR 10,000',
      features: deliverables.slice(0, 2),
      isPopular: true,
    },
    {
      name: t('services.packages.premium'),
      price: 'SAR 15,000',
      features: deliverables,
      isPopular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {title}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-sm border ${
                pkg.isPopular ? 'border-blue-500 shadow-xl scale-105 z-10' : 'border-slate-200'
              } overflow-hidden flex flex-col`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 inset-x-0 bg-blue-500 text-white text-xs font-bold uppercase tracking-wider text-center py-1.5">
                  {isRtl ? 'الأكثر طلباً' : 'Most Popular'}
                </div>
              )}
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className={`text-2xl font-bold mb-2 ${pkg.isPopular ? 'mt-4' : ''}`}>
                  {pkg.name}
                </h3>
                <div className="text-3xl font-extrabold text-slate-900 mb-8">
                  {pkg.price}
                </div>
                
                <ul className="space-y-4 flex-1 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-600 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={`/checkout?service=${id}&package=${pkg.name}`}
                  className={`w-full py-4 rounded-xl font-semibold text-center transition-all flex items-center justify-center gap-2 ${
                    pkg.isPopular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  {t('services.packages.orderNow')}
                  <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
