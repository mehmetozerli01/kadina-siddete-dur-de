import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

// Lazy load pages for better performance
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const News = lazy(() => import('../pages/News'));
const Stories = lazy(() => import('../pages/Stories'));
const Stats = lazy(() => import('../pages/Stats'));
const LiveStats = lazy(() => import('../pages/LiveStats'));
const Scenarios = lazy(() => import('../pages/Scenarios'));
const ViolenceMap = lazy(() => import('../pages/ViolenceMap'));
const Library = lazy(() => import('../pages/Library'));
const Help = lazy(() => import('../pages/Help'));
const SafeJournal = lazy(() => import('../pages/SafeJournal'));
const SocialShare = lazy(() => import('../pages/SocialShare'));
const SafetyPlan = lazy(() => import('../pages/SafetyPlan'));
const ChildrenHome = lazy(() => import('../pages/ChildrenHome'));
const ChildrenStories = lazy(() => import('../pages/ChildrenStories'));
const ChildrenGames = lazy(() => import('../pages/ChildrenGames'));
const ChildrenSafety = lazy(() => import('../pages/ChildrenSafety'));
const ChildrenColoring = lazy(() => import('../pages/ChildrenColoring'));
const ParentGuide = lazy(() => import('../pages/ParentGuide'));

// Loading component
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    fontSize: '1.2rem',
    color: 'var(--primary-purple)'
  }}>
    <div style={{
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💜</div>
      <div>Yükleniyor...</div>
    </div>
  </div>
);

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="news" element={<News />} />
            <Route path="stories" element={<Stories />} />
            <Route path="stats" element={<Stats />} />
            <Route path="live-stats" element={<LiveStats />} />
            <Route path="scenarios" element={<Scenarios />} />
            <Route path="violence-map" element={<ViolenceMap />} />
            <Route path="library" element={<Library />} />
            <Route path="help" element={<Help />} />
            <Route path="güvenli-kayıt" element={<SafeJournal />} />
            <Route path="sosyal-paylaşım" element={<SocialShare />} />
            <Route path="güvenlik-planı" element={<SafetyPlan />} />
            {/* Çocuk Modülü */}
            <Route path="çocuklar" element={<ChildrenHome />} />
            <Route path="çocuklar/hikayeler" element={<ChildrenStories />} />
            <Route path="çocuklar/oyunlar" element={<ChildrenGames />} />
            <Route path="çocuklar/güvenlik" element={<ChildrenSafety />} />
            <Route path="çocuklar/acil-yardım" element={<ChildrenSafety />} />
            <Route path="çocuklar/boyama" element={<ChildrenColoring />} />
            <Route path="çocuklar/ebeveyn-rehberi" element={<ParentGuide />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;