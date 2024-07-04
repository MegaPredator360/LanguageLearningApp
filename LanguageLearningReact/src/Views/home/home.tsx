import { Divider } from "antd"
import './home.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Card } from 'antd';
import { StarOutlined, EyeOutlined, LikeOutlined, DislikeOutlined } from "@ant-design/icons"


// Importacion de Imagenes
import microsoftLogo from "../../assets/images/sponsors/microsoft-logo.png"
import spacexLogo from "../../assets/images/sponsors/spacex_logo.png"
import dxcLogo from "../../assets/images/sponsors/dxc-logo.png"
import metaLogo from "../../assets/images/sponsors/meta-logo.png"
import shopifyLogo from "../../assets/images/sponsors/shopify-logo.png"
import appleLogo from "../../assets/images/sponsors/apple-logo.png"

function HomeView() {

  // Configuraciones del carousel
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  return (
    <>
      <div style={{ minHeight: '80vh' }} className="container">
        <div style={{ marginTop: '150px' }}>
          <h1 className="fw-bold text-white">
            Welcome to LinguaLearn!
          </h1>
        </div>
        <div style={{ paddingRight: '25%', marginTop: '150px' }}>
          <h1 className="fw-bold text-white">
            The free, fun, and effective way to learn a language with quick and bite-sized lessons,
            you'll be prepared for the real-world communication.
          </h1>
        </div>
        <div style={{ marginTop: '120px' }}>
          <Divider className="border-white" />
          <p style={{ fontSize: '25px' }} className="text-end text-white">
            <b>+125.000</b> MEMBERS
            <br />
            JOIN OUR COMMUNITY!
          </p>
        </div>
      </div>
      <div className="bg-white">

        {/* Carousel de patrocinadores */}
        <div className="my-5 container">
          <h3 className="text-center mb-5">Sponsored by:</h3>
          <Slider {...settings}>
            <div>
              <Card
                style={{ width: 240 }}
                cover={<img alt="example" src={microsoftLogo} />}
              >
                <p className="fw-bold text-center">Microsoft Corporation</p>
              </Card>
            </div>
            <div>
              <Card
                style={{ width: 240 }}
                cover={<img alt="example" src={spacexLogo} />}
              >
                <p className="fw-bold text-center">SpaceX</p>
              </Card>
            </div>
            <div>
              <Card
                style={{ width: 240 }}
                cover={<img alt="example" src={dxcLogo} />}
              >
                <p className="fw-bold text-center">DXC Tecnology</p>
              </Card>
            </div>
            <div>
              <Card
                style={{ width: 240 }}
                cover={<img alt="example" src={metaLogo} />}
              >
                <p className="fw-bold text-center">Meta Platforms, Inc.</p>
              </Card>
            </div>
            <div>
              <Card
                style={{ width: 240 }}
                cover={<img alt="example" src={shopifyLogo} />}
              >
                <p className="fw-bold text-center">Shopify</p>
              </Card>
            </div>
            <div>
              <Card
                style={{ width: 240 }}
                cover={<img alt="example" src={appleLogo} />}
              >
                <p className="fw-bold text-center">Apple, Inc</p>
              </Card>
            </div>
          </Slider>
        </div>
      </div>
      <div className="bg-secondary-subtle">
        <div className="container">
          <h3 className="text-center my-5">Popular Excersices</h3>

          {/* Ejercicios más populares */}
          <div className="d-flex justify-content-center">
            <Card
              bordered={false}
              style={{  width: 300 }}
              styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' }}}
              hoverable
              className="mx-2"
              
            >
              {/* Titulo de ejercicio */}
              <div style={{ whiteSpace: 'pre-line', fontSize: '16px', fontWeight: 'bold' }}>
                Do you know the correct uses of simple past tense?
              </div>
              <Divider />

              {/* Descripcion */}
              <div>An excersice focused on the correct use of the simple past tense</div>

              {/* Detalles del ejercicio */}
              <div className="mt-auto">
                <Divider />

                {/* Creador */}
                <div className="fw-bold">Aaron</div>

                {/* Puntuaciones */}
                <div className="d-flex">
                  <p className="m-0"><StarOutlined /> 5</p>
                  <span className="flex-grow-1 flex-shrink-1 flex-basis-auto"></span>
                  <p className="my-0 mx-2"><EyeOutlined /> 10.5K</p>
                  <p className="my-0 mx-2"><LikeOutlined /> 5.3K</p>
                  <p className="my-0 mx-2"><DislikeOutlined /> 76</p>
                </div>
              </div>
            </Card>
            <Card
              bordered={false}
              style={{ width: 300 }}
              styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' }}}
              hoverable
              className="mx-2"
            >
              <div style={{ whiteSpace: 'pre-line', fontSize: '16px', fontWeight: 'bold' }}>
                Sentence Correction
              </div>
              <Divider />
              <div>
                This exercise involves presenting a sentence with grammatical errors.
                The task is to identify and correct these errors.
                Errors can include issues with verb tense, subject-verb agreement, punctuation, and word order.
              </div>
              <div className="mt-auto">
                <Divider />

                {/* Creador */}
                <div className="fw-bold">Veronica</div>

                {/* Puntuaciones */}
                <div className="d-flex">
                  <p className="m-0"><StarOutlined /> 5</p>
                  <span className="flex-grow-1 flex-shrink-1 flex-basis-auto"></span>
                  <p className="my-0 mx-2"><EyeOutlined /> 10.5K</p>
                  <p className="my-0 mx-2"><LikeOutlined /> 5.3K</p>
                  <p className="my-0 mx-2"><DislikeOutlined /> 76</p>
                </div>
              </div>
            </Card>
            <Card
              bordered={false}
              style={{ width: 300 }}
              styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' }}}
              hoverable
              className="mx-2 d-flex flex-column justify-content-between"
            >
              <div style={{ whiteSpace: 'pre-line', fontSize: '16px', fontWeight: 'bold' }}>
                Parts of Speech Identification
              </div>
              <Divider />
              <div>
                In this exercise, a sentence is provided, and the task is to identify
                and label the parts of speech for each word. This helps in understanding
                how different words function within a sentence.
              </div>
              <div className="mt-auto">
                <Divider />

                {/* Creador */}
                <div className="fw-bold">Edgar</div>

                {/* Puntuaciones */}
                <div className="d-flex">
                  <p className="m-0"><StarOutlined /> 5</p>
                  <span className="flex-grow-1 flex-shrink-1 flex-basis-auto"></span>
                  <p className="my-0 mx-2"><EyeOutlined /> 10.5K</p>
                  <p className="my-0 mx-2"><LikeOutlined /> 5.3K</p>
                  <p className="my-0 mx-2"><DislikeOutlined /> 76</p>
                </div>
              </div>
            </Card>
            <Card
              bordered={false}
              style={{ width: 300 }}
              styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' }}}
              hoverable
              className="mx-2"
            >
              <div style={{ whiteSpace: 'pre-line', fontSize: '16px', fontWeight: 'bold' }}>
                Passive and Active Voice Transformation
              </div>
              <Divider />
              <div>
                This exercise involves converting sentences from passive voice to active voice
                and vice versa. It helps in understanding sentence structure and the emphasis
                different voices provide.
              </div>
              <div className="mt-auto">
                <Divider />

                {/* Creador */}
                <div className="fw-bold">Daniel</div>

                {/* Puntuaciones */}
                <div className="d-flex">
                  <p className="m-0"><StarOutlined /> 5</p>
                  <span className="flex-grow-1 flex-shrink-1 flex-basis-auto"></span>
                  <p className="my-0 mx-2"><EyeOutlined /> 10.5K</p>
                  <p className="my-0 mx-2"><LikeOutlined /> 5.3K</p>
                  <p className="my-0 mx-2"><DislikeOutlined /> 76</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeView