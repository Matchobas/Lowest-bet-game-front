import suitcaseImg from './assets/suitcaseMoney.jpeg';
import { api } from './api';
import { useEffect, useState } from 'react';

export function App() {
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [remainDate, setRemainDate] = useState<Date>(new Date());

  function countdown(date: Date): string {
    const timer = date.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    return timer;
  }

  useEffect(() => {
    const endTime = endDate.getTime();
    const remainingTime = new Date(endTime - new Date().getTime());

    setRemainDate(remainingTime);

  }, [remainDate, endDate]);

  useEffect(() => {
    api.get(`auction/95360d67-e29e-4b3f-b641-876f09e4ee76`)
    .then((response) => {
      const date = new Date(response.data.end_time);
      setEndDate(date);
    })
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h2 className="text-white text-7xl p-4">{countdown(remainDate)}</h2>
      <img src={suitcaseImg} />
      <form className="py-6">
        <input className="rounded-l h-8 p-2" type="number" placeholder="Type your bet here"></input>
        <button className="px-4 h-8 bg-purple-700 text-white rounded-r">Enviar</button>
      </form>
    </div>
  )
}