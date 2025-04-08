import { useState, Fragment } from "react"
import 'primereact/resources/themes/lara-light-purple/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ObjectsView = ({ users, loading, error, setSearchObjects, createObjects, localObjects, editObjects, deleteObjects }) => {
    const [name, setName] = useState('');
    const [feature, setFeatures] = useState('');
    const [price, setPrice] = useState('');
    const [year, setYear] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showLocalTable, setShowLocalTable] = useState(true);
    const [editId, setEditId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newObject = {
            name,
            data: {
                feature,
                price: Number(price),
                year: Number(year)
            }
        };

        if (editId) {
            editObjects(editId, newObject);
        } else {
            await createObjects(newObject);
        }

        setName("");
        setFeatures("");
        setPrice("");
        setYear("");
        setEditId(null);
        setShowForm(false);
    };

    const handleEdit = (id) => {
        const edit = localObjects.find(obj => obj.id === id);
        if (edit) {
            setName(edit.name);
            setFeatures(edit.data.feature);
            setPrice(edit.data.price);
            setYear(edit.data.year);
            setEditId(id);
            setShowForm(true);
            setShowLocalTable(true);
        }
    }

    return (
        <Fragment>
            <h2>Consumo de API</h2>
            <h3>by Rebeca López</h3>
            <h1>Gestión de Objetos</h1>

            <Card style={{ backgroundColor: '#e0dee6', border: '1px solid #000541' }}>

            <div >
                <Button label="Buscar Objetos" 
                icon="pi pi-search" 
                onClick={() => {
                    setSearchObjects(true);
                    setShowLocalTable(false)
                }} 
                />
                <Button label="Nuevo Objeto" 
                icon="pi pi-plus" 
                onClick={() => {
                setShowForm(!showForm);
                setShowLocalTable(true);
                setEditId(null);
                setName('');
                setFeatures("");
                setPrice("");
                setYear("");    
                }} />
            </div>

            {showForm && (
                <form onSubmit={handleSubmit}>

                    <h2>{editId ? 'Editar Objeto' : 'Nuevo Objeto'}</h2>
                    
                    <div class="formgrid grid">
                        <div class="field col-12 md:col-6">
                            <InputText placeholder="Nombre" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required className="w-full" />
                        </div>

                        <div class="field col-12 md:col-6">
                            <InputNumber placeholder="$" 
                            value={price} onValueChange={(e) => setPrice(e.value)} 
                            required className="w-full" />
                        </div>

                        <div class="field col-12 md:col-6">
                            <InputNumber placeholder="Año" 
                            value={year} onValueChange={(e) => setYear(e.value)}
                            useGrouping={false} //para que no ponga comas en el año
                            required className="w-full" />
                        </div>

                        <div class="field col-12 md:col-6">
                            <InputText placeholder="Caracteristicas" 
                            value={feature} onChange={(e) => setFeatures(e.target.value)}
                            required className="w-full" />
                        </div>

                        <Button 
                        type="submit" icon = "pi pi-check"  > {editId ? 'Guardar' : 'Agregar'}
                        </Button>
                    </div>
                </form>
            )}

            {error && <p className="text-red-500">
                Error: {error}
                </p>}

            {loading ? (
                <p>
                    Cargando Objetos...
                    </p>
            ) : showLocalTable ? (
                
                <DataTable
                value={localObjects}
                stripedRows
                showGridlines
                rows={5}
                >
                    <Column 
                        field="name" 
                        header="Nombre"
                    />

                    <Column 
                        field="data.price"
                        header="Precio"
                        body={(rowData) => `$${rowData.data.price}`}
                    />

                    <Column field="year"
                        header="Año"
                        body={(rowData) => `${rowData.data.year}`}
                     />

                    <Column field="feature" 
                        header="Caracteristicas"
                        body={(rowData) => `${rowData.data.feature}`}
                    />
                    <Column
                        header="Editar / Borrar"
                        body={(rowData) => (
                        <>
                            <Button
                                icon="pi pi-pencil"
                                className="p-button-sm p-button-info mr-2"
                                onClick={() => handleEdit(rowData.id)}
                                label="Editar"
                            />
                            <Button
                                icon="pi pi-trash"
                                className="p-button-sm p-button-danger"
                                onClick={() => deleteObjects(rowData.id)}
                                label="Borrar"
                            />
                        </>
                     
                    )}
                     />

                    
                </DataTable>
            ) : (
                <DataTable
                    value={users}
                    header="Usuarios"
                    stripedRows
                    showGridlines
                    rows={5}
                >
                    <Column field="name" header="Nombre" />
                </DataTable>
            )}
            </Card>
        </Fragment>
    );
};


export default ObjectsView;
