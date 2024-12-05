'use client'

export default function Header() {

  return (
  <header className="bg-white">
    <section>
      <figure className="bg-blue-600 rounded-xl h-10 w-10">

      </figure>
      <nav>
        <ul>
          <li></li>
        </ul>
      </nav>
    </section>
    <section className="flex items-center rounded-full bg-slate-100 p-2">
      <div className="box-border">
        <label htmlFor="searchLocation">Where are you going? (required)</label>
        <input id='searchLocation' name='searchLocation' type="text" placeholder="Destination, Accomodation" />
      </div>
    </section>
  </header>
);
};

    // <label className="input input-bordered h-[100px] rounded-l-full flex flex-col justify-center gap-2 px-12 py-2">
    //   Where are you going? (required)
    //   <input type="text" className="grow" placeholder="Destination, Accomodation" />
    // </label>
    // <label className="input input-bordered h-[100px] rounded-none flex flex-col justify-center gap-2 px-12 py-2">
    //   Check-In
    //   <input type="text" className="grow" placeholder="Destination, Accomodation" />
    // </label>