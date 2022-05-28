import suitcaseImg from './assets/suitcaseMoney.jpeg';
import { api } from './api';
import { useEffect, useState } from 'react';

export function App() {
  const [endDate, setEndDate] = useState<Date>(new Date());

  useEffect(() => {
    api.get(`auction/95360d67-e29e-4b3f-b641-876f09e4ee76`)
    .then((response) => {
      const date = new Date(response.data.end_time);
      const endTime = date.getTime();
      const remainTime = new Date(endTime - new Date().getTime());
      // const hours = remainTime.getHours();
      // const minutes = remainTime.getMinutes();
      // const seconds = remainTime.getSeconds();
      setEndDate(remainTime);
    })
  })

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h2 className="text-white text-7xl p-4">{endDate.toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })}</h2>
      <img src={suitcaseImg} />
      <form className="py-6">
        <input className="rounded-l h-8 p-2" type="number" placeholder="Type your bet here"></input>
        <button className="px-4 h-8 bg-purple-700 text-white rounded-r">Enviar</button>
      </form>
    </div>
  )
}