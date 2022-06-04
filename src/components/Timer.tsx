interface TimerProps {
  remainDate: number | null;
}

export function Timer({ remainDate }: TimerProps) {
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

  return (
    <h2 className="text-white text-7xl p-4">{remainDate && countdown(remainDate)}</h2>
  );
}