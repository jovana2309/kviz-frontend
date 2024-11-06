import Adminsidebar from "../components/Adminsidebar";
import './Questions.css';
import axiosInstance from "../services/axios";
import { useState, useEffect, useRef } from "react";
import QuestionModal from './QuestionModal';
import ErrorMessage from "./Error.jsx";



    const Questions = () => {

        const [data, setData] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [editingQuestion,setEditingQuestion] = useState(null);
      
      
        useEffect(() => { 
      
        const fetchAllQuestions = async () => {
         try {
          const response = await axiosInstance.get("/admin/questions")
          setData(response.data) ;
         }
         catch (error) {
         setError (error.message);
         } finally {
          setLoading (false);
         }
         };
         fetchAllQuestions();  
        }, []);
      
      
        const deleteQuestion = async (id) => {
          try {
              const promptQuestion = confirm (
                  "Are you sure you want to delete this question?" )
                  if (promptQuestion) {
                      const response = await axiosInstance.delete(`admin/deleteQuestion/${id}`);
                      if (response.statusText === "OK") { 
                          setData((prevData) => prevData.filter((question) => question.id !== id));
                      }  
                    } 
                     }
                      catch (error) {
                        setError(error.message);
                      }
                    };
      
          
          const addQuestion = async (newQuestion) => {
              try {
                  const response = await axiosInstance.post('/admin/newQuestion',newQuestion);
                  if (response.status === 201) {
                      setData  ((prevData) => [...prevData,response.data]);
                      return true;
                  }
              } 
              catch (err) {
                console.log(err)
                setError(err.response.data.message ? err.response.data.message : err.message);
                setTimeout(() => {
                    setError(false);
                }, 5000);
            }
          };
      
      
          const editQuestion = async (editingQuestion) => {
            try {
                const response = await axiosInstance.put(`/admin/editQuestion/${editingQuestion.id}`, editingQuestion);
                if (response.status === 200) {
                    setData((prevData) => prevData.map(question => (question.id === editingQuestion.id ? {id: editingQuestion.id, pitanje: editingQuestion.question, odgovor1: editingQuestion.answer1, odgovor2: editingQuestion.answer2, odgovor3: editingQuestion.answer3, odgovor4: editingQuestion.answer4, tacan_odgovor: editingQuestion.correctAnswer} : question)));
                    return true;
                }
            }

            catch (err) {
                console.log(err)
                setError(err.response.data.message ? err.response.data.message : err.message);
                setTimeout(() => {
                    setError(false);
                }, 5000);
            }
          };

      
          const handleEditClick = (question) => {
            setEditingQuestion(question);
            setIsModalOpen(true);
          }

       const Rows =  (data.map((question, id) => (
        <tr key = {id}>
          <td> {question.pitanje} </td>
          <td> {question.odgovor1} </td>
          <td> {question.odgovor2} </td>
          <td> {question.odgovor3}</td>
          <td> {question.odgovor4}</td>
          <td> {question.tacan_odgovor} </td>
          <td>  
            <button className = "e-button" onClick={() => handleEditClick(question)}>Edit</button>
            <button className = "e-button" onClick={() => deleteQuestion(question.id)}>Delete</button>
          </td>
        </tr>
      ) 

    ));

 return (

    <div className="flex flexx">
    <Adminsidebar active = "questions" />
    {error && <ErrorMessage>{error}</ErrorMessage>}
    <div className = "table-container"> 
    <button className = "ev" onClick={() => { setEditingQuestion(null); setIsModalOpen(true); }}>Add Question</button>
        <QuestionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} 
            onAddQuestion ={editingQuestion ? editQuestion : addQuestion} 
            existingQuestion={editingQuestion}/>
        <table>
            <thead>
                <tr>
                <th>Question</th>
                <th>Answer 1</th>
                <th>Answer 2</th>   
                <th>Answer 3</th>
                <th>Answer 4</th>
                <th>Correct answer</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {loading ? (
                <tr><td colSpan="5">Loading...</td></tr>
              )  : (
                Rows
              )}
     
            </tbody>
        </table>
     

    </div>
    </div>
    )
}

export default Questions;