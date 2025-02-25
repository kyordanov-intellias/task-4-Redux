import { FC } from "react";
import "./CreateMovie.css";

interface CreateMovieFormProps {
  formData: {
    Title: string;
    Year: string;
    Poster: string;
    Director: string;
    Actors: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const CreateMovieForm: FC<CreateMovieFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
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
