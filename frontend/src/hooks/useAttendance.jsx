import { useState } from 'react'
import { apiRequest } from '../lib/utils.js'; 
import successSound from "../success.mp3";
import errorSound from "../error.mp3";

const playSuccess = () => {
  const audio = new Audio(successSound);
  audio.play().catch(() => {});
};

const playError = () => {
  const audio = new Audio(errorSound);
  audio.play().catch(() => {});
};

export const useTimein = () => {
    const [studentId, setStudentId] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [message, setMessage] = useState({text: '', type:''})
    const [studentNotFound, setStudentNotFound] = useState(false)

    const timein = async (inputId) => {
        const formatRegex = /^\d{4}-\d{5}$/;
        if(!formatRegex.test(inputId)){
            setMessage({text:'Format invalid', type: 'error'}) 
              playError(); // 🔊
            setIsValid(false)
            setStudentNotFound(false)
            return
        }

        setIsLoading(true)
        setMessage({text:'', type: ''})
        setIsValid(true)
        setStudentNotFound(false)

        try {
            const response = await apiRequest('/attendance', {
                method: 'POST',
                body: JSON.stringify({student_id: inputId, type: 'IN'}) 
            })

            const data = response.data;

            setMessage({text: data.message, type: 'success'})
            playSuccess(); // 🔊
            setStudentId('')
            setStudentNotFound(false)
        
        } catch(error) {
            const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message;
            setMessage({ text: errorMsg, type: 'error'});
            
            // Check if error indicates student not found
            const lowerError = errorMsg.toLowerCase();
            if (lowerError.includes('not found') || 
                lowerError.includes('not registered') || 
                lowerError.includes('does not exist')) {
                setStudentNotFound(true);
            }
        } finally {
            setIsLoading(false)
        }
    }

    return { timein, isLoading, message, isValid, studentId, setStudentId, studentNotFound }   
}

export const useTimeout = () => {
     const [studentId, setStudentId] = useState('')
     const [isValid, setIsValid] = useState(true)
     const [isLoading, setIsLoading] = useState(false)
     const [message, setMessage] = useState({text: '', type: ''})
     const [studentNotFound, setStudentNotFound] = useState(false)

     const timeout = async (inputId) => {
           const formatRegex = /^\d{4}-\d{5}$/;
           if(!formatRegex.test(inputId)){
            setMessage({text:'invalid format', type: 'error'})
                 playError(); // 🔊
            setIsValid(false)
            setStudentNotFound(false)
            return
           }
           
           setIsLoading(true)
           setMessage({text:'', type:''})
           setIsValid(true)
           setStudentNotFound(false)

           try{
              const response = await apiRequest('/attendance', {
                    method: 'POST',
                    body: JSON.stringify({student_id: inputId, type: 'OUT'})
                })
                
                const data = response.data;
                
                setStudentId('')
                setMessage({text: data.message, type:'success'})
                playSuccess(); // 🔊
                setIsValid(true)
                setStudentNotFound(false)
                
           } catch(error){
                 const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message;
                 setMessage({text: errorMsg, type: 'error'})
                 
                 // Check if error indicates student not found
                 const lowerError = errorMsg.toLowerCase();
                 if (lowerError.includes('not found') || 
                     lowerError.includes('not registered') || 
                     lowerError.includes('does not exist')) {
                     setStudentNotFound(true);
                 }
           } finally {
            setIsLoading(false)
           }
     }
     return { timeout, isLoading, message, isValid, studentId, setStudentId, studentNotFound }
}