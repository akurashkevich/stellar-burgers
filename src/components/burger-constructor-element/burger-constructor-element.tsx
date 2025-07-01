import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  changeIngredientPosition,
  removeIngredientFromConstructor
} from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(
        changeIngredientPosition({
          currentIndex: index,
          targetIndex: index + 1
        })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        changeIngredientPosition({
          currentIndex: index,
          targetIndex: index - 1
        })
      );
    };

    const handleClose = () => {
      dispatch(removeIngredientFromConstructor(ingredient.id));
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
