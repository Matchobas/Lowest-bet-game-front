import suitcaseImg from './assets/suitcaseMoney.jpeg';
import { api } from './api';
import { FormEvent, useCallback, useEffect, useState } from 'react';

interface Bet {
  id: string;
  value: number;
}

export function App() {
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [remainDate, setRemainDate] = useState<Date>(new Date());
  const [betValue, setBetValue] = useState<number>();
  const [auctionBets, setAuctionBets] = useState<Bet[]>([]);
  const [winner, setWinner] = useState<number | null>(null);

  function countdown(date: Date): string {
    const timer = date.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    return timer;
  }

  function handleBetForm(event: FormEvent) {
    event.preventDefault();

    try {
      api.post('bets', {
        auctionId: '9cc788f6-7c0f-4dc1-807a-24c8851fbc7a',
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
      const remainingTime = new Date(endTime - new Date().getTime());

      console.log('Data de termino: ' + endDate);
      console.log('Data de início: ' + remainingTime);

      setRemainDate(remainingTime);
    }, 1000000);

    console.log(remainDate);

  }, [remainDate, endDate]);

  // Getting an active auction
  useEffect(() => {
    api.get(`auction/9cc788f6-7c0f-4dc1-807a-24c8851fbc7a`)
    .then((response) => {
      const date = new Date(response.data.end_time);
      setEndDate(date);
      setAuctionBets(response.data.bets);
    })
  }, []);

  useEffect(() => {
    api.get('bets/winner/9cc788f6-7c0f-4dc1-807a-24c8851fbc7a')
    .then((response) => {
      setWinner(response.data.winnerBet.value);
    });
  }, [auctionBets]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h2 className="text-white text-7xl p-4">{countdown(remainDate)}</h2>
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