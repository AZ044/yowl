import React, { useState } from "react";
import "./App.css";
import { Card, Button, Modal, Form, Input, Space, message } from "antd";
import {
  CloseCircleFilled,
  LoginOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Color } from "antd/es/color-picker";

function App() {
  const [Login, ModalOpen] = useState(false);
  const [Register, OtherModal] = useState(false);
  const ShowModal = () => {
    ModalOpen(true);
    OtherModal(false);
  };

  const handleCancel = () => {
    ModalOpen(false);
  };

  const ShowModalRegister = () => {
    OtherModal(true);
    ModalOpen(false);
  };

  const Cancel = () => {
    OtherModal(false);
  };

  const [passwordVisible, SetpasswordVisible] = React.useState(false);

  const [isLogginIn, setIsLoggedIn] = useState(localStorage.getItem("authToken") ? true : false);
  
  const onFinish = (values) => {  
    /*let data = {email: values.Email, password: values.Password}
    let url = "login";
    if (values.Username) {
      data["pseudo"] = values.Username;
      url = "register";
      
    } */
    
      const response = fetch(`http://127.0.0.1:3001/${values.Username ? "register" : "login"}` , {
        headers: {
          "content-Type": "application/json"
        },

        method: "POST",
        body: JSON.stringify({email: values.Email , pseudo: values.Username ? values.Username : undefined, password: values.Password})
      })
  .then(response => response.json())
  .then ((data) => {
    if (data.token){
      localStorage.setItem("authToken", data.token);
      setIsLoggedIn(true)
      handleCancel()
      Cancel()
      message.success(`you are connected`)
    
    }
    else {
      message.error("login error")
    }
  })
  .catch(() => {
      message.error("Erreur login")
  })

}

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setIsLoggedIn(false)
    message.success("you are disconnected!")
   
  }



  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  

  return (
    <div className="App">
      <header className="App-header">
        {isLogginIn ? <Button  id = "log_out" type="primary"   onClick={handleLogout} className="Button">
        <LoginOutlined></LoginOutlined> Log out
      </Button> :       
      <Button type="primary" id = "login" onClick={ShowModal} className="Button">
        <LoginOutlined></LoginOutlined> Login
      </Button>}
      </header>
      <h1>Welcome to 5CHAN</h1>
      

      <Modal
        className="Modal"
        title="Login Page"
        open={Login}
        onCancel={handleCancel}
      >
        <Space vertical>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item type="email" label="Email" name="Email" required>
              <Input type="email" placeholder="Enter your email" required />
            </Form.Item>

            <Form.Item
              type="password"
              label="Password"
              name="Password"
              required
            >
              <Input.Password
                placeholder="Enter your password"
                required
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item label={null}>
              <Button className="Button" type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
            <Button type="text" onClick={ShowModalRegister}>
              Register
            </Button>
          </Form>
        </Space>
      </Modal>
      <Modal
        className="Modal"
        title="Register Page"
        open={Register}
        onCancel={Cancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item type="email" label="Email" name="Email" required>
            <Input type="email" placeholder="Enter your email" required />
          </Form.Item>

          <Form.Item type="text" label="Username" name="Username" required>
            <Input placeholder="Enter your Username" required />
          </Form.Item>
          <Form.Item label="Password" name="Password" required>
            <Input.Password
              placeholder="Choose your password"
              required
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button className="Button" type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <Button type="text" onClick={ShowModal}>
            Login
          </Button>
        </Form>
      </Modal>

      <p>Select board to get started</p>
      <div  className="home">
        <Card className="home_card" onClick={() => window.location.href="/threadlist"}> 
          <h2> /cat/ - Cats</h2>
          <p> Cute Cats and feline discussion </p>
        </Card>
        <Card className="home_card">
          <h2>/garden/ - Gardening</h2>
          <p>Gardening tips and tricks</p>
        </Card>

        <Card className="home_card">
          <h2>/flr/ - Flowers</h2>
          <p>Beatiful flowers and botany</p>
        </Card>
        <Card className="home_card">
          <h2>/meme - Cat & Flower Memes</h2>
          <p>Dank cat and flower memes</p>
        </Card>
      </div>
      <Card id="home_card">
        <h3>What is 5CHAN?</h3>
        <p>
          5CHAN is a sample imageboard where anyone can post comments and share
          images about cats and flowers. All posts are made anonymously. Please
          read the rules before
        </p>
        <p>postings.</p>
      </Card>
      <Card id="Rules">
        <h3>
          {" "}
          <CloseCircleFilled id="test"></CloseCircleFilled>Rules of 5CHAN
        </h3>
        <p>Be respectful</p>
        <p>No posting of mean comments about felines or flora</p>
        <p>Keep discussions on topic</p>
        <p>Have fun and share your passion!</p>
      </Card>
    </div>
  );
}

export default App;
