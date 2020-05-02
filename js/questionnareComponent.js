import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Loader from 'react-loader'

class questionnareComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {loading: false, file: null, result: null}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleUpload = this.handleUpload.bind(this)
	}
	handleSubmit(file) {
		const formData = new FormData();
    formData.append('file',file)
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return axios.post('/questionnare/form', formData, config)
	}
	handleUpload(event) {
		console.log(event.target.files)
		this.setState({file: event.target.files[0]})
	}
	showResult() {
		const { result } = this.state
		let variant, message
		if (result < 0.9) {
			variant = 'success'
			message = 'There is a low chance you have COVID-19'
		} else {
			variant = 'danger'
			message = 'There is a high chance you have COVID-19. Please contact a health care professional.'
		}
		return <div className="row justify-content-md-center file-input">
			<div className="banner-heading">
				<Alert variant={variant}>
					{message}
				</Alert>
			</div>
		</div>
	}
	render() {
		const { loading, file, result } = this.state
		return <div className="row justify-content-md-center file-input"> <Form noValidate onSubmit={this.handleSubmit}>
	Please answer to self-diagnose and log your metrics.
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>What is your heart rate (bpm)?</Form.Label>
    <Form.Control type="textarea" rows="2" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>What is your temperature(°C)?</Form.Label>
    <Form.Control type="textarea" rows="2" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect2">
    <Form.Label>Have you noticed any of the symptoms below?</Form.Label>
    <Form.Control as="select" multiple>
      <option>Fever</option>
      <option>Cough</option>
      <option>Shortness of breath or difficulty breathing</option>
      <option>Chills</option>
      <option>Muscle pain</option>
      <option>Headache</option>
      <option>Sore throat</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Have you tested for COVID-19</Form.Label>
    <Form.Control as="select">
      <option>Not tested</option>
      <option>Tested Positive</option>
      <option>Tested Negative</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>List of places you have visited in last 7 days ( Separated by new line )</Form.Label>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form> </div>
	}
}

export default questionnareComponent
