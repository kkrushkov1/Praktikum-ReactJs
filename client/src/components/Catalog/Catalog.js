import { useContext } from "react";
import { CatalogItem } from "./CatalogItem/CatalogItem";
import { GameContext } from "../../contexts/GameContext";

export const Catalog = () => {
    const { games } = useContext(GameContext);
    return (
        <section id="catalog-page">
            {games.length > 0 ? (
                games.map((x) => <CatalogItem key={x.id} game={x} />)
            ) : (
                <h3 className="no-articles">No articles yet</h3>
            )}
        </section>
    );
};
