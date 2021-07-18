import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { IonCard, IonSlide, IonSlides, IonText } from "@ionic/react";
import { setChosenDateAC } from "../../redux/visitCreationPageReducer";
import { IChildSectionProps, IFreeDates, ISliderOptions } from "../../types/generalTypes";
import classNames from "classnames";
import styles from './PossibleDatesSlider.module.scss';

export const PossibleDatesSlider: React.FC<IChildSectionProps> = ({
  chosenVisitParams,
  specialistsData,
  preSubmittedVisitParams,
}) => {

  const dispatch = useDispatch();

  const setChosenDate = (index: number, date: string) => {
    dispatch(setChosenDateAC({index, date}));
  };

  const possibleDatesSlidesMap = useCallback((chosenSpecialistDates: IFreeDates) => {
    return chosenSpecialistDates.map((item, i) => {
      return (
        <IonSlide className={styles.slide}>
          <div onClick={() => setChosenDate(i, item.date)}>
            <IonCard
              className={classNames(
                styles.card,
                {[styles.selectedCard]: i === chosenVisitParams.chosenDate.index}
              )}
              class={'ion-padding-vertical'}>
              <IonText className={styles.text}>
                <div>{ item.day }</div>
                <div>{ item.date }</div>
              </IonText>
            </IonCard>
          </div>
        </IonSlide>
      )
    });
  }, [chosenVisitParams.chosenSpecialist, chosenVisitParams.chosenDate]);

  const sliderOptions: ISliderOptions = useMemo(() => {
    const initialSlide = chosenVisitParams.chosenSpecialist.index === preSubmittedVisitParams?.chosenSpecialist.index
      ? preSubmittedVisitParams?.chosenDate.index : 0;
    return {
      slidesPerView: 3.47,
      initialSlide,
      spaceBetween: 16,
    }
  }, [chosenVisitParams.chosenSpecialist]);

  return (
    <IonSlides options={sliderOptions} className={styles.slider} class={'ion-padding-horizontal'}>
      { possibleDatesSlidesMap(specialistsData[chosenVisitParams.chosenSpecialist.index || 0].freeDates) }
    </IonSlides>
  )
};
