import { useState, Fragment } from "react"
import { useFormStatus } from "react-dom";

const ObjectsView = ({ users, loading, error, setSearchObjects, createObjects, editObjects, deleteObjects }) => {
    const [name, setName] = useState('');
    const [feature, setFeatures] = useState('');
    const [price, setPrice] = useState('');
    const [year, setYear] = useState('');
    const [showForm, setShowForm] = useState(false);

    return(
        <Fragment>
            <h2>Consumo de API</h2>
            <h1>Gestion de Objetos</h1>

            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <button onClick={() => setSearchObjects(true)}>Buscar Objetos</button>
            <button onClick={() => setShowForm(true)}>Nuevo Objeto</button>

            {showForm && (
                <Fragment>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        createObjects(name, feature, parseFloat(price), parseInt(year));
                        setShowForm(false)
                    }}>
                        <input type='text' placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required></input>
                        <input type='text' placeholder="Caracteristicas" value={feature} onChange={(e) => setFeatures(e.target.value)} required></input>
                        <input type='number' placeholder="$" value={price} onChange={(e) => setPrice(e.target.value)} required></input>
                        <input type='number' placeholder="año" value={year} onChange={(e) => setYear(e.target.value)} required></input>
                        <button type='submit'>Añadir Objeto</button>
                    </form>
                </Fragment>
            )}


            {loading ? <p style={{ color: "blue" }}> Cargando Objetos</p>
                :
            
                <table border="1">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Editar/Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((users) => (
                            <tr key={users.id}>
                                <td>{users.name}</td> 
                                <td>{users.data && users.data.price ? `$${users.data.price}` : '-'}</td> 
                                <td>
                                    <button onClick={() => editObjects(users.id)}>Editar</button>
                                    <button onClick={() => deleteObjects(users.id)}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                }
        </Fragment>
    )

}

export default ObjectsView