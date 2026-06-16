import {BrowserRouter,Routes,Route,} from "react-router-dom";
import LibraryView from "../Views/LibraryView";
import StatsView from "../Views/StatsView";
import GameView from "../Views/GameView"
import YearView from "../Views/YearView"

function AppRouter() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LibraryView />} />
                    <Route path="/stats" element={<StatsView />} />
                    <Route path="/game/:id" element={<GameView />} />
                    <Route path="/stats/:year" element={<YearView />} />
                </Routes>
            </BrowserRouter>
    );
}

export default AppRouter;