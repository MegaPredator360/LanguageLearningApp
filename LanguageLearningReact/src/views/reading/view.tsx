import { Button, Card, Divider, Input, Select, Space, Tag } from "antd"
import { LikeOutlined, DislikeOutlined, StarOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

// Importar imagen
import defaultUser from '../../assets/images/default-user.jpg'
import { Reading } from "../../interfaces/reading-interface";
import { useEffect, useState } from "react";
import { Tags } from "../../interfaces/tags-interface";

function ReadingView() {

  // Etiquetas
  const [tags, setTags] = useState<Tags[]>([]);

  // Obtener datos de state
  const location = useLocation();
  const reading: Reading = location.state || {};

  // Cargar etiquetas
  const obtainTags = () => {
    setTags(reading.reading_tags)
  }

  const forMap = (tag: Tags) => (
    <span key={tag.name} style={{ display: 'inline-block' }}>
      <Tag>
        {tag.name}
      </Tag>
    </span>
  );

  const tagChild = tags.map(forMap);

  // Textarea de un input
  const { TextArea } = Input;

  // Inicializamos metodos de carga de datos
  useEffect(() => {
    obtainTags()
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

          {/* Escribir comentario */}
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
                  />
                </Space.Compact>
                <TextArea
                  className="mt-2 w-100"
                  autoSize
                  placeholder="Write a Comment!!"
                />
                <div className="mt-2">
                  <Button className="me-2">Cancel</Button>
                  <Button type="primary" >Comment</Button>
                </div>
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