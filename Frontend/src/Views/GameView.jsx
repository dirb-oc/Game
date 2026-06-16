import { loadGame } from "../Controllers/LibraryController";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BannerGame from "../Components/BannerGame";
import GameStats from "../Components/GameStats";
import Loading from "../Components/Loading"

function GameView() {
    const { id } = useParams();

    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refreshGame = () => {
        loadGame(id, setGame, setLoading, setError);
    };

    useEffect(() => {
        refreshGame();
    }, [id]);

    if (!game && loading) {
        return <Loading text="Cargando Juego..." />
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <>
            <BannerGame
                game={game}
                refreshGame={refreshGame}
            />

            <GameStats
                game={game}
                refreshGame={refreshGame}
            />
        </>
    );
}

export default GameView;