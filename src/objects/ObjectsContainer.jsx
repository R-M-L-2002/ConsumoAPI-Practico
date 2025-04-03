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
            console.log(e.message)
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
    const createObjects = async (name, feature, price, year) => {
        const bodyPost = {
            name,
            data: {
                feature,
                price,
                year
            }
        };
        try {
            const response = await fetch (`https://api.restful-api.dev/objects`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    bodyPost
                )
            });
                if (response.ok) {
                    const newObject = await response.json();
                    console.log(newObject, "Creado");
                    localStorage.setItem('objectId', newObject.id); //guardar id en la localStorage
                    setUsers((prevUsers) => [...prevUsers, newObject]) //para que se vea en el listado

                } else {
                    setError(response.statusText)
                }                                                                   
            } catch (e) {
                console.log('objeto NO creado', e.message)
            } finally {
                setLoading(false)
                setSearchObjects(false)
            }
    };

    //PUT
    const editObjects = async (name, feature, price, year) => {
        const objectId = localStorage.getItem('objectId');
        const bodyPut = {
            name,
            data: {
                feature,
                price,
                year
            }
        };
        try {
            const response = await fetch (`https://api.restful-api.dev/objects/${objectId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    bodyPut
                )
            });
                if (response.ok) {
                    const updateObject = await response.json();
                    console.log(updateObject, "Actualizado")
                } else {
                    setError(response.statusText)
                }                                                                   
            } catch (e) {
                console.log(e.message)
            } finally {
                setLoading(false)
                setSearchObjects(false)
            }
    };
    
    //DELETE
    const deleteObjects = async () => {
        const objectId = localStorage.getItem('objectId');

        try {
            const response = await fetch (`https://api.restful-api.dev/objects/${objectId}`, {
                method: 'DELETE'
            });
                if (response.ok) {
                    console.log('Objeto eliminado');
                    localStorage.removeItem('objectId')

                } else {
                    setError(response.statusText)
                }                                                                   
            } catch (e) {
                console.log(e.message)
            } finally {
                setLoading(false)
                setSearchObjects(false)
            }
    }; 

    return(
        <ObjectsView 
        users={users} 
        loading={loading} 
        error={error} 
        setSearchObjects={setSearchObjects}
        createObjects={createObjects}
        editObjects={editObjects}
        deleteObjects={deleteObjects}
        />
    )
}

export default ObjectsContainer