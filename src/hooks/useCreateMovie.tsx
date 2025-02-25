import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCreatedMovie } from "../store/slices/userMoviesSlice";

export const useCreateMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    Title: "",
    Year: "",
    Poster: "",
    Director: "",
    Actors: "",
    CreatedByMe: true,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      CreatedByMe: true,
    });
    navigate("/profile");
  };

  return { formData, handleChange, handleSubmit };
};
