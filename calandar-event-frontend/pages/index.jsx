import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import axios from 'axios'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  startOfWeek,
} from 'date-fns'
import { useState } from 'react'
import CreateEvent from '../components/CreateEvent'
import Event from '../components/Event'

const eventList = [
  {
    id: 1,
    name: 'Leslie Alexander',
    eventDate: '2023-08-11T13:00',
  },
  {
    id: 10,
    name: 'New Meeting',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    eventDate: '2023-08-11T13:00',
  },
  {
    id: 16,
    name: 'New Meeting2',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    eventDate: '2023-08-11T13:00',
  },
  {
    id: 2,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    eventDate: '2023-08-20',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  const [createNew, setCreateNew] = useState(false)
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
  const [events, setEvents] = useState(eventList)

  let days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  })

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  let selectedDayEvents = events.filter((event) =>
    isSameDay(parseISO(event.eventDate), selectedDay)
  )

  const toggleCreateNew = () => {
    setCreateNew((st) => !st)
  }
  const saveCreate = async (evntTitle) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post('http://localhost:4000/api/event', {
        name: evntTitle,
        eventDate: format(selectedDay, 'yyyy-MM-dd'),
      })

      setEvents((st) => [
        ...st,
        {
          id: 10909090,
          name: evntTitle,
          eventDate: format(selectedDay, 'yyyy-MM-dd'),
        },
      ])
    } catch (er) {
      alert(er.message)
    }

    toggleCreateNew()
  }

  return (
    <div className="mx-auto flex h-screen w-screen items-center bg-[#F1F6FF] px-4 py-4 py-2 font-montserrat sm:px-7 md:py-20">
      <div className="flex w-full items-stretch justify-center gap-3">
        {/* Calender Section */}
        <div className="basis-[70%] overflow-hidden rounded-[4px] border bg-white shadow-sm">
          {/* CaLENDER HEADING */}
          <div className="flex items-center px-5 py-4">
            <h1 className=" flex-auto text-xl font-semibold text-gray-900">
              {format(firstDayCurrentMonth, 'MMMM yyyy')}
            </h1>
            <button
              type="button"
              onClick={previousMonth}
              className="-my-1.5 flex flex-none items-center justify-center rounded-2xl bg-[#D9D9D9] p-1.5 text-black"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center rounded-2xl bg-[#D9D9D9] p-1.5 text-black"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="grid grid-cols-7 border-y text-center text-sm font-semibold leading-6 text-gray-500">
            <div className="border-r p-2">SUN</div>
            <div className="border-r  p-2">MON</div>
            <div className="border-r  p-2">TUE</div>
            <div className="border-r p-2">WED</div>
            <div className="border-r p-2">THU</div>
            <div className="border-r p-2">FRI</div>
            <div className="p-2">SAT</div>
          </div>
          <div className="grid grid-cols-7 text-sm">
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={classNames(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  `h-full min-h-[100px] py-1.5 ${
                    dayIdx % 7 !== 0 && 'border-l'
                  } border-b`
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (createNew) toggleCreateNew()
                    setSelectedDay(day)
                  }}
                  className={classNames(
                    isEqual(day, selectedDay) && 'text-black',
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray-900',
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray-400',
                    isEqual(day, selectedDay) && isToday(day) && 'bg-[#97D996]',
                    isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      'bg-[#97D996]',
                    !isEqual(day, selectedDay) && 'hover:bg-[#97D996]',
                    'mx-auto flex h-6 w-6 items-center justify-center rounded-full font-bold'
                  )}
                >
                  <time dateTime={format(day, 'yyyy-MM-dd')}>
                    {format(day, 'd')}
                  </time>
                </button>

                <div className="mx-auto mt-1 overflow-hidden text-ellipsis">
                  {events
                    .filter((meeting) =>
                      isSameDay(parseISO(meeting.eventDate), day)
                    )
                    .map(
                      (el, ind, arr) =>
                        ind < 2 && (
                          <div key={el.id} className="w-full px-1 ">
                            <p
                              key={el.id}
                              className={`relative truncate text-ellipsis rounded border border-[#7EB87D] bg-[#D4FCC9] py-1 pr-1 pl-3 text-xs ${
                                ind !== 0 && 'mt-[5px]'
                              }`}
                            >
                              {ind === 0 ? el.name : `+${arr.length - 1} more`}
                              <span className="absolute top-1/2 left-[4px] h-[70%] w-[3px] translate-y-[-50%] rounded bg-[#7EB87D]" />
                            </p>
                          </div>
                        )
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Event Section */}
        <section className="h-100 basis-[30%]  rounded-[4px] border bg-white shadow-sm">
          <div className="border-b py-1 px-4">
            <p className="flex-auto text-xl font-semibold text-gray-900">
              Events
            </p>

            <time
              dateTime={format(selectedDay, 'yyyy-MM-dd')}
              className="text-sm font-normal text-gray-300"
            >
              {format(selectedDay, 'dd MMM')}
            </time>
          </div>
          <ol className="h-[90%] space-y-1 px-4 py-3 text-sm leading-6  text-gray-500">
            {createNew ? (
              <CreateEvent handleSubmit={saveCreate} />
            ) : selectedDayEvents.length > 0 ? (
              <div className="flex h-full flex-col">
                <div className="flex w-full basis-full flex-col gap-2">
                  {selectedDayEvents.map((event) => (
                    <Event event={event} key={event.id} />
                  ))}
                </div>
                <button
                  className="w-full rounded bg-[#44A32C] py-2 px-4 font-bold text-white hover:bg-[#44A32C]"
                  onClick={toggleCreateNew}
                >
                  Add Event
                </button>
              </div>
            ) : (
              <div className="flex h-full flex-col gap-4">
                <div className="flex basis-full flex-col items-center justify-center">
                  <div className="max-width-[200px]">
                    <img
                      src={'/icon.svg'}
                      width="100%"
                      height="100%"
                      alt="icon"
                    />
                  </div>
                  <p className="text-lg font-semibold">No Events</p>
                </div>
                <button
                  className="w-full rounded bg-[#44A32C] py-2 px-4 font-bold text-white hover:bg-[#44A32C]"
                  onClick={toggleCreateNew}
                >
                  Add Event
                </button>
              </div>
            )}
          </ol>
        </section>
      </div>
    </div>
  )
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]
