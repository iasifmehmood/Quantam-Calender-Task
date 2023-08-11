import React, { useState } from 'react'

const CreateEvent = ({ handleSubmit }) => {
  const [input, setInput] = useState('')
  const handleChange = (e) => setInput(e.target.value)

  return (
    <div className="flex h-full flex-col py-3">
      <div className="flex basis-full flex-col gap-1">
        <p className="text-grey-500 text-sm font-semibold">Event Title</p>
        <input
          className="w-full appearance-none rounded border border-[#7EB87D] py-2 px-4 leading-tight text-black focus:bg-white focus:outline-none"
          id="inline-title"
          type="text"
          value={input}
          placeholder="Event Title"
          onChange={handleChange}
        />
      </div>
      <button
        className="w-full rounded bg-[#44A32C] py-2 px-4 font-bold text-white hover:bg-[#44A32C]"
        onClick={() => {
          if (input !== '') handleSubmit(input)
        }}
      >
        Save
      </button>
    </div>
  )
}

export default CreateEvent
