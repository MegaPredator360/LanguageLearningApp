import { Button, Card, Col, Divider, Dropdown, Input, MenuProps, notification, Row, Select, Space, Tag, Tooltip } from "antd"
import { InfoCircleOutlined, DownOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Category } from "../../interfaces/category-interface";
import CategoryService from "../../services/category-service";

function ExerciseFormView() {

    // Select List
    const [listCategory, setListCategory] = useState([])

    // Lista de Ejercicios
    // const [exerciseList, setExerciseList] = useState([])
    // const [exerciseCounter, setExerciseCounter] = useState<number>(0)

    // Notificacion
    const [api, contextHolder] = notification.useNotification();

    // Estado para manejar los Tags
    const [tags, setTags] = useState<string[]>([]);
    const [tagValue, setTagValue] = useState('');

    // Textarea de un input
    const { TextArea } = Input;

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: "Pairing"
        },
        {
            key: '2',
            label: "Selection"
        },
        {
            key: '3',
            label: "True / False"
        },
        {
            key: '4',
            label: "Sentence"
        },
    ];

    // Lista de opciones de las categorias
    const obtainCategories = async () => {

        // Llamamos al metodo de lista del servicio de temas
        await CategoryService.List()
            .then(data => {
                if (data.status) {
                    // Aquí se procesan los datos recibidos
                    setListCategory(data.value.map((category: Category) => ({
                        value: category.id,
                        label: category.name,
                    })));
                }
                else {
                    // Notificacion
                    api['error']({
                        message: 'Error',
                        description: "An error ocurred when obtaining the topics",
                    });
                    console.error(data.msg);
                }
            })
            .catch(error => {
                // Notificacion
                api['error']({
                    message: 'Error',
                    description: "An error ocurred when obtaining the topics",
                });
                console.error(error);
            })
    }

    // Función para añadir un nuevo Tag
    const handleAddTag = () => {
        if (tagValue && tags.indexOf(tagValue) === -1) {
            setTags([...tags, tagValue]);
        }
    };

    // Función para eliminar un Tag
    const handleRemoveTag = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };

    // Renderizador de Tags
    const forMap = (tag: string) => (
        <span key={tag} style={{ display: 'inline-block' }}>
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleRemoveTag(tag);
                }}
            >
                {tag}
            </Tag>
        </span>
    );

    const tagChild = tags.map(forMap);

    // Inicializamos metodos de carga de datos
    useEffect(() => {
        obtainCategories()
    }, [tags])

    return (
        <>
            {contextHolder}
            <div className="container mt-5">
                <Card>
                    <Row>
                        <Col span={12} className="pe-2">
                            {/* Titulo del ejercicio */}
                            <h4 className="fw-bold">Title</h4>
                            <Input placeholder="Title of the Exercise" />

                            {/* Categoria del ejercicio */}
                            <div style={{ marginTop: 16 }} className="d-flex">
                                <h4 className="fw-bold">Category</h4>
                                <Tooltip title="Tell us... What is the category of your exercise?">
                                    <Button style={{ marginLeft: 10 }} shape="circle"><InfoCircleOutlined /></Button>
                                </Tooltip>
                            </div>
                            <Select
                                showSearch
                                placeholder="Select a category"
                                optionFilterProp="label"
                                //onChange={handleCountryChange}
                                options={listCategory}
                                className='w-100'
                            //status={countryError ? 'error' : ''}
                            />

                            {/* Etiquetas del ejercicio */}
                            <div style={{ marginTop: 16 }} className="d-flex">
                                <h4 className="fw-bold">Tags</h4>
                                <Tooltip title="Add multiple tags for your exercise">
                                    <Button style={{ marginLeft: 10 }} shape="circle"><InfoCircleOutlined /></Button>
                                </Tooltip>
                            </div>
                            <Space.Compact style={{ width: '100%' }}>
                                <Input
                                    placeholder="Add a tag to your exercise"
                                    value={tagValue}
                                    onChange={(e) => setTagValue(e.target.value)}
                                />
                                <Button
                                    type="primary"
                                    onClick={handleAddTag}
                                >
                                    Add tag
                                </Button>
                            </Space.Compact>
                            <div style={{ marginTop: 16 }}>
                                {tags.length === 0 ? (<div style={{ fontSize: 14.5, marginLeft: 5 }}>No tags added for this exercise</div>) : tagChild}
                            </div>

                            {/* Idioma del ejercicio */}
                            <div style={{ marginTop: 16 }} className="d-flex">
                                <h4 className="fw-bold">Language</h4>
                                <Tooltip title="What is the language of your exercise?">
                                    <Button style={{ marginLeft: 10 }} shape="circle"><InfoCircleOutlined /></Button>
                                </Tooltip>
                            </div>
                            <Select
                                showSearch
                                placeholder="Select a language"
                                optionFilterProp="label"
                                //onChange={handleCountryChange}
                                options={listCategory}
                                className='w-100'
                            //status={countryError ? 'error' : ''}
                            />
                        </Col>
                        <Col span={12} className="ps-2">
                            {/* Descripcion del ejercicio */}
                            <div className="d-flex">
                                <h4 className="fw-bold">Description</h4>
                                <Tooltip title="Give a brief description of your exercise that gets the interest of people">
                                    <Button style={{ marginLeft: 10 }} shape="circle"><InfoCircleOutlined /></Button>
                                </Tooltip>
                            </div>
                            <TextArea
                                placeholder="Exercise description"
                                style={{ height: "90%", resize: "none" }}
                            />
                        </Col>
                    </Row>

                    <Divider />
                    <div className="d-flex justify-content-center">
                        <h4 className="fw-bold">
                            Exercises
                        </h4>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Dropdown menu={{ items }}>
                            <Button className=" mx-3">
                                Select an Exercise Type
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                        <Button type="primary">
                            Save
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default ExerciseFormView