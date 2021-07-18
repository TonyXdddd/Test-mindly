//ACTIONS TYPES CONST
const SET_SPECIALIST_CONTENT = 'SET_SPECIALIST_CONTENT';
const SET_PRE_SUBMITTED_SPECIALIST_CONTENT = 'SET_PRE_SUBMITTED_SPECIALIST_CONTENT';
const SET_CHOSEN_DATE = 'SET_CHOSEN_DATE';
const SET_CHOSEN_FREE_TIME = 'SET_CHOSEN_FREE_TIME';
const SET_SUBMITTED_VISIT_TIME = 'SET_SUBMITTED_VISIT_TIME';
const SUBMIT_BUTTON_TOGGLE = 'SUBMIT_BUTTON_TOGGLE';

//I use two objects to store selected user parameters.

// chosenVisitParams - an object that stores the current selection of the user. Also, when the application is
// initialized, it stores the previously written values in the firestore.
//
// preSubmittedVisitParams - when the application is initialized, the values from the firestore that come in the
// response are written here. Likewise - if the user selects a slide with a specialist whose data has already been
// sent and downloaded from the firestore, the application uses this object to display the already preset values.

// chosenVisitParams - dynamic, preSubmittedVisitParams - static.

const initialState = {
  specialistsData: [
    {
      fullName: 'Алексей Карачинский',
      avatarName: 'firstSpecialistAvatar',
      consultationDuration: '50',
      freeDates: [
        {day: 'Сегодня', date: '24', freeTime: ['14:30', '17:00', '18:00', '19:00', '19:30', '20:00']},
        {day: 'Ср', date: '26', freeTime: ['15:00', '16:00', '17:00', '17:30', '18:30', '20:30' ]},
        {day: 'Чтв', date: '27', freeTime: ['14:00', '15:00', '16:00', '17:30', '18:00', '20:30' ]},
        {day: 'Пт', date: '28', freeTime: ['14:30', '15:00', '16:00', '17:00', '20:00', '20:30']},
        {day: 'Сб', date: '29', freeTime: ['12:00', '13:00', '14:30', '15:00', '16:00', '18:00' ]},
        {day: 'Вс',  date: '30', freeTime: ['12:30', '14:00', '15:00', '18:00', '19:00', '20:00']},
      ],
    },

    {
      fullName: 'Елена Шимановская',
      avatarName: 'firstSpecialistAvatar',
      consultationDuration: '50',
      freeDates: [
        {day: 'Сегодня', date: '14', freeTime: ['15:30', '16:00', '16:30', '17:00', '20:00', '20:30' ]},
        {day: 'Пн', date: '16', freeTime: ['14:00', '14:30', '15:30', '16:30', '17:30','20:30' ]},
        {day: 'Вт', date: '17', freeTime: ['14:00', '15:00', '16:00', '16:30', '17:30', '18:00' ]},
        {day: 'Чтв', date: '18', freeTime: ['12:00', '14:00', '18:00', '19:30', '20:00', '20:30' ]},
        {day: 'Пт', date: '19', freeTime: ['12:30', '13:00', '14:00', '12:00', '13:00', '14:00' ]},
        {day: 'Вс',  date: '20', freeTime: ['12:00', '14:00', '15:00', '15:30', '17:30', '18:00', ]},
      ],
    },
  ],
  chosenVisitParams: {
    //First arr item - index of a value in arrValues and index of a slide);
    chosenSpecialist: {index: null, value: null},
    chosenDate: {index: null, value: null},
    chosenTime: {index: null, value: null},
  },
  preSubmittedVisitParams: {
    chosenSpecialist: {index: null, value: null},
    chosenDate: {index: null, value: null},
    chosenTime: {index: null, value: null},
  },
  isSubmitButtonToggle: false,
  firestoreRequestIsDone: false,
};

export const visitCreationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHOSEN_DATE:
      return {
        ...state,
        chosenVisitParams: {
          ...state.chosenVisitParams,
          chosenDate: {index: action.payload.index, value: action.payload.date},
          chosenTime: {index: null, value: null},
        }
      };

    case SET_SPECIALIST_CONTENT:
      return {
        ...state,
        chosenVisitParams: {
          ...state.chosenVisitParams,
          chosenSpecialist: {index: action.payload, value: state.specialistsData[action.payload].fullName},
          chosenDate: {index: null, value: null},
          chosenTime: {index: null, value: null},
        }
      };

    case SET_PRE_SUBMITTED_SPECIALIST_CONTENT:
      return {
        ...state,
        chosenVisitParams: {
          ...state.preSubmittedVisitParams
        }
      };

    case SET_CHOSEN_FREE_TIME:
      return {
        ...state,
        chosenVisitParams: {
          ...state.chosenVisitParams,
          chosenTime: {index: action.payload.index, value: action.payload.hour}
        }
      };

    case SET_SUBMITTED_VISIT_TIME:
      //Perhaps this is a violation of the directives. But I used this for DRY.
      const paramsInstance = {
        chosenSpecialist: {
          index: action.payload.chosenSpecialistIndex,
          value: state.specialistsData[action.payload.chosenSpecialistIndex].name
        },
        chosenDate: {
          index: action.payload.chosenDateIndex,
          value: state
            .specialistsData[action.payload.chosenSpecialistIndex]
            .freeDates[action.payload.chosenDateIndex]
            .date
        },
        chosenTime: {
          index: action.payload.chosenTimeIndex,
          value: state
            .specialistsData[action.payload.chosenSpecialistIndex]
            .freeDates[action.payload.chosenDateIndex]
            .freeTime[action.payload.chosenTimeIndex]
        },
      };
      return {
        ...state,
        firestoreRequestIsDone: true,
        preSubmittedVisitParams: {...paramsInstance},
        chosenVisitParams: {...paramsInstance},
      };

    case SUBMIT_BUTTON_TOGGLE:
      return {
        ...state,
        isSubmitButtonToggle: !state.isSubmitButtonToggle,
      };

    default:
      return state;
  }
};

//ACTIONS CREATORS
export const setChosenDateAC = ({...parameters}) => ({
  type: SET_CHOSEN_DATE,
  payload: parameters,
});

export const setChosenHourAC = ({...parameters}) => ({
  type: SET_CHOSEN_FREE_TIME,
  payload: parameters,
});

export const setSpecialistContentAC = (payload) => ({
  type: SET_SPECIALIST_CONTENT,
  payload,
});

export const setPreSubmittedSpecialistContentAC = (payload) => ({
  type: SET_PRE_SUBMITTED_SPECIALIST_CONTENT,
  payload,
});

export const setSubmittedVisitTimeAC = (actualSubmittedData) => ({
  type: SET_SUBMITTED_VISIT_TIME,
  payload: actualSubmittedData,
});

export const submitButtonToggleAC = () => ({
  type: SUBMIT_BUTTON_TOGGLE,
});
