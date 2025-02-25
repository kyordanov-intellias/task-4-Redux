import { FC } from "react";
import { useCreateMovie } from "../../hooks/useCreateMovie";
import CreateMovieForm from "./CreateMovieForm";

const CreateMoviePage: FC = () => {
  const { formData, handleChange, handleSubmit } = useCreateMovie();

  return (
    <CreateMovieForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateMoviePage;
