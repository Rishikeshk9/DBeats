import React, { useState } from "react";
import Dropdown from "./dropdown.component";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Noty from "noty";
import Multiselect from "multiselect-react-dropdown";
import logo from "../assets/graphics/DBeatsHori.png";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import Switch from "./switch.component";
import { useSelector,useDispatch } from "react-redux";

export default function Track(){
 

  // constructor(props) {
  //   super(props);
    
  const [state, setState] =  useState({
      error: null,
      isLoaded: false,
      items: [],
      topTrack: null,
      play: false,
    });

  //   getTodos = getTodos.bind(this);
  // }
  let audio = new Audio("");
  
 

 
   const getTodos = async () => {
    let data = await axios
      .get("https://discoveryprovider.audius.co/v1/tracks/trending?app_name=ExampleApp")
      .then(function (response) {
        //console.log(response.data.data);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
      if(data)
    setState({ todos: data.data.data });
  }

  const getDbeats = async () => {
    let data = await axios
      .get("https://discoveryprovider.audius.co/v1/tracks/trending?app_name=ExampleApp")
      .then(function (response) {
        console.log(response.data.data);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
      if(data)
    setState({ todos: data.data.data });
  }
     
     
   useEffect(() => {
    // Anything in here is fired on component mount.
    console.log("GrandChild did mount.");
    

    getTodos();
    audio.addEventListener("ended", () => setState({ play: false }));
    return () => {
        // Anything in here is fired on component unmount.
        audio.removeEventListener("ended", () =>
      setState({ play: false }))
    }
}, []) 

const playAudio = async (e) => {
    console.log(e.target.name);
 
    if(!state.play)
    audio = new Audio(
      `https://discoveryprovider.audius.co/v1/tracks/${e.target.name}/stream?app_name=ExampleApp`
    );

    if (state.play) {
      audio.pause();
      state.play = false;
    } else {
      audio.play();
      state.play = true;

    }
   
    console.log(state.play);
  };

   
   
  const audius = useSelector((state)=>state.toggleAudius);
    
    return (
      
      <>
      <Transition
           
           show={audius}
           enter="transition-opacity duration-500"
           enterFrom="opacity-0"
           enterTo="opacity-100"
           leave="transition-opacity duration-500"
           leaveFrom="opacity-100"
           leaveTo="opacity-0"
         >
        {audius&&state.todos &&
          state.todos.map((todo) => {
            return (
              
              <div
                className="text-gray-200  mx-auto px-10 py-3 w-2/3 my-0"
                key={todo.id}
              >
                         

                {/* header */}
                <div className="flex ">
                  <div className="bg-white shadow-md flex p-4  mx-auto  rounded-lg min-w-full hover:scale-101 transform transition-all">
                    <img
                      id="album-artwork"
                      src={todo.artwork["150x150"]}
                      className="mr-6 h-50 w-50 rounded"
                      alt=""
                    ></img>
                    <div className="flex flex-col justify-center   w-full">
                      {/* content */}
                      <div className="flex justify-between">
                        <h4 className="playlist  mt-0  uppercase text-gray-500 tracking-widest text-sm ">
                          {todo.genre}
                        </h4>
                        <p className="font-semibold text-gray-500">
                          {Math.floor(todo.duration / 60)}:
                          {todo.duration - Math.floor(todo.duration / 60) * 60}
                        </p>
                      </div>

                      <h1
                        id="song-title"
                        className="  mt-0 mb-2 drop-shadow text-3xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
                      >
                        {todo.title}
                      </h1>

                      <p
                        id="song-author"
                        className="mt-0 mb-2   text-gray-600 tracking-widest  text-sm flex font-semibold"
                      >
                        {todo.user.name}&nbsp;
                        {todo.user.is_verified ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5  text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          ""
                        )}
                      </p>

                      <div className="flex">
                        <p
                          id="plays"
                          className="mt-0 mb-2 mr-3  text-gray-400 text-sm flex   "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          &nbsp;
                          {todo.play_count > 1000
                            ? (todo.play_count / 1000).toFixed(2)
                            : todo.play_count.toFixed(2)}
                          K&nbsp;Plays
                        </p>

                        <p
                          id="favorites"
                          className="mt-0 mb-2   text-gray-400 text-sm flex  "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                          &nbsp;{todo.favorite_count}&nbsp;Favorites
                        </p>
                      </div>

                      {/* action buttons */}

                      <div className=" flex mt-2   ">
                        <div className="flex ">
                          <button
                            onClick={playAudio}
                            name={todo.id}
                            className="mr-2 uppercase font-bold  bg-gradient-to-r from-green-400 to-blue-500   text-white block py-2 px-10   hover:scale-95 transform transition-all"
                          >
                            {state.play ? "Pause" : "Play"}
                          </button>
                          <button className="mr-2 border-white     text-gray-600 border block p-2 rounded-full hover:scale-95 transform transition-all">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </button>

                          <button className="mr-2 border-white text-gray-600 border block p-2 rounded-full">
                            <svg
                              height="25"
                              width="25"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </Transition>
      </>
      
    );
  } 