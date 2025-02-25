import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCreatedMovie } from '../../store/slices/userMoviesSlice';
import './CreateMovie.css';

const CreateMovieForm: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    Title: '',
    Year: '',
    Poster: '',
    Plot: '',
    Director: '',
    Actors: '',
    Genre: '',
    Runtime: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addCreatedMovie({
      ...formData,
      Type: 'movie',
      imdbID: '', // This will be generated in the reducer
    }));
    setFormData({
      Title: '',
      Year: '',
      Poster: '',
      Plot: '',
      Director: '',
      Actors: '',
      Genre: '',
      Runtime: '',
    });
  };

  return (
    <form className="create-movie-form" onSubmit={handleSubmit}>
      <h2>Create New Movie</h2>

      <div className="form-group">
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          id="Title"
          name="Title"
          value={formData.Title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="Year">Year</label>
        <input
          type="text"
          id="Year"
          name="Year"
          value={formData.Year}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="Poster">Poster URL</label>
        <input
          type="url"
          id="Poster"
          name="Poster"
          value={formData.Poster}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="Plot">Plot</label>
        <textarea
          id="Plot"
          name="Plot"
          value={formData.Plot}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="Director">Director</label>
        <input
          type="text"
          id="Director"
          name="Director"
          value={formData.Director}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="Actors">Actors</label>
        <input
          type="text"
          id="Actors"
          name="Actors"
          value={formData.Actors}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="Genre">Genre</label>
        <input
          type="text"
          id="Genre"
          name="Genre"
          value={formData.Genre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="Runtime">Runtime</label>
        <input
          type="text"
          id="Runtime"
          name="Runtime"
          value={formData.Runtime}
          onChange={handleChange}
          placeholder="e.g., 120 min"
          required
        />
      </div>

      <button type="submit" className="submit-button">Create Movie</button>
    </form>
  );
};

export default CreateMovieForm;