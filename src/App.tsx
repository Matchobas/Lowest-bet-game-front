import suitcaseImg from './assets/suitcaseMoney.jpeg';
import { api } from './api';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { BetForm } from './components/BetForm';

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
  const [auctionItem, setAuctionItem] = useState('');

  const [auctionId, setAuctionId] = useState('');
  const [reload, setReload] = useState(false);

  function countdown(duration: number) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 120);
  
    const sHours = (hours < 10) ? "0" + hours : hours;
    const sMinutes = (minutes < 10) ? "0" + minutes : minutes;
    const sSeconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return String(days) + "d:" + sHours + ":" + sMinutes + ":" + sSeconds;
  }

  function handleBetForm(event: FormEvent) {
    event.preventDefault();

    try {
      api.post('bets', {
        auctionId: `${auctionId}`,
        value: betValue,
        username: 'Jeff',
      }).then((response) => {
        // console.log(response);
        setReload(!reload);
      });

    } catch (err: any) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    try {
      api.post('auction', {
        itemName: 'Maleta cheia de dinheiro',
        endDate: '2022-07-04T22:40:00.920Z',
      }).then((response) => {
        console.log(response.data.id);
        setAuctionId(response.data.id);
      });

    } catch (err: any) {
      console.log(err.message);
    }
  }, []);

  function changeBetValue(props: ChangeEvent<HTMLInputElement>) {
    setBetValue(props.target.valueAsNumber)
  }

  // Getting an active auction
  useEffect(() => {
    api.get(`auction/${auctionId}`)
    .then((response) => {
      const date = new Date(response.data.end_time);
      setEndDate(date);
      setAuctionBets(response.data.bets);
      setAuctionItem(response.data.item_name);
    })
  }, [auctionId, reload]);

    // Changing the time date to create the countdown timer
    useEffect(() => {
      setTimeout(() => {
        const endTime = endDate.getTime();
        const remainingTime = endTime - new Date().getTime();
  
        remainingTime > 0 ? setRemainDate(remainingTime) : setRemainDate(null);
      }, 1000);
  
    }, [remainDate, endDate]);

  useEffect(() => {
    api.get(`bets/winner/${auctionId}`)
    .then((response) => {
      setWinner(response.data.winnerBet.value);
    });
  }, [auctionBets]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      
      <h2 className="text-white text-7xl p-4">{remainDate && countdown(remainDate)}</h2>
      <p className="text-gray-100 font-bold text-3xl p-2">{auctionItem}</p>
      <img src={suitcaseImg} />
      <BetForm betValue={betValue} changeBetValue={changeBetValue} handleBetForm={handleBetForm} />
      
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