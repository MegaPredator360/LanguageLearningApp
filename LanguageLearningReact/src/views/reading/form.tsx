import { Button, Card, Col, Input, notification, Row, Select, Space, Tag, Tooltip } from "antd"
import { InfoCircleOutlined } from '@ant-design/icons';
import CategoryService from "../../services/category-service";
import { useEffect, useState } from "react";
import { Category } from "../../interfaces/category-interface";

// Importacion de Imagen
import imagePlaceholder from "../../assets/images/image-placeholder.jpg"

function ReadingFormView() {

    const [listTopic, setListTopic] = useState([])

    // Notificacion
    const [api, contextHolder] = notification.useNotification();
    //const [loading, setLoading] = useState(false)

    // Estado para manejar los Tags
    const [tags, setTags] = useState<string[]>([]);
    const [tagValue, setTagValue] = useState('');

    // Textarea de un input
    const { TextArea } = Input;

    // Lista de opciones de las categorias
    const obtainCategories = async () => {

        // Llamamos al metodo de lista del servicio de temas
        await CategoryService.List()
            .then(data => {
                if (data.status) {
                    // Aquí se procesan los datos recibidos
                    setListTopic(data.value.map((category: Category) => ({
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
        console.log('Tags updated:', tags);
    }, [tags])

    return (
        <>
            {contextHolder}

            <div className="container mt-5">
                <Row>
                    <Col span={18} push={6}>

                        <Card>
                            {/* Titulo de Lectura */}
                            <h4 className="fw-bold">Title</h4>
                            <Input placeholder="Reading without title" />

                            {/* Descripcion de la lectura */}
                            <div style={{ marginTop: 16 }} className="d-flex">
                                <h4 className="fw-bold">Descripcion</h4>
                                <Tooltip title="Give a description of your reading that motivates people to read it">
                                    <Button style={{ marginLeft: 10 }} shape="circle"><InfoCircleOutlined /></Button>
                                </Tooltip>
                            </div>
                            <TextArea
                                placeholder="Reading description"
                                autoSize={{ minRows: 7, maxRows: 7}}
                            />

                            {/* Categoria de la lectura */}
                            <div style={{ marginTop: 16 }} className="d-flex">
                                <h4 className="fw-bold">Category</h4>
                                <Tooltip title="Tell us... What is the category of your reading?">
                                    <Button style={{ marginLeft: 10 }} shape="circle"><InfoCircleOutlined /></Button>
                                </Tooltip>
                            </div>
                            <Select
                                showSearch
                                placeholder="Select a category"
                                optionFilterProp="label"
                                //onChange={handleCountryChange}
                                options={listTopic}
                                className='w-100'
                            //status={countryError ? 'error' : ''}
                            />

                            {/* Etiquetas de la lectura */}
                            <div style={{ marginTop: 16 }} className="d-flex">
                                <h4 className="fw-bold">Tags</h4>
                                <Tooltip title="Add multiple tags for your reading">
                                    <Button style={{ marginLeft: 10 }} shape="circle"><InfoCircleOutlined /></Button>
                                </Tooltip>
                            </div>
                            <Space.Compact style={{ width: '100%' }}>
                                <Input
                                    placeholder="Add a tag to your reading"
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
                                {tags.length === 0 ? (<div style={{ fontSize: 14.5, marginLeft: 5 }}>No tags added for this reading</div>) : tagChild}
                            </div>

                            {/* Idioma de la lectura */}
                            <div style={{ marginTop: 16 }} className="d-flex">
                                <h4 className="fw-bold">Language</h4>
                                <Tooltip title="What is the language of your reading?">
                                    <Button style={{ marginLeft: 10 }} shape="circle"><InfoCircleOutlined /></Button>
                                </Tooltip>
                            </div>
                            <Select
                                showSearch
                                placeholder="Select a language"
                                optionFilterProp="label"
                                //onChange={handleCountryChange}
                                options={listTopic}
                                className='w-100'
                            //status={countryError ? 'error' : ''}
                            />
                        </Card>
                    </Col>
                    <Col span={6} pull={18}>
                        <Card
                            style={{ width: "90%" }}
                            cover={<img src={imagePlaceholder} />}
                        >
                            <div className="d-flex justify-content-center">
                                <Button>
                                    Add Image
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Card className="mt-4">
                    <h4 className="fw-bold text-center">Reading</h4>
                    <TextArea autoSize={{ minRows: 10 }} />
                    <div className="mt-3 d-flex justify-content-center">
                        <Button type="primary">
                            Save
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default ReadingFormView