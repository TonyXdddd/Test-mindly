
type IPossibleIndex = number | null;
type IPossibleValue = string | null;

export interface IChosenVisitParam {
  index: IPossibleIndex ;
  value: IPossibleValue;
}

export type IFullSpecialistName = string;

export type IFreeTimeOnDay = string[];

export interface IFreeDate {
  day: string;
  date: string;
  freeTime: IFreeTimeOnDay;
}

export interface IChosenVisitParams {
  chosenSpecialist: IChosenVisitParam,
  chosenDate: IChosenVisitParam,
  chosenTime: IChosenVisitParam,
}

export interface IPreSubmittedVisitParams extends IChosenVisitParams {
}

export type IFreeDates = IFreeDate[];

export interface ISpecialistData {
  fullName: IFullSpecialistName;
  avatarName: string;
  consultationDuration: string;
  freeDates: IFreeDates;
}

export type ISpecialistsData = ISpecialistData[];

export interface IVisitCreationReducer {
  specialistsData: ISpecialistsData;
  chosenVisitParams: IChosenVisitParams;
  preSubmittedVisitParams: IPreSubmittedVisitParams;
  isSubmitButtonToggle: boolean;
  firestoreRequestIsDone: boolean;
  preApprovedSpecialistIndex: IPossibleIndex;
}

export interface IVisitCreationReducerSlice {
  visitCreationReducer: IVisitCreationReducer;
}

export interface IChildSectionProps {
  specialistsData: ISpecialistsData;
  chosenVisitParams: IChosenVisitParams;
  preSubmittedVisitParams?: IPreSubmittedVisitParams;
  className?: string;
}

export interface ISliderOptions {
  slidesPerView: number;
  initialSlide?: number | null ;
  spaceBetween: number;
}
