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

    const newMovie = {
      id: movies.length + 1,
      title,
      year: year || 'Not specified',
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
    const { userId, movieId, status } = req.body;

    if (!userId || !movieId) {
      return res.status(400).json({
        error: 'User ID and Movie ID are required'
      });
    }

    const user = users.find(u => u.id === Number(userId));
    const movie = movies.find(m => m.id === Number(movieId));

    if (!user || !movie) {
      return res.status(404).json({
        error: 'User or Movie not found'
      });
    }

    const newWatchlistEntry = {
      id: watchlists.length + 1,
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
    const { id } = req.params;
    const { status, rating, notes } = req.body;

    const item = watchlists.find(w => w.id === Number(id));
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
