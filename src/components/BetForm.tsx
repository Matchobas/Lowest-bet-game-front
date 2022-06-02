import { ChangeEvent, FormEvent } from "react";

interface BetFormProps {
  betValue: number | undefined;
  changeBetValue: (props: ChangeEvent<HTMLInputElement>) => void;
  handleBetForm: (event: FormEvent) => void;
}

export function BetForm({ betValue, changeBetValue, handleBetForm }: BetFormProps) {
  return (
    <form className="py-6" onSubmit={(event) => handleBetForm(event)}>
      <input
        onChange={(props) => {
          changeBetValue(props);
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
  )
}