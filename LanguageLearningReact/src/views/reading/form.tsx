import { Button, Card, Col, Input, Row, Select, Space, Tag, Tooltip } from "antd"
import { InfoCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useNotification } from '../../components/notification-component';
import CategoryService from "../../services/category-service";
import { Category } from "../../interfaces/category-interface";
import LanguageService from "../../services/language-service";
import { Language } from "../../interfaces/language-interface";
import ReadingService from "../../services/reading-service";
import { Reading } from "../../interfaces/reading-interface";
import { Tags } from "../../interfaces/tags-interface";

// Importacion de Imagen
import imagePlaceholder from "../../assets/images/image-placeholder.jpg"

function ReadingFormView() {

    // Select List
    const [listCategory, setListCategory] = useState([])
    const [listLanguage, setListLanguage] = useState([])

    // Notificacion
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false)

    // Estado para manejar los Tags
    const [tags, setTags] = useState<Tags[]>([]);
    const [tagValue, setTagValue] = useState('');

    // Datos de Formulario
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')
    const [category, setCategory] = useState(0)
    const [language, setLanguage] = useState(0)

    // Formularios Vacios
    const [titleError, setTitleError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [bodyError, setBodyError] = useState(false)
    const [categoryError, setCategoryError] = useState(false)
    const [languageError, setLanguageError] = useState(false)

    // Textarea de un input
    const { TextArea } = Input;

    // Controlar el cambio de texto
    const handleTitleChanges = (e: any) => {
        setTitle(e.target.value);
        setTitleError(false)
    }

    const handleDescriptionChanges = (e: any) => {
        setDescription(e.target.value);
        setDescriptionError(false)
    }

    const handleBodyChanges = (e: any) => {
        setBody(e.target.value);
        setBodyError(false)
    }

    const handleCategoryChanges = (value: number) => {
        setCategory(value);
        setCategoryError(false)
    }

    const handleTagChanges = (e: any) => {
        setTagValue(e.target.value);
    }

    const handleLanguageChanges = (value: number) => {
        setLanguage(value);
        setLanguageError(false)
    }

    // Lista de opciones de las categorias
    const obtainCategories = async () => {

        // Llamamos al metodo de lista del servicio de temas
        await CategoryService.List()
            .then(data => {
                if (data.status) {
                    // Aquí se procesan los datos recibidos
                    setListCategory(data.value.map((item: Category) => ({
                        value: item.id,
                        label: item.name,
                    })));
                }
                else {
                    // Notificacion
                    showNotification('error', 'Error', 'An error ocurred when obtaining the categories');
                    console.error(data.msg);
                }
            })
            .catch(error => {
                // Notificacion
                showNotification('error', 'Error', 'An error ocurred when obtaining the categories');
                console.error(error);
            })
    }

    // Lista de opciones de los idiomas
    const obtainLanguages = async () => {

        // Llamamos al metodo de lista del servicio de temas
        await LanguageService.List()
            .then(data => {
                if (data.status) {
                    // Aquí se procesan los datos recibidos
                    setListLanguage(data.value.map((item: Language) => ({
                        value: item.id,
                        label: item.name,
                    })));
                }
                else {
                    // Notificacion
                    showNotification('error', 'Error', 'An error ocurred when obtaining the languages');
                    console.error(data.msg);
                }
            })
            .catch(error => {
                // Notificacion
                showNotification('error', 'Error', 'An error ocurred when obtaining the languages');
                console.error(error);
            })
    }

    // Función para añadir un nuevo Tag
    const handleAddTag = () => {
        if (tagValue && !tags.some((tag) => tag.name === tagValue)) {
            setTags([...tags, { name: tagValue }]);
            setTagValue(''); // Optionally clear the input after adding
        }
    };

    // Función para eliminar un Tag
    const handleRemoveTag = (removedTagName: string) => {
        const newTags = tags.filter((tag) => tag.name !== removedTagName);
        setTags(newTags);
    };

    // Renderizador de Tags
    const forMap = (tag: Tags) => (
        <span key={tag.name} style={{ display: 'inline-block' }}>
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleRemoveTag(tag.name);
                }}
            >
                {tag.name}
            </Tag>
        </span>
    );

    const tagChild = tags.map(forMap);

    // Verificar campos vacios
    const validateForm = (): Boolean => {

        // Verificador de campo vacio
        let emptyInput: Boolean = false

        // Verificar titulo
        if (title == "") {
            setTitleError(true)
            emptyInput = true
        }

        // Verificar descripcion
        if (description == "") {
            setDescriptionError(true)
            emptyInput = true
        }

        // Verificar cuerpo de lectura
        if (body == "") {
            setBodyError(true)
            emptyInput = true
        }

        // Verificar categoria
        if (category == 0) {
            setCategoryError(true)
            emptyInput = true
        }

        // Verificar idioma
        if (language == 0) {
            setLanguageError(true)
            emptyInput = true
        }

        return emptyInput
    }

    // Guardar lectura
    const submitReading = async () => {

        // Se valida formulario
        if (validateForm()) {

            // Notificacion
            showNotification('error', 'Error', 'There is one or more fields empty');

            return
        }

        // Se activa el icono de carga
        setLoading(true)

        // Se crea objeto
        const reading: Reading = {
            id: 0,
            title: title,
            description: description,
            body: body,
            publish_date: '',
            likes: 0,
            dislikes: 0,
            views: 0,
            user: 0,
            user_username: '',
            language: language,
            language_name: '',
            category: category,
            category_name: '',
            reading_tags: tags
        }

        // Se envia peticion de crear
        await ReadingService.Create(reading)
            .then(data => {
                if (data.status) {

                    // Se desactiva el icono de carga
                    setLoading(false)

                    // Notificacion
                    showNotification('success', 'Success', "The reading has been published successfully!");
                }
                else {
                    // Se desactiva el icono de carga
                    setLoading(false)

                    // Notificacion
                    showNotification('error', 'Error', data.msg);
                }
            })
            .catch(error => {
                // Se desactiva el icono de carga
                setLoading(false)

                // Notificacion
                showNotification('error', 'Error', 'An error ocurred when publishing the reading');
                console.error(error);
            })
    }

    // Inicializamos metodos de carga de datos
    useEffect(() => {
        obtainCategories()
        obtainLanguages()
    }, [tags])

    return (
        <>
            <div className="container mt-5">
                <Row>
                    <Col span={18} push={6}>

                        <Card>
                            {/* Titulo de Lectura */}
                            <h4 className="fw-bold">Title</h4>
                            <Input
                                onChange={handleTitleChanges}
                                value={title}
                                placeholder="Reading title"
                                status={titleError ? 'error' : ''}
                            />

                            {/* Descripcion de la lectura */}
                            <div style={{ marginTop: 16 }} className="d-flex">
                                <h4 className="fw-bold">Descripcion</h4>
                                <Tooltip title="Give a description of your reading that motivates people to read it">
                                    <Button style={{ marginLeft: 10 }} shape="circle"><InfoCircleOutlined /></Button>
                                </Tooltip>
                            </div>
                            <TextArea
                                onChange={handleDescriptionChanges}
                                value={description}
                                placeholder="Reading description"
                                autoSize={{ minRows: 7, maxRows: 7 }}
                                status={descriptionError ? 'error' : ''}
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
                                onChange={handleCategoryChanges}
                                value={category == 0 ? null : category}
                                options={listCategory}
                                className='w-100'
                                status={categoryError ? 'error' : ''}
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
                                    onChange={handleTagChanges}
                                    onPressEnter={handleAddTag}
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
                                onChange={handleLanguageChanges}
                                value={language == 0 ? null : language}
                                options={listLanguage}
                                className='w-100'
                                status={languageError ? 'error' : ''}
                            />
                        </Card>
                    </Col>
                    <Col span={6} pull={18}>
                        <Card
                            style={{ width: "90%" }}
                            cover={<img src={imagePlaceholder} />}
                        >
                            <div className="d-flex justify-content-center">
                                <Button disabled>
                                    Add Image
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Card className="mt-4">
                    <h4 className="fw-bold text-center">Reading</h4>

                    {/* Cuerpo de la lectura */}
                    <TextArea
                        value={body}
                        onChange={handleBodyChanges}
                        autoSize={{ minRows: 10 }}
                        status={bodyError ? 'error' : ''}
                    />

                    <div className="mt-3 d-flex justify-content-center">
                        <Button
                            type="primary"
                            onClick={submitReading}
                            loading={loading}
                        >
                            Save
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default ReadingFormView