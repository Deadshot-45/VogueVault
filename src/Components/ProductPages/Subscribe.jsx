import React from 'react'

const Subscribe = () => {
  return (
    <section className="mb-32 w-[100%]">
        <article className="flex gap-4 flex-col justify-center items-center">
          <h1 className="font-semibold font-sans text-2xl max-xs:text-xl">
            Subscribe now & get 10% off
          </h1>
          <p className="text-zinc-500 text-md text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <form className="flex gap-2 ">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 max-xm:w-[50%] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
        </article>
      </section>
  )
}

export default Subscribe