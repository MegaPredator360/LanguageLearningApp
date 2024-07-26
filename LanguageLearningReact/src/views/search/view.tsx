import { Card, Input, notification, Pagination, Select } from "antd"
import ReadingService from "../../services/reading-service";
import moment from 'moment';
import { Reading } from "../../interfaces/reading-interface";
import { useEffect, useState } from "react";

function SearchView() {

    // Filtracion de datos
    const [filterText, setFilterText] = useState('')

    // Paginacion
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    // Notificacion
    const [api, contextHolder] = notification.useNotification();
    //const [loading, setLoading] = useState(false)

    // Lista
    const [listReading, setListReading] = useState([])

    // Modificadores de Ant Design
    const { Option } = Select;
    const { Search } = Input;

    // Función para manejar el cambio del input de filtro
    const handleFilterTextChange = (event: any) => {
        setFilterText(event.target.value);
        setCurrentPage(1);
    };

    // Filtrar lecturas basado en el valor del filtro
    const filteredReadings = listReading.filter((reading: Reading) =>
        reading.title.toLowerCase().includes(filterText.toLowerCase()) // Cambia 'name' por el campo que quieras filtrar
    );

    // Calcular el total de páginas
    const totalItems = filteredReadings.length;

    // Obtener lecturas para la página actual
    const paginatedReadings = filteredReadings.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Función para manejar el cambio de página
    const handlePageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    // Obtener Lecturas
    const obtainReading = async () => {

        // Llamamos al metodo de lista del servicio de lecturas
        await ReadingService.List()
            .then(data => {
                if (data.status) {
                    // Aquí se procesan los datos recibidos
                    setListReading(data.value)
                }
                else {
                    // Notificacion
                    api['error']({
                        message: 'Error',
                        description: "An error ocurred when obtaining the languages",
                    });
                    console.error(data.msg);
                }
            })
            .catch(error => {
                // Notificacion
                api['error']({
                    message: 'Error',
                    description: "An error ocurred when obtaining the languages",
                });
                console.error(error);
            })
    }

    const filterSearch = (
        <Select defaultValue="name" style={{ width: 110 }}>
            <Option value="name">Title</Option>
            <Option value="type">Type</Option>
            <Option value="category">Category</Option>
            <Option value="tags">Tags</Option>
            <Option value="language">Language</Option>
            <Option value="username">Username</Option>
        </Select>
    );

    // Inicializamos metodos de carga de datos
    useEffect(() => {
        obtainReading()
    }, [])

    return (
        <>
            {contextHolder}
            <div className="container mt-5">
                <Card className="min-vh-100">
                    <Search
                        addonBefore={filterSearch}
                        placeholder="Search Content"
                        onChange={handleFilterTextChange}
                        onSearch={handleFilterTextChange}
                    />

                    {/* Tabla de contenido */}
                    <table className="table mt-4">
                        <thead className="table-light text-center">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Type</th>
                                <th scope="col">Category</th>
                                <th scope="col">Language</th>
                                <th scope="col">Uploaded by</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedReadings.map((reading: Reading, index) => (
                                <tr key={index}>
                                    <td className="align-middle">{reading.title}</td>
                                    <td className="align-middle">{reading.description}</td>
                                    <td className="text-center align-middle">{'Reading'}</td>
                                    <td className="text-center align-middle">{reading.category_name}</td>
                                    <td className="text-center align-middle">{reading.language_name}</td>
                                    <td className="align-middle">
                                        {reading.user_username}
                                        <br />
                                        {moment(reading.publish_date).format('DD/MM/YYYY hh:mm A')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Componente de paginación */}
                    <div
                        className="d-flex justify-content-center"
                    >
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={totalItems}
                            onChange={handlePageChange}
                            showSizeChanger
                            onShowSizeChange={handlePageChange}
                            pageSizeOptions={['10', '15', '20']}
                            className="mt-4"
                        />
                    </div>
                </Card>
            </div>
        </>
    )
}

export default SearchView