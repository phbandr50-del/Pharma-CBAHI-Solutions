import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Users, ShoppingCart, FileBarChart, DollarSign, Activity, Settings } from 'lucide-react';

export function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const stats = [
    { label: t('dashboard.admin.activeClients'), value: '42', icon: <Users className="w-6 h-6 text-blue-600" />, trend: '+12%' },
    { label: t('dashboard.admin.orders'), value: '156', icon: <ShoppingCart className="w-6 h-6 text-emerald-600" />, trend: '+8%' },
    { label: t('dashboard.admin.revenue'), value: 'SAR 450K', icon: <DollarSign className="w-6 h-6 text-amber-600" />, trend: '+24%' },
  ];

  const recentOrders = [
    { id: '#ORD-092', client: 'King Fahad Medical City', service: 'CBAHI Readiness', status: 'Active', amount: 'SAR 15,000' },
    { id: '#ORD-091', client: 'Al Habib Hospital', service: 'Policy Manual', status: 'Completed', amount: 'SAR 10,000' },
    { id: '#ORD-090', client: 'National Guard Health', service: 'Error Analysis', status: 'Pending', amount: 'SAR 5,000' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {t('dashboard.admin.title')}
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors shadow-sm">
            <Settings className="w-4 h-4" />
            {isRtl ? 'الإعدادات' : 'Settings'}
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
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </div>
              <div className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                {stat.trend}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                {isRtl ? 'الطلبات الأخيرة' : 'Recent Orders'}
              </h2>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                {isRtl ? 'عرض الكل' : 'View All'}
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                    <th className="p-4 font-semibold">Order ID</th>
                    <th className="p-4 font-semibold">Client</th>
                    <th className="p-4 font-semibold">Service</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium text-slate-900">{order.id}</td>
                      <td className="p-4 text-slate-600">{order.client}</td>
                      <td className="p-4 text-slate-600">{order.service}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-slate-900">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions / Reports */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileBarChart className="w-5 h-5 text-indigo-600" />
              {t('dashboard.admin.reports')}
            </h2>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-900">Monthly Revenue</span>
                </div>
                <span className="text-slate-400 group-hover:text-blue-600">→</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-900">Client Growth</span>
                </div>
                <span className="text-slate-400 group-hover:text-emerald-600">→</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <FileBarChart className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-900">Service Popularity</span>
                </div>
                <span className="text-slate-400 group-hover:text-amber-600">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
