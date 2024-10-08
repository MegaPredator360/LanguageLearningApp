import { Button, Card, Input, Pagination, Select, Space, Tooltip } from "antd"
import ReadingService from "../../services/reading-service";
import moment from 'moment';
import { Reading } from "../../interfaces/reading-interface";
import { useEffect, useState } from "react";
import { useNotification } from '../../components/notification-component';
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from '@ant-design/icons';

function SearchView() {

    // Navegacion entre componentes
    const navigate = useNavigate();

    // Filtracion de datos
    const [filterText, setFilterText] = useState('')
    const [filterType, setFilterType] = useState('title')

    // Paginacion
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    // Notificacion
    const { showNotification } = useNotification();

    // Lista
    const [listReading, setListReading] = useState([])

    // Función para manejar el cambio del input de filtro
    const handleFilterTextChange = (event: any) => {
        setFilterText(event.target.value);
        setCurrentPage(1);
    };

    const handleFilterTypeChanges = (value: string) => {
        setFilterType(value);
        setCurrentPage(1)
    }

    // Limpiar campo de busqueda
    const clearFilterText = () => {
        setFilterText("");
        setCurrentPage(1);
    }

    // Filtrar lecturas basado en el valor del filtro
    const filteredReadings = listReading.filter((reading: Reading) => {
        const lowerCaseFilterText = filterText.toLowerCase();

        switch (filterType) {
            case 'title':
                return reading.title.toLowerCase().includes(lowerCaseFilterText);
            case 'type':
                return reading.category_name.toLowerCase().includes(lowerCaseFilterText);
            case 'category':
                return reading.category_name.toLowerCase().includes(lowerCaseFilterText);
            case "tags":
                return reading.reading_tags.some((tag) =>
                    tag.name.toLowerCase().includes(lowerCaseFilterText)
                );
            case 'language':
                return reading.language_name.toLowerCase().includes(lowerCaseFilterText);
            case 'username':
                return reading.user_username.toLowerCase().includes(lowerCaseFilterText);
            // Agrega más casos si tienes más criterios
            default:
                return false;
        }
    });
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
                    showNotification('error', 'Error', "An error ocurred when obtaining the readings and exercises");
                    console.error(data.msg);
                }
            })
            .catch(error => {
                // Notificacion
                showNotification('error', 'Error', "An error ocurred when obtaining the readings and exercises");
                console.error(error);
            })
    }

    // Inicializamos metodos de carga de datos
    useEffect(() => {
        obtainReading()
    }, [])

    return (
        <>
            <div className="container mt-5">
                <Card className="min-vh-100">
                    <Space.Compact className="w-100">
                        <Select
                            defaultValue="title"
                            style={{ width: '150px' }}
                            onChange={handleFilterTypeChanges}
                            options={[
                                { value: 'title', label: 'Title' },
                                { value: 'type', label: 'Type' },
                                { value: 'category', label: 'Category' },
                                { value: 'tags', label: 'Tags' },
                                { value: 'language', label: 'Language' },
                                { value: 'username', label: 'Username' },
                            ]}
                            value={filterType}
                        />
                        <Input
                            className="w-100"
                            placeholder="Search Content"
                            onChange={handleFilterTextChange}
                            value={filterText}
                        />
                        <Tooltip title='Clear search text'>
                            <Button
                            disabled={ filterText == "" ? true : false }
                            onClick={clearFilterText}
                            >
                                <DeleteOutlined />
                            </Button>
                        </Tooltip>
                    </Space.Compact>

                    {/* Tabla de contenido */}
                    <table className="table mt-4">
                        <thead className="table-light text-center">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Type</th>
                                <th scope="col">Category</th>
                                <th scope="col">Language</th>
                                <th scope="col">Views</th>
                                <th scope="col">Likes</th>
                                <th scope="col">Uploaded by</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedReadings.map((reading: Reading, index) => (
                                <tr key={index}>
                                    <td className="align-middle"><a className="text-primary" onClick={() => navigate('/reading', { state: reading })}>{reading.title}</a></td>
                                    <td className="align-middle">{reading.description}</td>
                                    <td className="text-center align-middle">{'Reading'}</td>
                                    <td className="text-center align-middle">{reading.category_name}</td>
                                    <td className="text-center align-middle">{reading.language_name}</td>
                                    <td className="text-center align-middle">{reading.views}</td>
                                    <td className="text-center align-middle">{reading.likes}</td>
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