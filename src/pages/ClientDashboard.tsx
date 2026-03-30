import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { FileText, UploadCloud, MessageSquare, CreditCard, Activity, CheckCircle2, Clock } from 'lucide-react';

export function ClientDashboard() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const stats = [
    { label: t('dashboard.client.activeProjects'), value: '2', icon: <Activity className="w-6 h-6 text-blue-600" /> },
    { label: t('dashboard.client.documents'), value: '14', icon: <FileText className="w-6 h-6 text-emerald-600" /> },
    { label: t('dashboard.client.invoices'), value: '3', icon: <CreditCard className="w-6 h-6 text-amber-600" /> },
  ];

  const projects = [
    {
      id: 1,
      name: t('services.items.policies.title'),
      status: 'In Progress',
      progress: 65,
      lastUpdate: '2 days ago',
    },
    {
      id: 2,
      name: t('services.items.cbahi.title'),
      status: 'Review',
      progress: 90,
      lastUpdate: '1 day ago',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {t('dashboard.client.title')}
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm">
            <UploadCloud className="w-4 h-4" />
            {t('dashboard.client.upload')}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Projects */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              {t('dashboard.client.activeProjects')}
            </h2>
            
            {projects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{project.name}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Last updated: {project.lastUpdate}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="mb-2 flex justify-between text-sm font-medium">
                  <span className="text-slate-600">Progress</span>
                  <span className="text-slate-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity / Messages */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              {t('dashboard.client.messages')}
            </h2>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <span className="font-bold text-blue-700">PC</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">PharmaConsultant</p>
                    <p className="text-sm text-slate-600 mt-1">Please review the latest policy draft uploaded to the documents section.</p>
                    <p className="text-xs text-slate-400 mt-2">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <span className="font-bold text-emerald-700">SY</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">System</p>
                    <p className="text-sm text-slate-600 mt-1">Invoice #INV-2023-045 has been paid successfully.</p>
                    <p className="text-xs text-slate-400 mt-2">1 day ago</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                View All Messages
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
