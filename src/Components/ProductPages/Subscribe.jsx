import React from 'react'

const Subscribe = () => {
  return (
    <section className="mb-32 w-[100%]">
        <article className="flex gap-4 flex-col justify-center items-center">
          <h1 className="font-semibold font-sans text-2xl">
            Subscribe now & get 10% off
          </h1>
          <p className="text-zinc-500 text-md text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <div className="flex border border-zinc-200 justify-between max-sm:w-[80%] w-1/2">
            <input
              type="email"
              name="eamil"
              placeholder="Enter your email"
              className="px-2 outline-none text-zinc-700"
            />
            <button
              type="button"
              className="bg-black text-white text-[14px] py-3 px-8"
            >
              SUBSCRIBE
            </button>
          </div>
        </article>
      </section>
  )
}

export default Subscribe