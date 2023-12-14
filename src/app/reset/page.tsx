'use client'
import LoginPage from '../../pages/login';
// import "../styles/globals.css";
import type { RootState } from "../../store/store";
import {useSelector, useDispatch } from "react-redux";
import { setUser, logoutWithRedux } from "../../store/useSlice/userSlice";
import { increment, decrement, incrementByAmount } from "../../store/Features/counter/counterSlice";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

  return (
    <>
       <h2>List</h2>

   <br />
                <button
                    onClick={() => dispatch(increment())}
                > 
                    Increment
                </button>
                <span>{count}</span>

                <button
                    onClick={() => dispatch(decrement())}
                > 
                    Decrement
                </button>

                <button
                    onClick={() => dispatch(incrementByAmount(2))}
                > 
                    Increment by 2
                </button> 
    </>
 
    
  )
}
