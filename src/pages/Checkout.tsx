import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CreditCard, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export function Checkout() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isRtl = i18n.language === 'ar';
  
  const serviceId = searchParams.get('service');
  const packageName = searchParams.get('package');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/dashboard/client');
      }, 2000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-md w-full"
        >
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {t('checkout.success')}
          </h2>
          <p className="text-slate-600 mb-8">
            {isRtl ? 'جاري تحويلك إلى لوحة التحكم...' : 'Redirecting to dashboard...'}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {t('checkout.title')}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
              {t('checkout.summary')}
            </h2>
            
            <div className="space-y-6">
              <div className="flex justify-between items-start pb-6 border-b border-slate-100">
                <div>
                  <p className="font-semibold text-slate-900 mb-1">
                    {t(`services.items.${serviceId}.title`)}
                  </p>
                  <p className="text-sm text-slate-500">{packageName} Package</p>
                </div>
                <p className="font-bold text-lg text-slate-900">SAR 10,000</p>
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <p className="font-bold text-xl text-slate-900">Total</p>
                <p className="font-extrabold text-2xl text-blue-600">SAR 10,000</p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-blue-600" />
              {t('checkout.payment')}
            </h2>
            
            <div className="space-y-4 mb-8">
              {/* Mock Payment Options */}
              <label className="flex items-center justify-between p-4 border border-blue-500 rounded-xl bg-blue-50 cursor-pointer transition-all">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-slate-900">Credit Card (Visa/Mastercard)</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-6 bg-slate-200 rounded" />
                  <div className="w-10 h-6 bg-slate-200 rounded" />
                </div>
              </label>
              
              <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-all">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-slate-900">Mada</span>
                </div>
                <div className="w-10 h-6 bg-slate-200 rounded" />
              </label>
              
              <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-all">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-slate-900">Apple Pay / STC Pay</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-6 bg-slate-200 rounded" />
                  <div className="w-10 h-6 bg-slate-200 rounded" />
                </div>
              </label>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isProcessing ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  {t('checkout.payNow')}
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Secure encrypted payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
