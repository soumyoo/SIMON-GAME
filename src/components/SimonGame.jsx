import { useEffect, useRef, useState } from "react"
import GameBtn from "./GameBtn"

const colors=["green","red","yellow","blue"];

//Main return component-function
const SimonGame = () => {

  //Logic states
  const [sequence, setSequence] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [playingIdx, setPlayingIdx] = useState(0);

  const greenRef = useRef(null);
  const redRef = useRef(null);
  const yellowRef = useRef(null);
  const blueRef = useRef(null);

  //Logic functions
  const resetGame = () => {
    setSequence([]);
    setPlaying(false);
    setPlayingIdx(0);
  };

  const addNewColor = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  };

  const handleNextLevel = () => {
    if (!playing) {
      setPlaying(true);
      addNewColor();
    }
  };

  const handleColorClick = (e) => {
    if (playing) {
      e.target.classList.add("opacity-50");

      setTimeout(() => {
        e.target.classList.remove("opacity-50");

        const clickColor = e.target.getAttribute("color");

        // clicked the correct color of the sequence
        if (sequence[playingIdx] === clickColor) {
          // clicked the last color of the sequence
          if (playingIdx === sequence.length - 1) {
            setTimeout(() => {
              setPlayingIdx(0);
              addNewColor();
            }, 250);
          }

          // missing some colors of the sequence to be clicked
          else {
            setPlayingIdx(playingIdx + 1);
          }
        }

        // clicked the incorrect color of the sequence
        else {
          alert(`You Lost! Your score is ${sequence.length-1}`);
          resetGame();
        }
      }, 250);
    }
  };

  // useEffect
  useEffect(() => {
    // show sequence
    if (sequence.length > 0) {
      const showSequence = (idx = 0) => {
        let ref = null;

        if (sequence[idx] === "green") ref = greenRef;
        else if (sequence[idx] === "red") ref = redRef;
        else if (sequence[idx] === "yellow") ref = yellowRef;
        else ref = blueRef;

        // highlight the ref
        setTimeout(() => {
          ref.current.classList.add("brightness-[3]");

          setTimeout(() => {
            ref.current.classList.remove("brightness-[3]");
            if (idx < sequence.length - 1) showSequence(idx + 1);
          }, 250);
        }, 250);
      };
      showSequence();
    }
  }, [sequence]);

  //Main return DOM
  return (
    //main container
    <div className=" flex justify-center items-center text-white w-screen h-screen bg-gray-800">
      {/* game container */}
      <div className="flex flex-col justify-center items-center">
        {/* green and red button */}
        <div className="flex">

            {/* green btn */}
            <GameBtn 
            color="green" 
            border="rounded-tl-full " 
            bg="bg-green-500"
            onClick={handleColorClick}
            ref={greenRef}
            />

            {/* red btn */}
            <GameBtn
            color="red"
            border="rounded-tr-full" 
            onClick={handleColorClick}
            bg="bg-red-500"
            ref={redRef}
            />

        </div>

        {/* play btn */}
        <button className="absolute z-1 bg-white text-black text-l sm:text-xl font-bold rounded-full border-solid border-4 w-[135px] sm:w-[175px] h-[135px] sm:h-[175px] duration-150" onClick={handleNextLevel}>
        {sequence.length === 0 ? "Click to Play Soumyo_o's SIMON GAME" : `Score ${sequence.length-1}`}
        </button>

        {/* yellow and blue button */}
        <div className="flex">

            {/* yellow btn */}
            <GameBtn 
            color="yellow"
            border="rounded-bl-full" 
            onClick={handleColorClick}
            bg="bg-yellow-300"
            ref={yellowRef}
            />

            {/* blue btn */}
            <GameBtn 
            color="blue" 
            border="rounded-br-full" 
            onClick={handleColorClick}
            bg="bg-blue-500"
            ref={blueRef}
            />

        </div>
      </div>
    </div>
  )
}

export default SimonGame
