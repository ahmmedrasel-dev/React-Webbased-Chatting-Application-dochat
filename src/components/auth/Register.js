import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Form, Segment, Header, Icon, Message, Image } from 'semantic-ui-react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, getDatabase, ref, set } from '../../firebaseconfig';

export class Register extends Component {

  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMsg: "",
    successMsg: "",
    loading: false,
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // Form Validation Start From Here.
  isFieldEmpty = ({ name, email, password, confirmPassword }) => {
    if (!name.length || !email.length || !password.length || !confirmPassword) {
      this.setState({ errorMsg: "Fill the all field" });
    } else if (password.length <= 8 || confirmPassword.length <= 8) {
      this.setState({ errorMsg: "Password Length Should be at least 8." });
    } else if (password !== confirmPassword) {
      this.setState({ errorMsg: "Password does not match." })
    } else {
      return true;
    }
  }

  handelSubmit = (e) => {
    e.preventDefault();
    if (this.isFieldEmpty(this.state)) {
      const auth = getAuth();
      this.setState({ loading: true })
      createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then((userCredential) => {

          updateProfile(getAuth().currentUser, {
            displayName: this.state.name
          })
            .then(() => {
              // Display Name Set hobar por Realtime database a userCredential gulo insertUserDb() dia data insert kora hoichy.
              this.insertUserDb(userCredential)
            })
            .then(() => {
              // Jokhon Account Create hobe all field gulo clear hoye jabe and success message show korbe.
              this.setState({ name: "" })
              this.setState({ email: "" })
              this.setState({ password: "" })
              this.setState({ confirmPassword: "" })
              this.setState({ errorMsg: "" })
              this.setState({ successMsg: "Account Created Successfully." })
              this.setState({ loading: false })
            })
            .catch((error) => {
              this.setState({ loading: false })
              const errorCode = error.code;
              if (errorCode) {
                this.setState({ errorMsg: "User name not valied." });
              }
            })

        })
        .catch((error) => {
          this.setState({ loading: false })
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode.includes('email')) {
            this.setState({ errorMsg: "This email already in use." });
          }

        })
    }

  }

  /*
   user inster korar function aiteke handle submit funtion er vitre call kora hoyechy and classer viore kono funcion er vitore onno akti funtion call korle this keyword use korete hoy insertUserDb() er vore user holo parameter jeti handlesubmit() function er vitore call kore usercredention  argument pass kora hoichy.
  */
  insertUserDb(user) {
    const db = getDatabase();
    set(ref(db, 'users/' + user.user.uid), {
      username: this.state.name,
    });
  }


  render() {
    /*
      Akhane amra state object theke protiti property ke distracuring kore diachy return er vitore just name gulo use kora hobe..
    */
    const { name, email, password, confirmPassword, errorMsg, successMsg, loading } = this.state;

    return (
      <Grid centered style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as='h2' icon textAlign='center' style={{ color: '#14c0cc' }}>
            <Icon name='talk' circular />
            <Header.Content>Let's Join In Dochat</Header.Content>
          </Header>

          <Segment stacked>
            {/* Display Error Message */}
            {errorMsg ? <Message negative> <Message.Header>{errorMsg}</Message.Header>
            </Message> : ""}

            {/* Display Success Message. */}
            {successMsg ? <Message positive> <Message.Header>{successMsg}</Message.Header>
            </Message> : ""}
            <Form>
              <Form.Field className={errorMsg.includes('field') ? "error" : ""}>
                <label><Icon name='user' />User Name</label>
                <input name="name" placeholder='Your Name' type="text" onChange={this.handleChange} value={name} />
              </Form.Field>

              <Form.Field className={errorMsg.includes('field') ? "error" : ""}>
                <label><Icon name='mail' />E-mail Address</label>
                <input name="email" placeholder='Your Valid E-mail' type="email" onChange={this.handleChange} value={email} />
              </Form.Field>

              <Form.Field className={errorMsg.includes('Password', 'field') ? "error" : ""}>
                <label><Icon name='shield alternate' />Password</label>
                <input name="password" placeholder='Password' type="password" onChange={this.handleChange} value={password} />
              </Form.Field>

              <Form.Field className={errorMsg.includes('Password') ? "error" : ""}>
                <label><Icon name='shield alternate' />Confirm Password</label>
                <input name="confirmPassword" placeholder='Conformation Password' type="password" onChange={this.handleChange} value={confirmPassword} />

              </Form.Field>
              <Button className={loading ? "loading disabled" : ""} onClick={this.handelSubmit} type='submit' fluid style={{ background: '#14c0cc', color: '#fff' }}>Register</Button>
            </Form>
          </Segment>
          <Message>
            <Message.Header style={{ textAlign: "center" }}>Already have an account? <Link to="/login"> Sign in</Link>.</Message.Header>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Register
