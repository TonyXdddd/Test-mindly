import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { IonCard, IonCardTitle, IonImg, IonSlide, IonSlides, IonText } from "@ionic/react";
import { IChildSectionProps, ISliderOptions, ISpecialistsData } from "../../types/generalTypes";
import { setPreSubmittedSpecialistContentAC, setSpecialistContentAC } from "../../redux/visitCreationPageReducer";
import firstSpecialistAvatar from "../../images/man.png";
import secondSpecialistAvatar from "../../images/woman.png";
import styles from './SpecialistsSlider.module.scss';

export const SpecialistsSlider: React.FC<IChildSectionProps> = ({
  specialistsData,
  chosenVisitParams,
  preSubmittedVisitParams,
}) => {
  const dispatch = useDispatch();

  const specialistsAvatars: any[] = useMemo(() => [firstSpecialistAvatar, secondSpecialistAvatar],
    [specialistsData]);

  const setActiveSlideIndex = (index: number) => {
    //Most likely, it would be more correct to move the eventlistener to the parent component. But since sliders are not reused anywhere, I left them here.
    
    //I am using two conditions actions.
    // 1 - for a 'memoized' specialist (pre-selected and saved in the firestore).
    // 2 - to clear all fields from another specialist.
    if (index === preSubmittedVisitParams?.chosenSpecialist.index) {
      dispatch(setPreSubmittedSpecialistContentAC(index));
    } else {
      dispatch(setSpecialistContentAC(index));
    }
  };

  const specialistsSlides = useCallback((specialists: ISpecialistsData) => {

    return specialists.map((specialist, i) => {
      return (
        <IonSlide>
          <IonCard className={styles.card}>
              <IonCardTitle className={styles.cardTitle} class='ion-margin-top'>{ specialist.fullName }</IonCardTitle>
              <div className={styles.cardContent}>
                <IonImg src={specialistsAvatars[i]} className={styles.specialistAvatar} />
                <IonText className={styles.consultDurationInfo}>
                  <div>Длительность консультации</div>
                  <div>{`${specialist.consultationDuration} Минут`}</div>
                </IonText>
              </div>
          </IonCard>
        </IonSlide>
      )
    });
  }, [preSubmittedVisitParams?.chosenSpecialist.index]);

  const sliderOptions: ISliderOptions = useMemo(() => ({
    slidesPerView: 1.025,
    initialSlide: chosenVisitParams.chosenSpecialist.index,
    spaceBetween: 8,
  }), [preSubmittedVisitParams?.chosenSpecialist.index]);

    {/*
      I am working with ionic for the first time (yet), and having some difficulty using a method that tracks the
      "active slide". During the execution of the event, the layout of all ionic sliders breaks.
      I searched for several hours for a solution to the problem. But I didn’t find it.
      Therefore, I used such a hardcode(onIonSlideReachStart, onIonSlideReachEnd) methods for this case, that cannot be used in
      the context of many specialists 'mapping'. I apologize.
    */}

  return (
    <IonSlides
      options={sliderOptions}
      class={'ion-padding-horizontal'}
      onIonSlideReachStart={() => setActiveSlideIndex(0)}
      onIonSlideReachEnd={() => setActiveSlideIndex(1)}
    >
      { specialistsSlides(specialistsData) }
    </IonSlides>
  )
};
