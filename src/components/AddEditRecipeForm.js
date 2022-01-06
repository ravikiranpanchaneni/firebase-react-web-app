import { useEffect, useState } from "react";

function AddEditRecipeForm({
  existingRecipe,
  handleAddRecipe,
  handleUpdateRecipe,
  handleDeleteRecipe,
  handleEditRecipeCancel,
}) {
  useEffect(() => {
    if (existingRecipe) {
      setName(existingRecipe.name);
      setCategory(existingRecipe.category);
      setDirections(existingRecipe.directions);
      setpublishedDate(
        existingRecipe.publishedDate.toISOString().split("T")[0]
      );
      setIngrerdients(existingRecipe.ingredients);
    } else {
      resetForm();
    }
  }, [existingRecipe]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [publishedDate, setpublishedDate] = useState(
    new Date().toString().split("T")[0]
  );
  const [directions, setDirections] = useState("");
  const [ingredients, setIngrerdients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");

  async function handleRecipeFormSubmit(e) {
    e.preventDefault();

    if (ingredients.lengh === 0) {
      alert("Ingredients can not be Empty. Please add atleast one Ingredient");
      return;
    }
    const isPublished = new Date(publishedDate) <= new Date() ? true : false;

    const newRecipe = {
      name,
      category,
      publishedDate: new Date(publishedDate),
      directions,
      ingredients,
      isPublished,
    };

    if (existingRecipe) {
      handleUpdateRecipe(newRecipe, existingRecipe.id);
    } else {
      handleAddRecipe(newRecipe);
      resetForm();
    }
  }

  async function handleAddIngredient(e) {
    if (e.key && e.key !== "Enter") return;
    e.preventDefault();

    if (!ingredientName) {
      alert("Missing Ingredient Name Please double check");
      return;
    }

    setIngrerdients([...ingredients, ingredientName]);
    setIngredientName("");
  }

  function resetForm() {
    setName("");
    setCategory("");
    setDirections("");
    setpublishedDate("");
    setIngrerdients([]);
  }

  return (
    <form
      onSubmit={handleRecipeFormSubmit}
      className="add-edit-recipe-form-container"
    >
      {existingRecipe ? <h2>Update the Recipe</h2> : <h2>Add a new Recipe</h2>}
      <div className="top-form-section">
        <div className="fields">
          <label className="recipe-label input-label">
            Recipe Name
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-text"
            ></input>
          </label>

          <label className="recipe-label input-label">
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select"
              required
            >
              <option value=""></option>
              <option value="breadsSandwichesAndPizza">
                Breads, Sandwhiches, and Pizza
              </option>
              <option value="eggsAndBreakfast">Eggs & Breakfast</option>
              <option value="dessertsAndBakedGoods">
                Deserts & Baked Goods
              </option>
              <option value="fishAndSeaFood">Fish & Seafood</option>
              <option value="vegetables">Vegetables</option>
            </select>
          </label>

          <label className="recipe-label input-label">
            Directions:
            <textarea
              required
              vlaue={directions}
              onChange={(e) => setDirections(e.target.value)}
              className="input-text directions"
            ></textarea>
          </label>

          <label className="recipe-label input-label">
            Publish Date:
            <input
              type="date"
              required
              value={publishedDate}
              onChange={(e) => setpublishedDate(e.target.value)}
              className="input-text"
            ></input>
          </label>
        </div>
      </div>
      <div className="ingredients-list">
        <h3 className="text-center">Ingredients</h3>
        <table className="ingredients-table">
          <thead>
            <tr>
              <th className="table-header">Ingredient</th>
              <th className="table-header">Delete</th>
            </tr>
          </thead>
          <tbody>
            {ingredients && ingredients.length > 0
              ? ingredients.map((ingredient) => {
                  return (
                    <tr key={ingredient}>
                      <td className="table-date text-center">{ingredient}</td>
                      <td className="ingredient-delete-box">
                        <button
                          type="button"
                          className="secondary-button ingredient-delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        {ingredients && ingredients.length === 0 ? (
          <h3 className="text-center no-ingredients">
            No Ingredients Added Yet
          </h3>
        ) : null}
        <div className="ingredient-form">
          <label className="ingredient-label">
            Ingredient
            <input
              className="input-text"
              type="text"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              placeholder="ex. 1 cup of Sugar"
              onKeyPress={handleAddIngredient}
            ></input>
          </label>
          <button
            className="primary-button add-ingredient-button"
            type="button"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>
        </div>
      </div>
      <div className="action-buttons">
        <button type="submit" className="primary-button action-button">
          {existingRecipe ? "Update Recipe" : "Create Recipe"}
        </button>
        {existingRecipe ? (
          <>
            <button
              type="button"
              onClick={handleEditRecipeCancel}
              className="primary-button action-button"
            >
              CANCEL
            </button>
            <button
              type="button"
              onClick={() => handleDeleteRecipe(existingRecipe.id)}
              className="primary-button action-button"
            >
              DELETE
            </button>
          </>
        ) : null}
      </div>
    </form>
  );
}

export default AddEditRecipeForm;
