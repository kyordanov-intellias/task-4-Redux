import { useState, FC, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCreatedMovie } from "../../store/slices/userMoviesSlice";
import "./CreateMovie.css";

const CreateMovieForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Title: "",
    Year: "",
    Poster: "",
    Director: "",
    Actors: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      addCreatedMovie({
        ...formData,
        Type: "movie",
        imdbID: "",
      })
    );
    setFormData({
      Title: "",
      Year: "",
      Poster: "",
      Director: "",
      Actors: "",
    });
    navigate("/profile");
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

      <button type="submit" className="submit-button">
        Create Movie
      </button>
    </form>
  );
};

export default CreateMovieForm;
