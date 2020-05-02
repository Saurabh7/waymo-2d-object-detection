import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Loader from 'react-loader'

class XRayComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {loading: false, file: null, result: null}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleUpload = this.handleUpload.bind(this)
	}
	fileUpload(file) {
		const formData = new FormData();
    formData.append('file',file)
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return axios.post('/api/upload_and_predict', formData, config)
	}
	handleSubmit(event) {
		const { file } = this.state
		this.setState({loading: true})
		event.preventDefault()
		this.fileUpload(file)
			.then(res => {
				console.log(res)
				this.setState({loading: false, result: parseFloat(res.data.result)})
			})
			.catch(res => {
				console.log(res)
			})
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
		return <div>
			{ loading && <Loader /> }
			<div className="banner-heading">
				<h1 className="ppt-blue">
					X-Ray Analysis
				</h1>
				<h3>
					Upload you Chest X-Ray and get a likelihood of infection based on our Machine Learning model.
				</h3>
			</div>
			<div className="row justify-content-md-center file-input">
					<div className="col-md-4">
						<Form onSubmit={this.handleSubmit}>
								<Form.File 
									id="file"
									label={file ? file.name : "Please select a file"}
									custom
									onChange={this.handleUpload}
								/>
								<Button variant="primary" type="submit">
									Submit
								</Button>
						</Form>
					</div>
			</div>
			{ result && this.showResult() }
		</div>
	}
}

export default XRayComponent
