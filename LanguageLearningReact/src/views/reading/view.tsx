import { Button, Card, Divider, Input, Select, Space, Tag } from "antd"
import { LikeOutlined, DislikeOutlined, StarOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

// Importar imagen
import defaultUser from '../../assets/images/default-user.jpg'
import { Reading } from "../../interfaces/reading-interface";
import { useEffect, useState } from "react";
import { Tags } from "../../interfaces/tags-interface";
import utilityService from "../../services/utility-service";
import { useNotification } from "../../components/notification-component";
import { ReadingReview } from "../../interfaces/reading-review-interface";
import readingReviewService from "../../services/reading-review-service";

function ReadingView() {

  // Estado de carga
  const [loading, setLoading] = useState(false)

  // Notificacion
  const { showNotification } = useNotification();

  // Navegador de paginas
  const navigate = useNavigate()

  // Obtener usuario
  const [token, setToken] = useState<string>("")

  // Listas de Etiquetas y Comentario
  const [tags, setTags] = useState<Tags[]>([]);

  // Obtener datos de state
  const location = useLocation();
  const reading: Reading = location.state || {};

  // Cargar etiquetas
  const obtainTags = () => {
    setTags(reading.reading_tags)
  }

  // Formulario de Comentarios
  const [comment, setComment] = useState<string>("")
  const [rate, setRate] = useState<number>(0)

  // Error en input
  const [commentError, setCommentError] = useState<boolean>(false)
  const [rateError, setRateError] = useState<boolean>(false)

  // Funciones de cambio
  const handleCommentChanges = (e: any) => {
    setComment(e.target.value);
    setCommentError(false)
  }

  const handleRateChanges = (value: number) => {
    setRate(value);
    setRateError(false)
  }

  const checkLogged = async () => {
    setToken(utilityService.obtenerSesion())
  }

  const verifyFields = (): boolean => {
    let emptyField = false;

    if (comment == "") {
      setCommentError(true)
      emptyField = true
    }

    if (rate == 0) {
      setRateError(true)
      emptyField = true
    }

    return emptyField
  }

  // Se utiliza para mapear las etiquetas
  const forMap = (tag: Tags) => (
    <span key={tag.name} style={{ display: 'inline-block' }}>
      <Tag>
        {tag.name}
      </Tag>
    </span>
  );

  const makeComment = async () => {

    // Se revisa si el usuario tiene la sesion iniciada
    setToken(utilityService.obtenerSesion())

    // Si la sesion está iniciada
    if (token == "") {

      // Mensaje de notificacion
      showNotification('error', 'Error', "You are not logged in, you must log in to make a comment!");

      return;
    }

    // Se verifica que no existan campos vacios
    if (verifyFields()) {

      // Mensaje de notificacion
      showNotification('error', 'Error', "There are one or more fields empty!");

      return;
    }

    setLoading(true)

    // Se crea objeto de comentario
    const readingReview: ReadingReview = {
      id: 0,
      reading: reading.id,
      user: 0,
      user_username: "",
      comment: comment,
      publish_date: "",
      user_rate: rate,
      jwt: token
    }

    // Se realiza peticion
    await readingReviewService.Create(readingReview)
      .then(data => {
        if (data.status) {
          // Notificacion
          showNotification('success', 'Success', 'The comment has been posted successfully');
          setLoading(false)

        }
        else {
          // Notificacion
          showNotification('error', 'Error', 'An error ocurred when posting the comment');
          setLoading(false)
          console.error(data.msg);
        }
      })
      .catch(error => {
        // Notificacion
        showNotification('error', 'Error', 'An error ocurred when posting the comment');
        setLoading(false)
        console.error(error);
      })
  }

  const tagChild = tags.map(forMap);

  // Textarea de un input
  const { TextArea } = Input;

  // Inicializamos metodos de carga de datos
  useEffect(() => {
    obtainTags()
    checkLogged()
  }, [tags])

  return (
    <>
      <div className="container">
        <Card className="mt-5">
          <h3>{reading.title}</h3>
          <h5>{reading.description}</h5>
          <h6 className="mt-4"><b>Published by:</b> {reading.user_username}</h6>
          <div className="d-flex">
            <h6 className="pt-1">{reading.views} views</h6>
            <span className="flex-grow-1 flex-shrink-1 flex-basis-auto"></span>
            <Space.Compact>
              <Button><LikeOutlined /> {reading.likes}</Button>
              <Button><DislikeOutlined /> {reading.dislikes}</Button>
              <Button><StarOutlined /> 5</Button>
            </Space.Compact>
          </div>
          <h6><b>Category:</b> {reading.category_name}</h6>
          {reading.reading_tags.length == 0 ? (<h6><b>This reading has no tags</b></h6>) : (<h6><b>Tags:</b> {tagChild}</h6>)}
          <Divider />
          <p>{reading.body}</p>
          <Divider />
          <h4>Comments</h4>

          { // Escribir comentario
            token == "" ?
              (
                <Card className="shadow-sm mb-3">
                  <div className="d-flex">
                    <img src={defaultUser} className="rounded-circle" style={{ width: '50px', height: '50px' }} />
                    <div className=" ps-3">
                      <p>You must <a className=" text-decoration-underline" onClick={() => navigate('/login')}>Log In</a> to leave a comment!</p>
                    </div>
                  </div>
                </Card>
              )
              :
              (
                <Card className="shadow-sm mb-3">
                  <div className="d-flex">
                    <img src={defaultUser} className="rounded-circle" style={{ width: '50px', height: '50px' }} />
                    <div className="ps-3 w-100">
                      <b>Write a comment</b>
                      <br />
                      <Space.Compact className="mt-2">
                        <Button><StarOutlined /></Button>
                        <Select
                          style={{ width: 55 }}
                          options={[
                            { value: 1, label: '1' },
                            { value: 2, label: '2' },
                            { value: 3, label: '3' },
                            { value: 4, label: '4' },
                            { value: 5, label: '5' },
                          ]}
                          status={rateError ? 'error' : ''}
                          onChange={handleRateChanges}
                          value={rate == 0 ? undefined : rate}
                        />
                      </Space.Compact>
                      <TextArea
                        className="mt-2 w-100"
                        autoSize
                        placeholder="Write a Comment!!"
                        onChange={handleCommentChanges}
                        value={comment}
                        status={commentError ? 'error' : ''}
                      />
                      <div className="mt-2">
                        <Button
                          className="me-2"
                          disabled={comment == "" ? true : false}
                          onClick={() => setComment("")}
                        >
                          Cancel</Button>
                        <Button
                          type="primary"
                          onClick={() => makeComment()}
                          loading={loading}
                        >Comment</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
          }

          <Card className="shadow-sm mb-3">
            <div style={{ paddingLeft: '50px' }}>
              <div className=" ps-3">
                <p>This reading has no comments!</p>
              </div>
            </div>
          </Card>

          {/* Lista de comentarios */}
          <Card className="shadow-sm mb-3">
            <div className="d-flex">
              <img src={defaultUser} className="rounded-circle" style={{ width: '50px', height: '50px' }} />
              <div className=" ps-3">
                <b>Nombre de Usuario</b>
                <div className="text-muted"><StarOutlined /> Calificacion de Usuario</div>
                <div className="text-muted">Fecha de Calificacion</div>
                <p>Comentario</p>
                <Space.Compact>
                  <Button><LikeOutlined /> 20</Button>
                  <Button><DislikeOutlined /> 2</Button>
                </Space.Compact>
              </div>
            </div>
          </Card>
        </Card>
      </div>
    </>
  )
}

export default ReadingView