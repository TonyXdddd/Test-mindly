import React from "react";
import {useDispatch} from "react-redux";
import { IonButton } from "@ionic/react";
import styles from './VisitConfirmationSection.module.scss';
import { submitButtonToggleAC } from "../../redux/visitCreationPageReducer";
// @ts-ignore
import ReactDelayRender from 'react-delay-render';

const ConfirmationButton: React.FC = () => {
  const dispatch = useDispatch();
  //Sorry for this, have some trouble with props Sending fom parent to 'DelayRenderHOC'
  //and use some 'smart logic' in 'simple component'.Cause of this i create state entity - buttonToggleState.
  //Which I drop into the parent component of the button.

  const submitVisit = () => {
    dispatch(submitButtonToggleAC())
  };

  return (
    <IonButton
      onClick={submitVisit}
      className={styles.confirmVisitButton}
      color="secondary"
      expand="full"
    >
      записаться на бесплатную встречу
    </IonButton>
  )
};

// I couldn't find the reason, but the IonicButton in the layout breaks the dimensions and behavior of the sliders after rendering.
// So I render the button after the other components.
export default ReactDelayRender({delay: 200})(ConfirmationButton);
