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

import React, { useState } from "react";
import Dropdown from "./dropdown.component";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Noty from "noty";
import Multiselect from "multiselect-react-dropdown";
import useWeb3Modal from '../hooks/useWeb3Modal';
import mintNFT from './Mint';

const Form = (props) => {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  const [track, setTrack] = useState({
    trackName: "",
    trackImage: "",
    trackFile: "",
    genre: "",
    mood: "",
    tags: "",
    description: "",
    isrc: "",
    iswc: "",
    allowAttribution: "",
    commercialUse: "",
    derivativeWorks: "",
  });

  const [video, setVideo] = useState({
    videoName: "",
    videoImage: "",
    videoFile: "",
    category: "",
    ratings: "",
    tags: "",
    description: "", 
    allowAttribution: "",
    commercialUse: "",
    derivativeWorks: "",
  });
  var state = {
    options: [
      { name: "Nudity", id: 1 },
      { name: "Drugs", id: 2 },
      { name: "Violence", id: 3 },
      { name: "Strong Language", id: 4 },
    ],
  };
  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setTrack({ ...track, [name]: value });
  };

  const handleVideoInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setVideo({ ...video, [name]: value });
  };

  const onFileChange = (e) => {
    if (e.target.name === "trackFile") {
      track.trackFile = e.target.files[0];
      var trckName = e.target.files[0].name.replace(/\.[^/.]+$/, "");
      document.getElementById("trackName").value = trckName;
      track.trackName = trckName;
      document.getElementById("audio-label").textContent = trckName;
    } else if (e.target.name === "trackImage") {
      track.trackImage = e.target.files[0];
    } else if (e.target.name === "videoFile") {
      video.videoFile= e.target.files[0];
       trckName = e.target.files[0].name.replace(/\.[^/.]+$/, "");
      document.getElementById("videoName").value = trckName;
      video.videoName = trckName;
      document.getElementById("video-label").textContent = trckName;
    } else if (e.target.name === "videoImage") {
      video.videoImage = e.target.files[0];
    }
  }; 
  
  const onVideoFileChange = (e) => {
     if (e.target.name === "videoFile") {
      video.videoFile= e.target.files[0];
       var trckName = e.target.files[0].name.replace(/\.[^/.]+$/, "");
      document.getElementById("videoName").value = trckName;
      video.videoName = trckName;
      document.getElementById("video-label").textContent = trckName;
    } else if (e.target.name === "videoImage") {
      video.videoImage = e.target.files[0];
    }
  };
  

  const PostData = async (e) => {
    e.preventDefault();
    if(e.target.value==="Upload Video"){
      
 
      const {
        videoName,
        videoImage,
        videoFile,
        category,
        ratings,
        tags,
        description, 
        allowAttribution,
        commercialUse,
        derivativeWorks,
      } = video; 
      
    var formData = new FormData(); // Currently empty

    formData.append("videoName", videoName);
    
    formData.append("tags", tags);
    formData.append("description", description);

    formData.append("category", category);
    formData.append("ratings", ratings);
    formData.append("allowAttribution", allowAttribution);
    formData.append("commercialUse", commercialUse);
    formData.append("derivativeWorks", derivativeWorks);

    formData.append("videoFile", videoFile);
    formData.append("videoImage", videoImage);

    if (
      video.videoFile.length !== 0 &&
      video.videoImage.length !== 0 &&
      video.videoName.length !== 0
    ) {
      axios
        .post("/upload-video", formData)
        .then(function (response) {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Noty.closeAll();
      new Noty({
        type: "error",
        text: "Choose Video File & Fill other Details",
        theme: "metroui",
        layout: "bottomRight",
      }).show();
    }
     

    }
    else if(e.target.value==="Upload Audio"){
      let formDatanft = new FormData();
      formDatanft.append('videoFile', track.trackFile);

      if(document.getElementById("is_nft").checked)
      await mintNFT(
        provider,
        formDatanft,
        track.trackFile,
        track.trackName,
        track.description
      );
      
    const {
      trackName,
      trackImage,
      trackFile,
      genre,
      mood,
      tags,
      description,
      isrc,
      iswc,
      allowAttribution,
      commercialUse,
      derivativeWorks,
    } = track;

   formData = new FormData(); // Currently empty

    formData.append("trackName", trackName);
    formData.append("genre", genre);

    formData.append("mood", mood);
    formData.append("tags", tags);
    formData.append("description", description);

    formData.append("isrc", isrc);
    formData.append("iswc", iswc);
    formData.append("allowAttribution", allowAttribution);
    formData.append("commercialUse", commercialUse);
    formData.append("derivativeWorks", derivativeWorks);

    formData.append("trackFile", trackFile);
    formData.append("trackImage", trackImage);

    if (
      track.trackFile.length !== 0 &&
      track.trackImage.length !== 0 &&
      track.trackName.length !== 0
    ) {
      axios
        .post("/upload", formData)
        .then(function (response) {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Noty.closeAll();
      new Noty({
        type: "error",
        text: "Choose Audio File & Fill other Details",
        theme: "metroui",
        layout: "bottomRight",
      }).show();
    }
    
  }
  };
 
  if (props.name === "audio") {
    return (
      <div className="mx-auto xl:w-8/12 lg:w-8/12 md:w-11/12  sm:w-full ">
        <form method="POST" encType="multipart/formdata">
          <div className=" bg-white  shadow-md rounded-lg  px-5 py-5 my-5">
            <div className="md:grid md:grid-cols-3 md:gap-6  mt-5  ">
              <div className="md:col-span-1  ">
                <div className="mt-5 md:mt-0 md:col-span-2 p-5 ">
                  <label className="block text-sm font-medium text-gray-700"></label>
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
                      <div className="flex text-sm text-gray-600 justify-center ">
                        <label
                          htmlFor="file-upload"
                          className="text-center relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <p className="text-center" id="audio-thumbnail-label">
                            Choose Album Art
                          </p>
                          <input
                            id="file-upload"
                            type="file"
                            required
                            name="trackImage"
                            accept=".jpg,.png,.jpeg"
                            onChange={onFileChange}
                            className="sr-only "
                          />
                        </label>
                        <p className="pl-1"> </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2 p-5  ">
                  <label className="block text-sm font-medium text-gray-700"></label>
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
                          htmlFor="file-upload2"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span id="audio-label">Choose Audio file</span>
                          <input
                            required
                            id="file-upload2"
                            type="file"
                            accept=".mp3"
                            name="trackFile"
                            onChange={onFileChange}
                            className="sr-only "
                          />
                        </label>
                        <p className="pl-1"></p>
                      </div>
                      <p className="text-xs text-gray-500">MP3 up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2 p-5  ">
                  <label className="block text-sm font-medium text-gray-700"></label>
                  <div className=" mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center ">
                      <div className="flex text-sm text-gray-600">
                        <input
                          id="is_nft"
                          name="isNFT"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <p className="px-3">Mint NFT</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className=" sm:rounded-md  ">
                  <div className="px-4 py-5  space-y-6 sm:p-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                      <div className="col-span-3 sm:col-span-3">
                        <label
                          htmlFor="trackName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Track Name
                        </label>
                        <div className="mt-1 flex rounded-md shadow-md">
                          <input
                            type="text"
                            name="trackName"
                            id="trackName"
                            value={track.trackName}
                            onChange={handleInputs}
                            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-transparent"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-8">
                      <div className="col-span-4 sm:col-span-4">
                        <label
                          htmlFor="tags"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tags
                        </label>
                        <div className="mt-1 flex rounded-md shadow-md">
                          <input
                            type="text"
                            name="tags"
                            id="tags"
                            value={track.tags}
                            onChange={handleInputs}
                            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-transparent"
                            placeholder=" "
                          />
                        </div>
                      </div>

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

                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-8">
                      <div className="col-span-4 sm:col-span-4">
                        <label
                          htmlFor="tags"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Track ISRC
                        </label>
                        <div className="mt-1 flex rounded-md shadow-md">
                          <input
                            type="text"
                            name="isrc"
                            id="isrc"
                            value={track.isrc}
                            onChange={handleInputs}
                            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-transparent"
                            placeholder=" "
                          />
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-4">
                        <label
                          htmlFor="iswc"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Track ISWC
                        </label>
                        <div className="mt-1 flex rounded-md shadow-md">
                          <input
                            type="text"
                            name="iswc"
                            id="iswc"
                            value={track.iswc}
                            onChange={handleInputs}
                            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-transparent"
                            placeholder=" "
                          />
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
                          value={track.description}
                          onChange={handleInputs}
                          className="shadow-md  focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-transparent rounded-md"
                          placeholder=""
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Any Behind the scenes you'll like your Audience to
                        know!.
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
            <input
              type="submit"
              onClick={PostData}
              value="Upload Audio"
              className="inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-indigo-700 transform transition delay-50 duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            ></input>
          </div>
        </form>
      </div>
    );
  } else if (props.name === "video") {
    return (
      <div className="mx-auto xl:w-8/12 lg:w-8/12 md:w-11/12  sm:w-full ">
        <form method="POST" encType="multipart/formdata">
          <div className=" bg-white  shadow-md rounded-lg  px-5 py-5 my-5">
            <div className="md:grid md:grid-cols-3 md:gap-6  mt-5  ">
              <div className="md:col-span-1  ">
                <div className="mt-5 md:mt-0 md:col-span-2 p-5 ">
                  <label className="block text-sm font-medium text-gray-700"></label>
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
                      <div className="flex text-sm text-gray-600 ">
                        <label
                          htmlFor="file-upload3"
                          className="text-center relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span
                            id="video-thumbnail-label"
                            className="text-center"
                          >
                            Choose Video Thumbnail
                          </span>
                          <input
                            id="file-upload3"
                            type="file"
                            name="videoImage"
                            accept=".jpg,.png,.jpeg"
                            onChange={onVideoFileChange}
                            className="sr-only "
                          />
                        </label>
                        <p className="pl-1"> </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2 p-5  ">
                  <label className="block text-sm font-medium text-gray-700"></label>
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
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="file-upload4"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <p className=" " id="video-label">
                            Choose Video file
                          </p>
                          <input
                            id="file-upload4"
                            type="file"
                            accept=".mp4, .mkv, .mov, .avi"
                            name="videoFile"
                            onChange={onVideoFileChange}
                            className="sr-only "
                          />
                        </label>
                        <p className="pl-1"></p>
                      </div>
                      <p className="text-xs text-gray-500">
                        Mp4, MKV, MOV, AVI up to 250MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className=" sm:rounded-md  ">
                  <div className="px-4 py-5  space-y-6 sm:p-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                      <div className="col-span-1 sm:col-span-1">
                        <label
                          htmlFor="videoName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Video Title
                        </label>
                        <div className="mt-1 flex rounded-md shadow-md">
                          <input
                            type="text"
                            name="videoName"
                            id="videoName"
                            value={video.videoName}
                            onChange={handleVideoInputs}
                            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-transparent"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-8 gap-6 sm:grid-cols-8">
                      <div className="col-span-4 sm:col-span-4">
                        {" "}
                        <label
                          htmlFor="videoTags"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tags
                        </label>
                        <div className="mt-1 flex rounded-md shadow-md">
                          <input
                            type="text"
                            name="videoTags"
                            id="videoTags"
                            value={video.videoTags}
                            onChange={handleVideoInputs}
                            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-transparent"
                            placeholder=" "
                          />
                        </div>
                      </div>

                      <div className="col-span-2  sm:col-span-2">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
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

                    <Multiselect  className="mt-1 flex rounded-md shadow-md "
                      options={state.options} // Options to display in the dropdown
                      selectedValues={state.selectedValue} // Preselected value to persist in dropdown
                      // Function will trigger on select event
                      // Function will trigger on remove event
                      value={video.ratings}
                      onSelect={handleVideoInputs}
                      name="ratings"
                      displayValue="name" // Property name to display in the dropdown options
                    />

                    <div className="">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="videoDescription"
                          name="description"
                          rows={3}
                          value={video.description}
                          onChange={handleVideoInputs}
                          className="shadow-md  focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-transparent rounded-md"
                          placeholder=""
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Any Behind the scenes you'll like your Audience to
                        know!.
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
            <input
              type="submit"
              onClick={PostData}
              value="Upload Video"
              className="inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-indigo-700 transform transition delay-50 duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            ></input>
          </div>
        </form>
      </div>
    );
  } else if (props.name === "nft") {
    return (
      <div className="mx-auto xl:w-8/12 lg:w-8/12 md:w-11/12  sm:w-full ">
        <div className=" bg-white  shadow-md rounded-lg  px-5 py-5 my-5 text-center">
          <h1 className=" text-lg font-bold text-info ">COMING SOON!</h1>
        </div>
      </div>
    );
  }
};

export default Form;
