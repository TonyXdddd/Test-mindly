import React from 'react';
import { PossibleDatesSlider } from "./PossibleDatesSlider";
import { IonIcon, IonText } from "@ionic/react";
import { calendarOutline, albumsOutline } from 'ionicons/icons';
import { IChildSectionProps } from "../../types/generalTypes";
import classNames from "classnames";
import styles from './PossibleDatesSection.module.scss';

export const PossibleDatesSection: React.FC<IChildSectionProps> = (props) => {
  return (
    <div className={styles.possibleDatesSection}>
      <div className={styles.textAndTabs}>
        <IonText className={styles.text}>
          Возможная дата
        </IonText>
        <div className={styles.datesIcons}>
          <IonIcon icon={albumsOutline} className={classNames(styles.iconActive, styles.icon)} color='primary' lazy={true} />
          <IonIcon icon={calendarOutline} className={styles.icon} />
        </div>
      </div>
      <PossibleDatesSlider {...props} />
    </div>
  )
};
