import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { useAppSelector } from '../../utils/hooks';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredientData = useAppSelector(getIngredients).find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
