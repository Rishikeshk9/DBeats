/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/

import { useState } from "react";
import { Tab } from "@headlessui/react";
import Dropdown from "./dropdown.component";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
 
export default function Example() {
  return (
    <div className="mx-auto xl:w-8/12 lg:w-8/12 md:w-11/12  sm:w-full ">
      <form action="#" method="POST">
        <div className=" bg-white  shadow-md rounded-lg  px-5 py-5 my-5">
          <div className="md:grid md:grid-cols-3 md:gap-6  mt-5  ">
            <div className="md:col-span-1  ">
              <div className="mt-5 md:mt-0 md:col-span-2 p-5 ">
                <label className="block text-sm font-medium text-gray-700">
                  Cover photo
                </label>
                <div className=" mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center ">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only "
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className=" sm:rounded-md  ">
                <div className="px-4 py-5  space-y-6 sm:p-6">
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    <div className="col-span-2 sm:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Track Name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-md">
                        <input
                          type="text"
                          name="trackName"
                          id="company-website"
                          className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-transparent"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div className="col-span-2 sm:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                         Tags
                      </label>
                      <div className="mt-1 flex rounded-md shadow-md">
                        <input
                          type="text"
                          name="trackName"
                          id="company-website"
                          className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-transparent"
                          placeholder=" "
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-col-2 gap-6 ">
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-8">
                      <div className="col-span-2  sm:col-span-2">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Genre
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <Dropdown />
                        </div>
                      </div>

                      <div className="col-span-2 sm:col-span-2">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mood
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <Dropdown />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="shadow-md  focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-transparent rounded-md"
                        placeholder=""
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Any Behind the scenes you'll like your Audience to know!.
                    </p>
                  </div>

                  <div className="grid grid-col-2 gap-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Allow Attribution?
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <Dropdown />
                        </div>
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Commercial Use?
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <Dropdown />
                        </div>
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Derivative Works?
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <Dropdown />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3  text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-indigo-700 transform transition delay-50 duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-6 ml-3 font-bold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
