import suitcaseImg from './assets/suitcaseMoney.jpeg';

export function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h2 className="text-white text-7xl p-4">Timer</h2>
      <img src={suitcaseImg} />
      <form className="py-6">
        <input className="rounded-l h-8 p-2" type="number" placeholder="Type your bet here"></input>
        <button className="px-4 h-8 bg-purple-700 text-white rounded-r">Enviar</button>
      </form>
    </div>
  )
}