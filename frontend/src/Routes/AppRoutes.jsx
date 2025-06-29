import { Routes, Route } from 'react-router-dom'
import LibraryView from "../Views/LibraryView"
import StatisticsView from "../Views/StatisticsView"
import ReadLibrary from "../Views/ReadLibrary"
import WishView from "../Views/WishView"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LibraryView />} />
      <Route path="/estadisticas" element={<StatisticsView />} />
      <Route path="/:id/" element={<ReadLibrary />} />
      
      <Route path="/deseados" element={<WishView />} />
    </Routes>
  );
}

export default AppRoutes;