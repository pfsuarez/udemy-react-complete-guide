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
          <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
          {controls.map(x => {
              return <BuildControl 
                            key={x.label} 
                            label={x.label}
                            added={() => props.ingredientAdded(x.type)}
                            removed={() => props.ingredientRemoved(x.type)}
                            disabled={props.disabled[x.type]} />
          })}
          <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}>ORDER NOW</button>
      </div>
  );  
};

export default buildControls;