import { useEffect, useState } from "react"
import ObjectsView from "./ObjectsView";

const ObjectsContainer = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchObjects, setSearchObjects] = useState (false);
    const [localObjects, setLocalObjects] = useState ([])

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

    //POST
    const createObjects = async (newObject) => {
        try {
            const response = await fetch (`https://api.restful-api.dev/objects`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    newObject
                )
            });
                if (response.status === 200) {
                    const createdNewObject = await response.json();

                    const updateUsers = [... users, createdNewObject];

                    setUsers(updateUsers);

                    const updateLocal = [... localObjects, createdNewObject];

                    setLocalObjects(updateLocal);

                    localStorage.setItem(
                        "createdObjects", JSON.stringify(updateLocal

                        ));
                    console.log('Objeto Creado')
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
    const editObjects = async (id, updateObject) => {
        try {
            const response = await fetch (`https://api.restful-api.dev/objects/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    updateObject
                )
            });
                if (response.status === 200) {
                    const updateThisObject = await response.json();

                    const updateLocal = localObjects.map(
                        obj => obj.id === id ? updateThisObject : obj
                    );
                    setLocalObjects(updateLocal);

                    localStorage.setItem(
                        'createdObjects', JSON.stringify(updateLocal
                        ));
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
    const deleteObjects = async (id) => {
        try {
            const response = await fetch (`https://api.restful-api.dev/objects/${id}`, {
                method: 'DELETE'
            });
                if (response.ok) {
                    console.log('Objeto eliminado');

                    const updateLocal = localObjects.filter(obj => obj.id !== id);

                    setLocalObjects(updateLocal);
                    
                    localStorage.setItem('createdObjects',  JSON.stringify(updateLocal))

                } else {
                    setError(response.statusText)
                }                                                                   
            } catch (error) {
                console.error(error)
            } 
    }; 

    useEffect(() => {
        const saved = localStorage.getItem('createdObjects');

        if (saved) {
            setLocalObjects(JSON.parse(saved))
        }
    }, []);

    useEffect (() => {
        if (searchObjects) {
            setLoading(true)
            getObjects();
        }
    }, [searchObjects]);

    return(
        <ObjectsView 
        users={users} 
        loading={loading} 
        error={error} 
        setSearchObjects={setSearchObjects}
        createObjects={createObjects}
        localObjects={localObjects}
        editObjects={editObjects}
        deleteObjects={deleteObjects}
        />
    );
}

export default ObjectsContainer