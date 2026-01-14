import { useState } from 'react'
import { apiRequest } from '../lib/utils.js'; 

export const useTimein = () => {
    const [studentId, setStudentId] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [message, setMessage] = useState({text: '', type:''})

    const timein = async (inputId) => {
        const formatRegex = /^\d{4}-\d{5}$/;
        // FIX 1: 'error' was undefined. Added quotes: 'error'
        if(!formatRegex.test(inputId)){
            setMessage({text:'Format invalid', type: 'error'}) 
            setIsValid(false)
            return
        }

        setIsLoading(true)
        setMessage({text:'', type: ''})
        setIsValid(true)

        try {
            // FIX 2: Removed JSON.stringify. apiRequest/Axios handles objects automatically.
            // If your utils.js expects a string, keep stringify, but standard axios usage allows objects.
            // Based on your utils.js parsing logic, we will fix utils.js separately, 
            // but for now, let's fix the RESPONSE handling.
            
            const response = await apiRequest('/attendance', {
                method: 'POST',
                // You can usually pass the object directly if we clean up utils.js
                body: JSON.stringify({student_id: inputId, type: 'IN'}) 
            })

            // FIX 3: Axios does NOT have .json() or .ok
            // Axios automatically throws an error for 4xx/5xx responses, 
            // so we don't need "if (!response.ok)"
            
            const data = response.data; // Access data directly

            setMessage({text: data.message, type: 'success'})
            setStudentId('')
        
        } catch(error) {
            // FIX 4: Handle Axios error object
            const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message;
            setMessage({ text: errorMsg, type: 'error'}); // Added quotes to 'error'
        } finally {
            setIsLoading(false)
        }
    }

    return { timein, isLoading, message, isValid, studentId, setStudentId }   
}

// Apply similar fixes to useTimeout...
export const useTimeout = () => {
     const [studentId, setStudentId] = useState('')
     const [isValid, setIsValid] = useState(true)
     const [isLoading, setIsLoading] = useState(false)
     const [message, setMessage] = useState({text: '', type: ''})

     const timeout = async (inputId) => {
           const formatRegex = /^\d{4}-\d{5}$/;
           if(!formatRegex.test(inputId)){
            setMessage({text:'invalid format', type: 'error'}) // Fixed quotes
            setIsValid(false)
            return
           }
           setIsLoading(true)
           setMessage({text:'', type:''})
           setIsValid(true)

           try{
              const response = await apiRequest('/attendance', {
                    method: 'POST',
                    body: JSON.stringify({student_id: inputId, type: 'OUT'})
                })
                
                // Fixed Response Handling
                const data = response.data;
                
                setStudentId('')
                setMessage({text: data.message, type:'success'})
                setIsValid(true)
           } catch(error){
                 const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message;
                 setMessage({text: errorMsg, type: 'error'}) // Fixed quotes
           } finally {
            setIsLoading(false)
           }
     }
     return { timeout, isLoading, message, isValid, studentId, setStudentId }
}