export interface IQuestionButton {
  text: string;
}

export interface IAnswerMessage {
  text: string;
  setIsWriting: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface IQuestionMessage {
  text: string;
}

export interface IDot {
  delay: number;
}