import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  moveUp,
  moveDown,
  deleteIngredient
} from '../../services/slices/constructorSlice';
import { useAppDispatch } from '../../utils/hooks';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();

    const handleMoveDown = () => {
      dispatch(moveDown(index));
    };

    const handleMoveUp = () => {
      dispatch(moveUp(index));
    };

    const handleClose = () => {
      dispatch(deleteIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
