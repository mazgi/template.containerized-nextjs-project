import React from 'react'

const Content = () => {
  return (
    <React.Fragment>
      <article>
        <img className="p-4" src="https://via.placeholder.com/600" />
      </article>
      <article className="max-w-sm overflow-hidden bg-yellow-300 rounded shadow-xl">
        <img
          className="w-full"
          src="https://source.unsplash.com/random/480x360"
          alt="A cool pic from unsplash.com"
        />
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">
            Next.js meets Tailwind CSS
          </div>
          <p className="text-base text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
            #nextjs
          </span>
          <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
            #tailwindcss
          </span>
          <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
            #typescript
          </span>
        </div>
      </article>
    </React.Fragment>
  )
}

export default Content
