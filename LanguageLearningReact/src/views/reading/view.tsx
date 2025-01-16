import { Button, Card, Divider, Input, Select, Space, Tag } from "antd"
import { LikeOutlined, DislikeOutlined, StarOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Reading } from "../../interfaces/reading-interface";
import { useEffect, useState } from "react";
import { Tags } from "../../interfaces/tags-interface";
import userService from "../../services/user-service";
import { useNotification } from "../../components/notification-component";
import { ReadingReview } from "../../interfaces/reading-review-interface";
import readingReviewService from "../../services/reading-review-service";
import moment from 'moment';

// Importar imagen
import defaultUser from '../../assets/images/default-user.jpg'

function ReadingView() {

  // Estado de carga
  const [loading, setLoading] = useState(false)

  // Notificacion
  const { showNotification } = useNotification();

  // Navegador de paginas
  const navigate = useNavigate()

  // Listas de Etiquetas y Comentario
  const [tags, setTags] = useState<Tags[]>([]);
  const [commentList, setCommentList] = useState<ReadingReview[]>([])

  // Obtener datos de state
  const location = useLocation();
  const reading: Reading = location.state || {};

  // Verificar si hay un usuario con la sesion iniciada
  const [loggedUser, setLoggedUser] = useState<boolean>(false);

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

  // Verificar si hay una sesion iniciada
  const verifyLoggedUser = async () => {

    // Se realiza peticion a la API para verificar la sesion
    await userService.Logged()
      .then(data => {
        if (data.status) {

          // Se verifica si hay sesion
          if (data.value == null) {
            setLoggedUser(false)
          }
          else {
            setLoggedUser(true)
          }
        }
        else {
          // Notificacion
          showNotification('error', 'Error', data.msg);
        }
      })
      .catch(error => {
        // Notificacion
        showNotification('error', 'Error', "An error ocurred when getting the logged user");
        console.error(error);
      })
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
  const mapTags = (tag: Tags) => (
    <span key={tag.name} style={{ display: 'inline-block' }}>
      <Tag>
        {tag.name}
      </Tag>
    </span>
  );

  // Se utiliza para mapear las etiquetas
  const mapComments = (review: ReadingReview) => (
    <span key={review.id}>
      <Card className="shadow-sm mb-3">
        <div className="d-flex">
          <img src={defaultUser} className="rounded-circle" style={{ width: '50px', height: '50px' }} />
          <div className=" ps-3">
            <div className="d-flex">
              <b>{review.user_username}</b>
              <div className="text-muted ps-3"><StarOutlined /> {review.user_rate}</div>
            </div>
            <div className="text-muted">{moment(review.publish_date).format('DD/MM/YYYY hh:mm A')}</div>
            <p>{review.comment}</p>
            <Space.Compact>
              <Button><LikeOutlined /> 20</Button>
              <Button><DislikeOutlined /> 2</Button>
            </Space.Compact>
          </div>
        </div>
      </Card>
    </span>
  );

  const updateCommentList = async () => {

    // Se realiza la peticion
    await readingReviewService.List(reading.id)
      .then(data => {
        if (data.status) {
          // Actualizar lista de comentarios
          setCommentList(data.value)

        }
        else {
          // Notificacion
          showNotification('error', 'Error', 'An error ocurred when obtaining the updated list of comments');
          console.error(data.msg);
        }
      })
      .catch(error => {
        // Notificacion
        showNotification('error', 'Error', 'An error ocurred when obtaining the updated list of comments');
        console.error(error);
      })
  }

  const makeComment = async () => {

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
      user_rate: rate
    }

    // Se realiza peticion
    await readingReviewService.Create(readingReview)
      .then(data => {
        if (data.status) {
          // Notificacion
          showNotification('success', 'Success', 'The comment has been posted successfully');
          updateCommentList()
          setLoading(false)

        }
        else {
          // Notificacion
          showNotification('error', 'Error', data.msg);
          setLoading(false)
        }
      })
      .catch(error => {
        // Notificacion
        showNotification('error', 'Error', 'An error ocurred when posting the comment');
        setLoading(false)
        console.error(error);
      })
  }

  const tagChild = tags.map(mapTags);
  const commentChild = commentList.map(mapComments);

  // Textarea de un input
  const { TextArea } = Input;

  // Inicializamos metodos de carga de datos
  useEffect(() => {
    obtainTags()
    updateCommentList()
    verifyLoggedUser()
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
            loggedUser == false ?
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

          { // Lista de Comentarios
            commentList.length == 0 ?
              (
                <Card className="shadow-sm mb-3">
                  <div style={{ paddingLeft: '50px' }}>
                    <div className=" ps-3">
                      <p>This reading has no comments!</p>
                    </div>
                  </div>
                </Card>
              )
              :
              commentChild
          }

        </Card>
      </div>
    </>
  )
}

export default ReadingView