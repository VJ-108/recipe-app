import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setGenerate } from "../store/slices/recipeSlice";
import { getDetailedRecipe, updateRating } from "../store/thunks/recipeThunks";
import SocialShare from "../components/SocialShare";

const getColorFromPercentage = (value) => {
  const percentage = parseInt(value, 10);
  if (percentage < 10) return "bg-green-200 border-green-400";
  if (percentage < 20) return "bg-yellow-200 border-yellow-400";
  return "bg-red-200 border-red-400";
};

const RecipeDetail = () => {
  const [userRating, setUserRating] = useState(0);
  const DetailedRecipe = useSelector((store) => store.recipe.DetailedRecipe);
  const isRatingUpdated = useSelector((store) => store.recipe.isRatingUpdated);
  const user = useSelector((store) => store.user.user);

  const dispatch = useDispatch();
  const { dishName } = useParams();

  useEffect(() => {
    dispatch(setGenerate(false));
    dispatch(getDetailedRecipe({ name: decodeURIComponent(dishName) }));
  }, [dispatch, dishName]);

  useEffect(() => {
    if (isRatingUpdated) {
      setUserRating(0);
    }
  }, [isRatingUpdated]);

  const handleRatingChange = (event) => {
    setUserRating(parseInt(event.target.value, 10));
  };

  const handleSubmitRating = () => {
    dispatch(
      updateRating({ name: DetailedRecipe.name, newRating: userRating })
    );
  };

  return DetailedRecipe ? (
    <div className="pt-16">
      <div className="min-h-screen bg-gradient-to-r from-teal-100 to-pink-100 p-4 md:p-8 transition-opacity duration-500 ease-in-out opacity-100">
        <div className="prose prose-lg lg:prose-xl max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10">
          <div className="text-center mb-6 md:mb-10">
            <h1 className="text-3xl md:text-5xl font-extrabold text-teal-600">
              {DetailedRecipe.name}
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            {DetailedRecipe.img && (
              <img
                src={DetailedRecipe.img}
                alt={DetailedRecipe.name}
                className="w-full md:w-1/2 rounded-xl shadow-xl object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
              />
            )}
            <div className="flex-1">
              <p className="text-base md:text-lg font-serif font-medium text-gray-700 mb-5">
                {DetailedRecipe.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {DetailedRecipe.type?.map((type, i) => (
                  <span
                    className="bg-orange-500 text-white py-1 px-3 md:py-2 md:px-4 rounded-full text-sm md:text-lg hover:bg-orange-600 transition-colors duration-300"
                    key={i}
                  >
                    {type}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {DetailedRecipe?.dietaryLabels?.map((dietaryLabels, i) => (
                  <span
                    className="bg-teal-500 text-white py-1 px-3 md:py-2 md:px-4 rounded-full text-sm md:text-lg hover:bg-teal-600 transition-colors duration-300"
                    key={i}
                  >
                    {dietaryLabels}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <SocialShare
            url={window.location.href}
            title={DetailedRecipe.name}
            media={DetailedRecipe.img}
          />
          {DetailedRecipe.nutritionalContents && (
            <div className="mt-6 md:mt-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-600 underline mb-4">
                Nutritional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(DetailedRecipe.nutritionalContents).map(
                  (key, i) => {
                    const colorClass = getColorFromPercentage(
                      DetailedRecipe.nutritionalContents[key].split("-")[0]
                    );

                    return (
                      <div
                        key={i}
                        className={`shadow-md rounded-lg p-4 flex justify-between items-center border-l-4 ${colorClass}`}
                      >
                        <span className="text-lg font-medium text-gray-800">
                          {key}
                        </span>
                        <span className="text-lg font-semibold text-gray-900">
                          {DetailedRecipe.nutritionalContents[key]}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}
          {DetailedRecipe.ingredients && (
            <div className="mt-6 md:mt-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-purple-600 underline mb-4">
                Ingredients
              </h2>
              {Object.keys(DetailedRecipe.ingredients).map((key, i) => (
                <div className="mt-4 md:mt-5 mb-6 md:mb-10" key={i}>
                  <h3 className="text-2xl md:text-3xl font-bold text-indigo-600">
                    {key}
                  </h3>
                  <ul className="list-disc list-inside pl-5">
                    {DetailedRecipe.ingredients[key].map((ingredient, i) => (
                      <li
                        key={i}
                        className="text-base md:text-lg font-medium text-gray-600"
                      >
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {DetailedRecipe.steps && (
            <div className="mt-6 md:mt-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-green-600 underline mb-4">
                Steps
              </h2>
              {Object.keys(DetailedRecipe.steps).map((key, i) => (
                <div className="mt-4 md:mt-5 mb-6 md:mb-10" key={i}>
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-600">
                    {key}
                  </h3>
                  <ol className="list-decimal list-inside pl-5">
                    {DetailedRecipe.steps[key].map((step, i) => (
                      <li
                        key={i}
                        className="text-base md:text-lg font-medium text-gray-600"
                      >
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          )}
          {!isRatingUpdated && user && (
            <div className="flex flex-col items-center mt-6 md:mt-10">
              <p className="text-center text-2xl font-bold text-cyan-500">
                Rate this recipe:
              </p>
              <div className="rating flex space-x-2 mb-8 rating-lg ">
                <input
                  type="radio"
                  name="rating-2"
                  value="1"
                  className="mask mask-star-2 bg-orange-400"
                  checked={userRating === 1}
                  onChange={handleRatingChange}
                />
                <input
                  type="radio"
                  name="rating-2"
                  value="2"
                  className="mask mask-star-2 bg-orange-400"
                  checked={userRating === 2}
                  onChange={handleRatingChange}
                />
                <input
                  type="radio"
                  name="rating-2"
                  value="3"
                  className="mask mask-star-2 bg-orange-400"
                  checked={userRating === 3}
                  onChange={handleRatingChange}
                />
                <input
                  type="radio"
                  name="rating-2"
                  value="4"
                  className="mask mask-star-2 bg-orange-400"
                  checked={userRating === 4}
                  onChange={handleRatingChange}
                />
                <input
                  type="radio"
                  name="rating-2"
                  value="5"
                  className="mask mask-star-2 bg-orange-400"
                  checked={userRating === 5}
                  onChange={handleRatingChange}
                />
              </div>
              <button
                className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-300"
                onClick={handleSubmitRating}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center text-2xl text-gray-700">
      Loading...
    </div>
  );
};

export default RecipeDetail;
