import React from "react";
import { IonText} from "@ionic/react";
import {FreeTimeSlider} from "./FreeTimeSlider";
import {IChildSectionProps} from "../../types/generalTypes";
import styles from './FreeTimeToVisitSection.module.scss';

export const FreeTimeToVisitSection: React.FC<IChildSectionProps> = (props) => {
  return (
    <div className={styles.freeTimeToVisitSection} >
        <IonText className={styles.text} class={'ion-padding-horizontal'}>
          Свободное время
        </IonText>
      <FreeTimeSlider {...props}/>
    </div>
  )
};
