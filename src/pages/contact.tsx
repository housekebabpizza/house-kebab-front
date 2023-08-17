import { useGeneral } from "../hooks/useGeneral";

export default function Contact() {
  const { openClose } = useGeneral();

  return (
    <div className="w-full bg-slate-200 h-[90vh] p-3 md:p-10">
      <div className="w-full h-full bg-white rounded-xl flex flex-col md:flex-row">
        <div className="w-full md:w-[60%] h-full">
          <iframe
            className="w-full h-full bg-white md:rounded-l-xl rounded-b-xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2440.8336817262666!2d20.97083981211607!3d52.28272137188312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecbdc3d3b6311%3A0xf07be216c523b1a8!2sHouse%20Kebab!5e0!3m2!1sen!2spl!4v1682603528244!5m2!1sen!2spl"
            width="100%"
            height="100%"
            loading="lazy"
          ></iframe>
        </div>

        <div className="h-full w-full lg:pt-32">
          <h1 className="mb-2 text-lg font-semibold text-yellow-300  text-center mt-6 lg:text-6xl">Informacje</h1>
          <div className="flex h-full w-full md:justify-around mb-4 md:mb-0 md:pt-10 md:flex-row flex-col items-center">
            <div className="lg:h-full w-[200px]">
              <h1 className="mb-2 text-lg font-semibold text-gray-900"> Informacja prawna</h1>
              <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                <li className="flex items-center">House Kebab & Pizza</li>
                <li className="flex items-center">Klaudyny 26</li>
                <li className="flex items-center">01-684 Warszawa</li>
                <li className="flex items-center text-blue-500">
                  <a href="mailto:housekebab606@gmail.com">Wyslij nam e-mail</a>
                </li>
                <li className="flex items-center text-blue-500">
                  <a href="tel:+48 579 250 176">+48 579 250 176</a>
                </li>
              </ul>
            </div>

            <div className="mt-4 md:mt-0 lg:h-full w-[200px]">
              <h1 className="mb-2 text-lg font-semibold text-gray-900"> Godziny otwarty</h1>
              <ul className="max-w-md space-y-1 text-gray-500">
                <li className={`flex items-center`}>
                  <span className="w-[40%]">Pt – Sb:</span> <span>10:00 – 22:40</span>
                </li>
                <li className={`flex items-center text-red-500`}>
                  <span className="w-[40%]">Dzisiaj:</span>
                  <span>
                    {openClose?.open?.slice(0, 5)} – {openClose?.close?.slice(0, 5)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
