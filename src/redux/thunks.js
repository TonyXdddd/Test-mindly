import { firestore } from "../firebaseAPI/firebaseApi";
import { submitButtonToggleAC } from "./visitCreationPageReducer";
import { toastMessage } from "../components/toastifyMessageBoilerplate";

//UPDATE collection on submit action

const updateCollectionBoilerplate = async (chosenDate, chosenSpecialist, chosenTime, dispatch) => {
  if (chosenDate.value && chosenTime.value) {
    await firestore.collection('VisitParams').doc('16072021').update(
      {
        chosenDateIndex: chosenDate.index,
        chosenSpecialistIndex: chosenSpecialist.index,
        chosenTimeIndex: chosenTime.index,
      });
    toastMessage('✨ Спасибо, ваш визит к даному психологу оформлен', 'info');
  } else {
    toastMessage('Пожалуйста, убедитесь, что выбраны удобные вам дата и время визита', 'info');
  }
  dispatch(submitButtonToggleAC());
};

export const firestoreCollectionUpdateTK = ({ chosenDate, chosenSpecialist, chosenTime }) => (dispatch) => {
  updateCollectionBoilerplate(chosenDate, chosenSpecialist, chosenTime, dispatch);
};
