import React, { useState, useEffect } from 'react';
import './QuestionModal.css'; 


const QuestionModal = ({isOpen, onClose, onAddQuestion, existingQuestion}) => {
    const [question, setQuestion] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const [correctAnswer, setcorrectAnswer] = useState('');
    const [id,setId] = useState(false);
   


useEffect (() => {
if (existingQuestion) {
    setId(existingQuestion.id),
    setQuestion(existingQuestion.pitanje),
    setAnswer1(existingQuestion.odgovor1),
    setAnswer2(existingQuestion.odgovor2),
    setAnswer3(existingQuestion.odgovor3),
    setAnswer4(existingQuestion.odgovor4),
    setcorrectAnswer(existingQuestion.tacan_odgovor)
}

 else {
    setQuestion(''),
    setAnswer1(''),
    setAnswer2(''),
    setAnswer3(''),
    setAnswer4(''),
    setcorrectAnswer('')
 }
},

    [existingQuestion, isOpen]
);


const handleSubmit = async (e) => {
    e.preventDefault();
    
    

    const newQuestion = {id, question, answer1, answer2, answer3, answer4, correctAnswer};
    const success = await onAddQuestion(newQuestion);
    console.log(success)
    if (success) {
    setQuestion('');
    setAnswer1('');
    setAnswer2('');
    setAnswer3('');
    setAnswer4('');
    setcorrectAnswer('');
    onClose();
    }
};

if (!isOpen) return null;


return (  
    <div className="modal-overlay">
      <div className="modal">
      <h2>{existingQuestion ? 'Edit Question' : 'Add Question'}</h2>
        <form onSubmit={handleSubmit}>
          <div className = "flex justify-between">
            <label>Question </label>
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />
          </div>
          <div className = "flex justify-between">
            <label>Answer 1: </label>
            <input type="text" value={answer1} onChange={(e) => setAnswer1(e.target.value)} required />
          </div>
          <div className = "flex justify-between">
            <label>Answer 2: </label>
            <input type="text" value={answer2} onChange={(e) => setAnswer2(e.target.value)} required />
          </div>
          <div className = "flex justify-between">
            <label>Answer 3: </label>
            <input type="text" value={answer3} onChange={(e) => setAnswer3(e.target.value)} required />
          </div>
          <div className = "flex justify-between">
            <label>Answer 4: </label>
            <input type="text" value={answer4} onChange={(e) => setAnswer4(e.target.value)} required />
          </div>
          <div className = "flex justify-between">
            <label>Correct answer: </label>
            <input type="text" value={correctAnswer} onChange={(e) => setcorrectAnswer(e.target.value)} required />
          </div>
          <button type="submit">{existingQuestion ? 'Update Question' : 'Add Question'}</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}
export default QuestionModal;