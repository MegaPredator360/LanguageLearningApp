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
        <div className="container mb-5">
          <h3 className="text-center my-5">Popular Excersices</h3>

          {/* Ejercicios más populares */}
          <div className="d-flex justify-content-center">
            <Card
              bordered={false}
              style={{ width: 300 }}
              styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' } }}
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
              styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' } }}
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
              styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' } }}
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
              styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' } }}
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
      <div className="bg-white">
        <div className="container mb-5">
          <h3 className="text-center my-5">Popular Readings</h3>

          {/* Lecturas más populares */}
          <div className="d-flex justify-content-center">
            <Card
              style={{ width: 300 }}
              styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' } }}
              hoverable
              className="mx-2"

            >
              {/* Titulo de ejercicio */}
              <div style={{ whiteSpace: 'pre-line', fontSize: '16px', fontWeight: 'bold' }}>
                Introduction to Artificial Intelligence
              </div>
              <Divider />

              {/* Descripcion */}
              <div>
                This reading provides an overview of Artificial Intelligence (AI),
                its history, and its fundamental concepts. It covers the various branches of AI,
                including machine learning, natural language processing, and computer vision,
                and discusses real-world applications and ethical considerations.
              </div>

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
              style={{ width: 300 }}
              styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' } }}
              hoverable
              className="mx-2"
            >
              <div style={{ whiteSpace: 'pre-line', fontSize: '16px', fontWeight: 'bold' }}>
                Fundamentals of Quantum Computing
              </div>
              <Divider />
              <div>
                This reading delves into the basics of quantum computing,
                explaining the principles of quantum mechanics that underpin this technology.
                Key topics include qubits, quantum gates, and quantum algorithms,
                with an exploration of the potential advantages and current limitations of quantum computers.
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
              style={{ width: 300 }}
              styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' } }}
              hoverable
              className="mx-2 d-flex flex-column justify-content-between"
            >
              <div style={{ whiteSpace: 'pre-line', fontSize: '16px', fontWeight: 'bold' }}>
                Climate Change and Environmental Policy
              </div>
              <Divider />
              <div>
                This reading examines the science of climate change, its impacts on the environment,
                and the role of human activities. It also discusses global and national policies aimed
                at mitigating climate change, including international agreements like the Paris
                Agreement and various strategies for reducing greenhouse gas emissions.
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
              style={{ width: 300 }}
              styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' } }}
              hoverable
              className="mx-2"
            >
              <div style={{ whiteSpace: 'pre-line', fontSize: '16px', fontWeight: 'bold' }}>
                Modern Software Development Practices
              </div>
              <Divider />
              <div>
                This reading focuses on contemporary methodologies and tools used in software development.
                Topics include Agile and DevOps practices, version control systems, continuous
                integration/continuous deployment (CI/CD) pipelines, and the importance of testing and code
                quality in creating robust software solutions.
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
      </div >
      <div className="bg-secondary-subtle">
        <div className="container mb-5">
          <h3 className="text-center my-5">Latest Content</h3>

          {/* Contenido màs reciente */}
          <div className="d-flex justify-content-center">
            <Card
              bordered={false}
              style={{ width: 300 }}
              styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' } }}
              hoverable
              className="mx-2"

            >
              {/* Titulo de ejercicio */}
              <div style={{ whiteSpace: 'pre-line', fontSize: '16px', fontWeight: 'bold' }}>
                The History of Ancient Civilizations
              </div>
              <Divider />

              {/* Descripcion */}
              <div>
                This reading explores the major ancient civilizations, including Mesopotamia,
                Egypt, the Indus Valley, and China. It covers their contributions to human culture,
                advancements in technology, governance systems, and their lasting impacts on modern society.
              </div>

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
              styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' } }}
              hoverable
              className="mx-2"
            >
              <div style={{ whiteSpace: 'pre-line', fontSize: '16px', fontWeight: 'bold' }}>
                Clause Identification and Classification
              </div>
              <Divider />
              <div>
                This exercise involves identifying and classifying different types of clauses in a sentence,
                such as independent clauses, dependent clauses, relative clauses, etc.
                This helps in understanding complex sentence structures and the relationships between different parts of a sentence.
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
              styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' } }}
              hoverable
              className="mx-2 d-flex flex-column justify-content-between"
            >
              <div style={{ whiteSpace: 'pre-line', fontSize: '16px', fontWeight: 'bold' }}>
                Neuroscience: Understanding the Brain
              </div>
              <Divider />
              <div>
                This reading introduces the field of neuroscience, focusing on the structure and
                function of the brain and nervous system. Topics include neural communication,
                brain anatomy, cognitive functions, and recent advancements in brain research,
                such as neuroimaging techniques.
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
              styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' } }}
              hoverable
              className="mx-2"
            >
              <div style={{ whiteSpace: 'pre-line', fontSize: '16px', fontWeight: 'bold' }}>
                Verb Tense Consistency
              </div>
              <Divider />
              <div>
                This exercise focuses on ensuring verb tense consistency within a sentence or a paragraph. 
                The task is to identify and correct any verb tense inconsistencies. 
                This helps in maintaining clarity and coherence in writing.
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
      </div >
    </>
  )
}

export default HomeView