import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../shared/LanguageSwitcher';
import { ShieldPlus, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Layout() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/assessment', label: t('nav.assessment') },
    { to: '/dashboard/client', label: t('nav.clientDashboard') },
    { to: '/dashboard/admin', label: t('nav.adminDashboard') },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans ${i18n.language === 'ar' ? 'font-arabic' : ''}`}>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ShieldPlus className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:inline-block">
              PharmaCBAHI
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="w-px h-4 bg-slate-200 mx-2" />
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-md"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="flex flex-col container mx-auto px-4 py-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-slate-600 hover:text-blue-600"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldPlus className="w-6 h-6 text-blue-400" />
              <span className="font-bold text-lg text-white">PharmaCBAHI</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t('home.hero.subheadline')}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">{t('nav.services')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-white transition-colors">{t('services.items.policies.title')}</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">{t('services.items.cbahi.title')}</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">{t('services.items.safety.title')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Riyadh, Saudi Arabia</li>
              <li>contact@pharmacbahi.com</li>
              <li>+966 50 000 0000</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
          © {new Date().getFullYear()} PharmaCBAHI Solutions. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
