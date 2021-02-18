import react from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'},
];

const buildControls = props => {
  return (
      <div className={classes.BuildControls}>
          {controls.map(x => {
              return <BuildControl key={x.label} label={x.label} />
          })}
      </div>
  );  
};

export default buildControls;