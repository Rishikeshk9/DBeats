import { useState } from "react";
import { Tab } from "@headlessui/react";
import Form from "./form.component";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Switcher() {
  let [categories] = useState({
    Music: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Video: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    NFT: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  return (
    <div className="w-full max-w-full mx-auto">
      <div className=" px-2 py-8 sm:px-0  mx-auto bg-dbeats">
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 mx-auto max-w-md bg-gray-200  rounded-xl transition duration-500 ease-in-out ">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium   rounded-lg  ",
                    "focus:outline-none   ",
                    selected
                      ? "bg-gradient-to-r from-green-400 to-blue-500 font-bold shadow text-white"
                      : "text-gray-400 hover:bg-white/[0.12] hover:text-gray-600 "
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panel
            index={0}
            className="  transition-all transform h-64 flex flex-col"
            activeClassName="opacity-100 duration-500 translate-x-0"
            inactiveClassName="absolute opacity-0 -translate-x-2"
          >
            <Form className="" name="audio" />
          </Tab.Panel>
          <Tab.Panel
            index={1}
            className="  transition-all transform h-64 flex flex-col"
            activeClassName="opacity-100 duration-500 translate-x-0"
            inactiveClassName="absolute opacity-0 -translate-x-2"
          >
            
            <Form className="" name="video" />
          </Tab.Panel>
          <Tab.Panel
            index={2}
            className="  transition-all transform h-64"
            activeClassName="opacity-100 duration-500 translate-x-0"
            inactiveClassName="absolute opacity-0 -translate-x-2"
          >            
          <Form className="" name="nft" />
          </Tab.Panel>
        </Tab.Group>
      </div>
    </div>
  );
}
