import React from "react";
import { SpecialistsSlider } from "./SpecialistsSlider";
import { Transition } from "react-transition-group";
import { IChildSectionProps } from "../../types/generalTypes";
import classNames from "classnames";
import styles from './SpecialistsSection.module.scss';

export const SpecialistsSection: React.FC<IChildSectionProps> = (props) => {
  return (
    <Transition
      in={true}
      timeout={300}
      mountOnEnter
    >
      <div className={classNames(
        styles.enterActive,
        styles.ExitActive,
      )}>
        <SpecialistsSlider {...props} />
      </div>
    </Transition>
  )
};


