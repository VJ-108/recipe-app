import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDetailedRecipe } from "../store/thunks/recipeThunks";

function getFirst15Words(text) {
  if (!text) return "";
  const words = text.split(/\s+/);
  const first15Words = words.slice(0, 15);
  return first15Words.join(" ");
}

const RecipeCard = ({ recipe, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!recipe || !recipe.img || !recipe.name || !recipe.description) {
    return null;
  }

  const handleOpen = () => {
    dispatch(getDetailedRecipe({ name: recipe.name }));
    navigate("/recipeDetail");
  };

  const matchesType = recipe.type.some((category) => type === category);

  return matchesType ? (
    <div
      className="flex-shrink-0 w-full md:w-96 bg-white shadow-xl rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
      onClick={handleOpen}
    >
      <figure className="relative">
        <img
          className="w-full h-40 object-cover rounded-t-lg"
          src={recipe.img}
          alt={recipe.name}
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent text-white p-4 rounded-t-lg">
          <h2 className="text-lg md:text-xl font-semibold">{recipe.name}</h2>
        </div>
      </figure>
      <div className="p-4">
        <p className="text-sm md:text-base text-gray-700 mb-4">
          {getFirst15Words(recipe.description)}...
        </p>
        <div className="flex justify-end">
          <button
            className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-300"
            onClick={handleOpen}
          >
            Open
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default RecipeCard;
