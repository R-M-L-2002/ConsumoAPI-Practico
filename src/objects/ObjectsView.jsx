import { Fragment } from "react"
import { useFormState } from "react-dom"

const ObjectsView = ({ users, loading, error, setSearchObjects }) => {

    return(
        <Fragment>
            <h1>Lista de Usuarios</h1>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <button onClick={() => setSearchObjects(true)}>Buscar Objetos</button>
            {loading ? <p style={{ color: "blue" }}> Cargando Objetos</p>
                :
            
                <table border="1">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((users) => (
                            <tr key={users.id}>
                                <td>{users.name}</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
                }
        </Fragment>
    )

}

export default ObjectsView