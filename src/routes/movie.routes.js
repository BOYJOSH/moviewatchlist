import { Router } from "express";
import { addMovie, addToWatchlist, getMovies, getUserWatchlist, updateWatchlistItem, deleteWatchlistItem} from "../controllers/movie.controller.js";

const movieRouter = Router();
movieRouter.get("/movies", getMovies);
movieRouter.post("/movies", addMovie);
movieRouter.get("/watchlist/:userId", getUserWatchlist);
movieRouter.post("/watchlist/:userId", addToWatchlist);
movieRouter.put("/watchlist/:userId", updateWatchlistItem)
movieRouter.delete("/watchlist/:userId/:watchlistID", deleteWatchlistItem)
export default movieRouter;