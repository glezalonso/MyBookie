import { useEffect, useState } from "react"
import { getLeagues } from "../../../models/leagues.models"

import TableLeagues from "../leagues/TableLeagues"
import toast, {Toaster} from 'react-hot-toast'
import { Spinner, Alert, Container}  from'react-bootstrap'


const SportLeagues = ({sportId}) => {
 const [ leagues,setLeagues ] = useState([])
 const [ loading, setLoading]= useState(false)

 
    useEffect(() =>{
        getLeagues()
        .then(data=> {
            setLoading(true)
            setLeagues(data.data)})
        .catch(() => toast.error('Failed to load leagues'))
        .finally(()=> setLoading(false))
    },[loading])
   
    
    if(loading) return <Spinner animation="border" />
    
    return (
        <>
        <Toaster position="botton-center" reverseOrder={false} />
       
        <Container>
           <h1 className="h1">Leagues</h1>
            <TableLeagues leagues={leagues} sportId={sportId} setLoading={setLoading} />
       </Container>  
        </>
    )
}

export default SportLeagues