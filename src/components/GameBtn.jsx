import { forwardRef } from "react"

const GameBtn = forwardRef((props,ref) => {
  return (
    <button
    color={props.color}
    className={`${props.border} ${props.bg} border-solid border-4 w-[135px] sm:w-[200px] h-[135px] sm:h-[200px] duration-150`} 
    onClick={props.onClick}
    ref={ref}
    />
  );
});

export default GameBtn;