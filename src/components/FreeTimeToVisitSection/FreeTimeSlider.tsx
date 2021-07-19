import React, { useCallback, useMemo } from "react";
import { IonSlide, IonSlides, IonText } from "@ionic/react";
import { useDispatch } from "react-redux";
import { IChildSectionProps, IFreeTimeOnDay, ISliderOptions } from "../../types/generalTypes";
import { setChosenHourAC } from "../../redux/visitCreationPageReducer";
import classNames from "classnames";
import styles from './FreeTimeSlider.module.scss';


export const FreeTimeSlider: React.FC<IChildSectionProps> = ({
  chosenVisitParams,
  specialistsData,
  preSubmittedVisitParams,
}) => {
  const dispatch = useDispatch();

  const chosenSpecialist = specialistsData?.[chosenVisitParams.chosenSpecialist.index || 0];
  const chosenDate = chosenSpecialist.freeDates[chosenVisitParams.chosenDate.index || 0].freeTime;

  const setHourOfVisit = (index: number, hour: string) => {
    return dispatch(setChosenHourAC({index, hour}));
  };

  const freeTimeSlidesMap = useCallback((freeTimeOnDay: IFreeTimeOnDay) => {
    return freeTimeOnDay.map((item, i) => {
      return (
        <IonSlide className={styles.slide}>
          <div key={i} onClick={() => setHourOfVisit(i, item)}>
            <IonText
              className={classNames(
                styles.text,
                { [styles.textChosen] : i === chosenVisitParams.chosenTime.index }
              )}
            >
              <div>{item}</div>
            </IonText>
          </div>
        </IonSlide>
      )
    });
  }, [
    chosenVisitParams.chosenDate.index,
    chosenVisitParams.chosenSpecialist.index,
    chosenVisitParams.chosenTime.index
  ]);

  const sliderOption: ISliderOptions = useMemo(() => {
    const initialSlide = chosenVisitParams.chosenSpecialist.index === preSubmittedVisitParams?.chosenSpecialist.index
        ? preSubmittedVisitParams?.chosenTime.index : 0;

    return {
      slidesPerView: 3.47,
      initialSlide,
      spaceBetween: 14,
    }
  }, [chosenVisitParams.chosenDate.index, chosenVisitParams.chosenSpecialist.index ]);

  return (
    <>
     <IonSlides
       options={sliderOption}
       className={classNames(
         styles.slider,
         {[styles.sliderHidden]: !chosenVisitParams.chosenDate.value},
       )}
       class='ion-padding-horizontal ion-margin-top'
     >
        { freeTimeSlidesMap(chosenDate) }
     </IonSlides>
       <IonText
         className={classNames(
           styles.choseDateTipText,
           {[styles.choseDateTipTextHidden]: chosenVisitParams.chosenDate.value},
         )}
       >
         Пожалуйста, выберите удобную вам дату
       </IonText>
    </>
  )
};
