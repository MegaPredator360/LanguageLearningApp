import { Button, Card, Col, Input, Row, Tooltip } from "antd"
import { InfoCircleOutlined } from '@ant-design/icons';

function ReadingFormView() {

    const { TextArea } = Input;

    return (
        <>
            <div className="container mt-5">
                <Row>
                    <Col span={18} push={6}>

                        <Card>
                            <h4 className="fw-bold">Title</h4>
                            <Input placeholder="Reading without title" />
                            <div style={{ marginTop: 16 }} className="d-flex">
                                <h4 className="fw-bold">Descripcion</h4>
                                <Tooltip title="Give a description of your reading that motivates people to read it">
                                    <Button style={{ marginLeft: 10 }} shape="circle"><InfoCircleOutlined /></Button>
                                </Tooltip>
                            </div>
                            <TextArea rows={7} />
                            <div style={{ marginTop: 16 }} className="d-flex">
                                <h4 className="fw-bold">Topic</h4>
                                <Tooltip title="Tell us... What is the topic of your reading?">
                                    <Button style={{ marginLeft: 10 }} shape="circle"><InfoCircleOutlined /></Button>
                                </Tooltip>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6} pull={18}>
                        <Card
                            hoverable
                            style={{ width: "90%" }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <p>Imagen</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ReadingFormView