import React from 'react'

const Event = ({ event }) => {
  return (
    <p
      className={`relative	h-fit w-full truncate text-ellipsis rounded border border-[#7EB87D] bg-[#D4FCC9] py-1.5 pr-1 pl-5 text-base font-normal text-black`}
    >
      {event.name}
      <span className="absolute top-1/2 left-[6px] h-[70%] w-[4px] translate-y-[-50%] rounded bg-[#7EB87D]" />
    </p>
  )
}

export default Event
