import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Upload from './pages/Upload';

import MyReviews from './pages/MyReviews/index';
import NotFound from './pages/NotFound/index';
import { PdfSummary, PdfGap, PdfEul, MarketPrice, Location } from './pages/Detailed';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="upload" element={<Upload />} />
        <Route path="review/:id/pdfsummary" element={<PdfSummary />} />
        <Route path="review/:id/gap" element={<PdfGap />} />
        <Route path="review/:id/eul" element={<PdfEul />} />
        <Route path="review/:id/marketprice" element={<MarketPrice />} />
        <Route path="review/:id/location" element={<Location />} />
        <Route path="/myreviews" element={<MyReviews />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
