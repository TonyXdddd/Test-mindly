import React, { useEffect} from "react";
import { useDispatch } from "react-redux";
import { IonText } from "@ionic/react";
import { firestoreCollectionUpdateTK } from "../../redux/thunks";
import VisitConfirmationButton from "./VisitConfirmationButton";
import { IChosenVisitParams } from "../../types/generalTypes";
import styles from './VisitConfirmationSection.module.scss';

export interface IVisitConfirmationSectionProps {
  chosenVisitParams: IChosenVisitParams;
  isSubmitButtonToggle: boolean;
}

export const VisitConfirmationSection: React.FC<IVisitConfirmationSectionProps> = ({ chosenVisitParams, isSubmitButtonToggle }) =>  {
  const dispatch = useDispatch();

    useEffect(() => {
    if (isSubmitButtonToggle) {
      return dispatch(firestoreCollectionUpdateTK(chosenVisitParams));
    }
  }, [isSubmitButtonToggle]);

  return (
    <div className={styles.visitConfirmationSection}>
      <div className={styles.currentVisitTime}>
        <div className={styles.date}>
          <IonText className={styles.text}>
            Дата
          </IonText>
          <IonText className={styles.text}>
            {chosenVisitParams.chosenDate.value ? `${chosenVisitParams.chosenDate.value} мая` : '' }
          </IonText>
        </div>
        <div className={styles.time}>
          <IonText className={styles.text}>
            Время
          </IonText>
          <IonText className={styles.text}>
            { chosenVisitParams.chosenTime.value }
          </IonText>
        </div>
      </div>
      <VisitConfirmationButton />
    </div>
  )
};
