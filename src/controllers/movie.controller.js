import { users, movies, watchlists } from '../data/db.js';


export const getMovies = async(req, res) => {
  try {
    res.status(200).json(movies);
  } 
  catch (error) {
    res.status(500).json({error: 'Failed to fetch movies'});
  }
};

export const addMovie = (req, res) => {
  try {
    const { title, year } = req.body;

    if (!title) {
      return res.status(400).json({
        error: 'Movie title is required'
      });
    }
    if (movies.find(m => m.title.toLowerCase() === title.toLowerCase() && m.year === year)) {
      return res.status(400).json({
        error: 'Movie with this title and year already exists'
      });
    }
  
    const newMovie = {
      id: movies.length + 1,
      title,
      year: year, 
      createdAt: new Date()
    };

    movies.push(newMovie);

    res.status(201).json({
      message: 'Movie added successfully',
      movie: newMovie
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to add movie'
    });
  }
};

export const addToWatchlist = (req, res) => {
  try {
    const { movieId, status } = req.body;
    const { userId } = req.params;
    
    if (!movieId) {
      return res.status(400).json({
        error: 'Movie ID is required'
      });
    }

    const user = users.find(u => u.id === Number(userId));
    const movie = movies.find(m => m.id === Number(movieId));

    if (!user || !movie) {
      return res.status(404).json({
        error: 'User or Movie not found'
      });
    }
    if (watchlists.some(w => w.userId === Number(userId) && w.movieId === Number(movieId))) {
      return res.status(400).json({
        error: 'Movie already in watchlist'
      });
    }
    const newWatchlistEntry = {
      watchlistID: watchlists.length + 1,
      userId: Number(userId),
      movieId: Number(movieId),
      status: status || 'want-to-watch',
      addedAt: new Date()
    };

    watchlists.push(newWatchlistEntry);

    res.status(201).json({
      message: 'Movie added to watchlist',
      watchlist: newWatchlistEntry
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to add movie to watchlist'
    });
  }
};

export const getUserWatchlist = (req, res) => {
  try {
    const { userId } = req.params;

    const userWatchlist = watchlists.filter(
      item => item.userId === Number(userId)
    );

    res.json(userWatchlist);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch watchlist'
    });
  }
};

export const updateWatchlistItem = (req, res) => {
  try {
    const { userId } = req.params;
    const { watchlistID, status, rating, notes } = req.body;

    const item = watchlists.find(w => w.watchlistID === Number(watchlistID) && w.userId === Number(userId));
    if (!item) {
      return res.status(404).json({
        error: 'Watchlist item not found'
      });
    }

    if (status) item.status = status;
    if (rating) item.rating = rating;
    if (notes) item.notes = notes;

    res.json({
      message: 'Watchlist updated',
      item
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update watchlist'
    });
  }
};

export const deleteWatchlistItem = (req, res) => {
  try {
    const { userId, watchlistID } = req.params;

    const index = watchlists.findIndex(
      w =>
        w.watchlistID === Number(watchlistID) &&
        w.userId === Number(userId)
    );

    if (index === -1) {
      return res.status(404).json({
        error: 'Watchlist item not found'
      });
    }

    const removedItem = watchlists.splice(index, 1)[0];

    res.json({
      message: 'Movie removed from watchlist',
      removed: removedItem
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete watchlist item'
    });
  }
};
