import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TIngredients, TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import {
  getIngredientsErrorSelector,
  getIngredientsSelector
} from '../../services/slices/ingredientsSlice';
import { useSelector } from '../../services/store';

export const BurgerIngredients: FC = () => {
  const ingredients: TIngredients = useSelector(getIngredientsSelector);
  const ingredientsError = useSelector(getIngredientsErrorSelector);

  const buns: TIngredients = [];
  const mains: TIngredients = [];
  const sauces: TIngredients = [];

  ingredients.forEach((ingredient) => {
    switch (ingredient.type) {
      case 'bun':
        buns.push(ingredient);
        break;
      case 'main':
        mains.push(ingredient);
        break;
      case 'sauce':
        sauces.push(ingredient);
        break;
      default:
        break;
    }
  });

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {ingredientsError ? (
        <p>Запрос ингридиентов завершился с ошибкой: {ingredientsError}</p>
      ) : (
        <BurgerIngredientsUI
          currentTab={currentTab}
          buns={buns}
          mains={mains}
          sauces={sauces}
          titleBunRef={titleBunRef}
          titleMainRef={titleMainRef}
          titleSaucesRef={titleSaucesRef}
          bunsRef={bunsRef}
          mainsRef={mainsRef}
          saucesRef={saucesRef}
          onTabClick={onTabClick}
        />
      )}
    </>
  );
};
