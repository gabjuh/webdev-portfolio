import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { IQuestionButton, IAnswerMessage, IQuestionMessage, IDot } from '../interfaces/Chat';
import questions from '../data/chat/questions';
import themes from '../themes.json';
import chatgtp from '../assets/logos/chatgpt.svg';

const theme = themes[2];

const colors = {
  dot: '#5cbe61',
  text: theme.left[0],
  background: theme.left[1],
  question: theme.right[2],
  questionText: '#fff',
  answer: theme.left[0],
  answerText: '#fff',
  avatarBg: theme.left[1],
}

const QuestionButton: React.FC<IQuestionButton> = ({ text }) => {

  const [isWriting, setIsWriting] = useState<boolean>(false);

  const hideButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = document.querySelectorAll('.question-button');
    setIsWriting(true);
    buttons.forEach(button => {
      button.classList.add('opacity-0');
      setTimeout(() => {
        button.classList.add('invisible');
      }, 200);
      if (button === e.currentTarget) {
        setTimeout(() => {
          button.classList.add('hidden');
        }, 500);
      }
    });
  };

  const giveAnswer = (text: string) => {
    const chat = document.querySelector('#chat');
    const containerElement = document.createElement('div');
    const answer = <AnswerMessage text={text} setIsWriting={setIsWriting} />;
    chat?.appendChild(containerElement);
    createRoot(containerElement).render(answer);
  };

  const showButtons = () => document.querySelectorAll('.question-button').forEach(button => {
    button.classList.remove('invisible', 'opacity-0');
  });

  useEffect(() => {
    showButtons();
  }, [!isWriting])

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const chat = document.querySelector('#chat');
    const containerElement = document.createElement('div');
    containerElement.classList.add('opacity-0', 'transition-opacity', 'duration-[.5s]');
    setTimeout(() => {
      containerElement.classList.remove('opacity-0');
    }, 200)
    const question = <QuestionMessage text={text} />;
    chat?.appendChild(containerElement);
    createRoot(containerElement).render(question);
    hideButton(e);
    giveAnswer(questions.find(q => q.text === text)?.answer || 'Sorry, I don\'t know that.');
  };

  return (
    <>
      <div className="group">
        <button
          className="relative question-button bg-gradient-to-r from-[#5cbe61] via-[#009f81] to-[#a8c923] text-sm md:text-[12pt] block py-2 px-4 rounded-xl transition-all duration-[.3s] mx-auto my-3 italic font-weight-300 shadow-md group-hover:shadow-xl group-hover:scale-[1.05] group-hover:-translate-y-[.3rem] -translate-y-1.5"
          onClick={handleOnClick}
        >
          "{text}"
        </button>
      </div>
    </>
  );
};

const AnswerMessage: React.FC<IAnswerMessage> = ({ text, setIsWriting }) => {

  const [message, setMessage] = useState<string[]>([]);

  const [paragraph, setParagraph] = useState<string>('');

  const Avatar = () => {
    return (
      <div
        className="relative h-[38px] w-[38px] rounded-md flex items-center justify-center"
        style={{
          backgroundColor: colors.avatarBg,
        }}
      >
        <img src={chatgtp} alt="Chat-GPT Logo" />
      </div>
    );
  };

  const Dot: React.FC<IDot> = ({ delay }) => {
    return (
      <>
        <div
          className={`w-2 h-2 p-2 inline-block mx-[4px] rounded-2xl mt-[5px] transition-all`}
          style={{
            animationDelay: `${delay}ms`,
            animationDuration: '500ms',
            animationIterationCount: 'infinite',
            animationName: 'bounce',
            animationTimingFunction: 'ease-in-out',
            backgroundColor: colors.dot,
          }}
        >
        </div>
      </>
    );
  };

  const WaitingAnimation = () => {
    return (
      <>
        <div className="waiting-animation translate-y-0.5">
          <Dot delay={0} />
          <Dot delay={125} />
          <Dot delay={250} />
        </div>
      </>
    );
  };

  const generateRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

  // create an async function to add words to the message
  const addWord = async (text: string, index: number, words: Array<string>) => {
    // if the index is less than the length of the words array
    if (index < words.length && text.length !== message.length) {
      // add the word to the message
      setParagraph((message) => `${message} ${words[index]}`);
      // wait for a random amount of time
      await new Promise((resolve) => setTimeout(resolve, generateRandomNumber(50, 180)));
      // call the function again with the next index
      addWord(text, index + 1, words);
    }
    if (index === words.length) {
      setTimeout(() => {
        setIsWriting(false);
      }, 2000);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      addWord(text, 0, text.split(' '));
    }, generateRandomNumber(3000, 4500));
  }, []);

  const ShowParagraphs: React.FC = () => {
    return (
      <React.Fragment>
        {paragraph.split('|').map((paragraph, index) => (
          <p className={index > 0 ? 'mt-[1.2rem]' : ''} key={index}>{paragraph}</p>
        ))}
      </React.Fragment>
    );
  };

  return (
    <>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 translate-y-6">
            <Avatar />
          </div>
        </div>
        <div
          className="chat-bubble before:bg-[#5cbe61] bg-gradient-to-r from-[#5cbe61] via-[#009f81] to-[#a8c923] shadow-md before:shadow-md text-[#222] p-1"
          id="current-bubble"
        >
          <div className="bg-[#eeeeeee4] rounded-[11px] px-3.5 py-2">
            {!paragraph ? <WaitingAnimation /> : <ShowParagraphs />}
          </div>
        </div>
      </div>
    </>
  );
};

const QuestionMessage: React.FC<IQuestionMessage> = ({ text }) => {

  return (
    <>
      <div className="chat chat-end mt-1 mb-1">
        <div
          className="chat-bubble before:bg-[#a8c923] chat-end bg-gradient-to-r from-[#5cbe61] via-[#009f81] to-[#a8c923] shadow-md before:shadow-md text-sm md:text-[12pt] block py-2 px-4 rounded-xl my-3 italic font-weight-300"
          style={{
            backgroundColor: colors.question,
            color: colors.questionText,
          }}
        >{text}</div>
      </div>
    </>
  );
};

const Chat = () => {

  return (
    <>
      <div className="md:container md:mx-auto mb-[300px] w-[98%] md:w-auto mx-1">
        <h2 className="text-xl md:text-2xl text-center mb-10">Was hat die Künstliche Intelligenz über mich zu sagen?</h2>
        <div id="chat" className="text-sm md:text-[12pt] max-w-[1000px] mx-auto leading-relaxed">
          {/* Here come the messages */}
        </div>
        {/* <div className="border-t-[5px] border-t-[#aaa] rounded mt-10"></div> */}
        <div id="question-buttons" className="transition-all delay-[.2s] duration-[.5s] mt-10">
          <div className="text-center text-[#fff]">
            {questions.map((question) => (
              <QuestionButton key={question.id} text={question.text} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;