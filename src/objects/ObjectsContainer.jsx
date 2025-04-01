import { useEffect, useState } from "react"
import ObjectsView from "./ObjectsView";

const ObjectsContainer = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchObjects, setSearchObjects] = useState (false);

    //GET
    const getObjects = async () => {
        try {
            const response = await fetch(`https://api.restful-api.dev/objects`, {
                method: 'GET',
            });
            if (response.status === 200) {
                const data = await response.json();
                setUsers(data)
            } else { 
               setError(response.statusText) 
            }
        } catch (e) {
            console.log(e.menssage)
        } finally {
            setLoading(false)
            setSearchObjects(false)
        }
    }

    useEffect (() => {
        if (searchObjects) {
            setLoading(true)
            getObjects();
        }
    }, [searchObjects]);

    //POST
    const postObjects = async () => {
        const bodyPost = {
            name: 'nombre del objeto',
            data: {
                freature: "detalles",
                price: 0,
                year: 2025
            }
        }
        try {
            const response = await fetch (`https://api.restful-api.dev/objects`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    bodyPost
                })
            });
                if (response.status === 200) {
                    console.log("Objeto Creado")
                } else {
                    setError(response.statusText)
                }                                                                   
            } catch (e) {
                console.log(e.menssage)
            } finally {
                setLoading(false)
                setSearchObjects(false)
            }
    }
        
    


    return(
        <ObjectsView users={users} loading={loading} error={error} setSearchObjects={setSearchObjects}/>
    )
}

export default ObjectsContainer