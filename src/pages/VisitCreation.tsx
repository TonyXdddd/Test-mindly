import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { firestore } from "../firebaseAPI/firebaseApi";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { setSubmittedVisitTimeAC } from "../redux/visitCreationPageReducer";
import { IonContent, IonPage } from '@ionic/react';
import { SpecialistsSection } from "../components/SpecialistSection/SpecialistsSection";
import { FreeTimeToVisitSection } from "../components/FreeTimeToVisitSection/FreeTimeToVisitSection";
import { VisitConfirmationSection } from "../components/VisitConfirmationSection/VisitConfirmationSection";
import  { PossibleDatesSection } from "../components/PossibleDatesSection/PossibleDatesSection";
import { IVisitCreationReducerSlice } from "../types/generalTypes";
import { Transition } from 'react-transition-group';
import classNames from "classnames";
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';
import styles from './VisitCreation.module.scss';

const VisitCreation: React.FC = () => {
  const dispatch = useDispatch();

  const {
    specialistsData,
    chosenVisitParams,
    preSubmittedVisitParams,
    isSubmitButtonToggle,
    firestoreRequestIsDone
  } = useSelector((state: IVisitCreationReducerSlice) => state.visitCreationReducer);

  const [ collection ] = useCollectionData(firestore.collection('VisitParams'));

  const SetFirestoreVisitValue = useCallback(() => {
    if (collection) {
      dispatch(setSubmittedVisitTimeAC(collection[0]));
    }
  }, [collection]);

  useEffect(() => SetFirestoreVisitValue(), [collection]);

  return (
    <IonPage className={styles.visitCreationPage}>
      <IonContent fullscreen>
        <Transition
          in={firestoreRequestIsDone}
          timeout={1000}
          mountOnEnter
        >
          <div className={classNames(
            styles.enterActive,
            styles.ExitActive,
          )}>
            <ToastContainer/>
            <SpecialistsSection
              chosenVisitParams={chosenVisitParams}
              specialistsData={specialistsData}
              preSubmittedVisitParams={preSubmittedVisitParams}
            />
            <PossibleDatesSection
              chosenVisitParams={chosenVisitParams}
              specialistsData={specialistsData}
              preSubmittedVisitParams={preSubmittedVisitParams}
            />
            <FreeTimeToVisitSection
              chosenVisitParams={chosenVisitParams}
              specialistsData={specialistsData}
              preSubmittedVisitParams={preSubmittedVisitParams}
            />
            <VisitConfirmationSection
              chosenVisitParams={chosenVisitParams}
              isSubmitButtonToggle={isSubmitButtonToggle}
            />
          </div>
        </Transition>
      </IonContent>
      { !firestoreRequestIsDone &&
       <div className={styles.loaderOutsideComponent}>
         <div className={styles.loaderInsideComponent}>
           <div>

           </div>
         </div>
       </div>
      }
    </IonPage>
  );
};

export default VisitCreation;

