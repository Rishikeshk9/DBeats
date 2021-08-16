/* This example requires Tailwind CSS v2.0+ */
import { useState } from "react";

import { Fragment } from "react";

import { Popover, Transition } from "@headlessui/react";
import { 
  MenuIcon, 
  XIcon,
} from "@heroicons/react/outline";
 import Logo from "../assets/graphics/DBeatsHori.png";
 import { useSelector,useDispatch } from "react-redux";
import {toggleAudius} from "../actions/index";



export default function Navbar() {

  const audius = useSelector((state)=>state.toggleAudius);
  const dispatch = useDispatch();

  return (
    <Popover className="sticky top-0 bg-white shadow z-50 min-w-full">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center  py-6 md:justify-start md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <a href="/">
                  <span className="sr-only">Workflow</span>
                  <img className="h-8 w-auto sm:h-10" src={Logo} alt="" />
                </a>
              </div>
              <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <Popover.Group as="nav" className="hidden md:flex space-x-10">
                <div className="flex items-center justify-center w-full ">
                <a
                    href="/nft"
                    className="mx-3 text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    NFT
                  </a>
                  <a
                    href="https://dbeats-demo.vercel.app/#/home"
                    className="mx-3 text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Videos
                  </a>
                  <a
                    href="/music"
                    className="mx-3 text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Music
                  </a>
                  <label
                     className="flex items-center cursor-pointer mx-3"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="audius"
                        checked={audius}
                        onClick={()=> dispatch(toggleAudius())} 
                        className="sr-only"
                      ></input>

                      <div className="block bg-gray-200 w-14 h-8 rounded-full shadow-inner"></div>

                      <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition shadow"></div>
                    </div>

                    <div className="ml-3 text-gray-500 font-medium"><img src="https://audius.org/img/audius@2x.png" className={`${!audius?'filter grayscale-75 ':''}w-10 h-10 filter`}  alt="audius"></img></div>
                  </label>
                </div>
              </Popover.Group>
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <a
                  href="/upload"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >Upload</a>
                <a
                  href=" "
                  onClick=""
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Connect
                </a>
              </div>
            </div>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <img className="h-8 w-auto" src={Logo} alt="Workflow" />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="py-6 px-5 space-y-6">
                  <div className="grid grid-cols-1 gap-y-4 gap-x-8 object-right text-center">
                    <a
                      href=""
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      Videos
                    </a>
                    <div className="py-16"></div>
                    <a
                      href=""
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      Music
                    </a>
                  </div>
                  <div>
                    <a
                      href=""
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Sign up
                    </a>
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                      Existing customer?{" "}
                      <a
                        href=""
                        className="text-indigo-600 hover:text-indigo-500"
                      ></a>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
