/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ServiceDetails } from './pages/ServiceDetails';
import { Checkout } from './pages/Checkout';
import { ClientDashboard } from './pages/ClientDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { SelfAssessment } from './pages/SelfAssessment';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServiceDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="dashboard/client" element={<ClientDashboard />} />
          <Route path="dashboard/admin" element={<AdminDashboard />} />
          <Route path="assessment" element={<SelfAssessment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
