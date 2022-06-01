import suitcaseImg from './assets/suitcaseMoney.jpeg';
import { api } from './api';
import { FormEvent, useCallback, useEffect, useState } from 'react';

interface Bet {
  id: string;
  value: number;
}

export function App() {
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [remainDate, setRemainDate] = useState<number | null>(null);
  const [betValue, setBetValue] = useState<number>();
  const [auctionBets, setAuctionBets] = useState<Bet[]>([]);
  const [winner, setWinner] = useState<number | null>(null);

  // function countdown(date: Timer): string {
  //   // const timer = date.toLocaleString("en-GB", {
  //   //   hour: "2-digit",
  //   //   minute: "2-digit",
  //   //   second: "2-digit"
  //   // });

  //   if (date.seconds.split('').length != 2) date.seconds = ['0',date.seconds].join('');
  //   if (date.minutes.split('').length != 2) date.minutes = ['0',date.minutes].join('');
  //   const timer = [date.hours, date.minutes, date.seconds].join(':');

  //   return timer;
  // }

  function countdown(duration: number) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 30);
  
    const sHours = (hours < 10) ? "0" + hours : hours;
    const sMinutes = (minutes < 10) ? "0" + minutes : minutes;
    const sSeconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return String(days) + ":" + sHours + ":" + sMinutes + ":" + sSeconds;
  }

  function handleBetForm(event: FormEvent) {
    event.preventDefault();

    try {
      api.post('bets', {
        auctionId: '961b22d6-91e8-44b0-ab14-07b6363f251b',
        value: betValue,
        username: 'Jeff',
      }).then((response) => {
        console.log(response)
        window.location.reload();
      });

    } catch (err: any) {
      console.log(err.message);
    }
  }

  // Changing the time date to create the countdown timer
  useEffect(() => {
    setInterval(() => {
      const endTime = endDate.getTime();
      const remainingTime = endTime - new Date().getTime();

      setRemainDate(remainingTime);
    }, 1010);

    console.log(remainDate);

  }, [remainDate, endDate]);

  // Getting an active auction
  useEffect(() => {
    api.get(`auction/961b22d6-91e8-44b0-ab14-07b6363f251b`)
    .then((response) => {
      const date = new Date(response.data.end_time);
      setEndDate(date);
      setAuctionBets(response.data.bets);
    })
  }, []);


  useEffect(() => {
    api.get('bets/winner/961b22d6-91e8-44b0-ab14-07b6363f251b')
    .then((response) => {
      setWinner(response.data.winnerBet.value);
    });
  }, [auctionBets]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h2 className="text-white text-7xl p-4">{remainDate && countdown(remainDate)}</h2>
      <img src={suitcaseImg} />
      <form className="py-6" onSubmit={(event) => handleBetForm(event)}>
        <input
          onChange={(props) => {
            setBetValue(props.target.valueAsNumber);
          }}
          className="rounded-l h-8 p-2 text-purple-900" 
          type="number" 
          placeholder="Type your bet here"
        ></input>
        <button
          type="submit" 
          className="px-4 h-8 bg-purple-700 text-white rounded-r hover:bg-purple-600 hover:transition-colors"
          disabled={!betValue}
        >
          Enviar
        </button>
      </form>
      
      <div className="flex">
        {auctionBets.map((bet) => {
          return (
            <b key={bet.id} className="px-4">{bet.value}</b>
          )
        })}
      </div>
      {auctionBets.length > 0 && (<h3 className="text-purple-500 pt-4 text-3xl">{winner}</h3>)}
    </div>
  )
}