import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

class HomeComponent extends React.Component {
	render() {
		return <div>
			<div className="banner-heading">
				<h1 className="ppt-blue">
					COVID-Net
				</h1>
				<h3>
					A social platform that leverages crowdsourced data for self-diagnosis and insights before attending a healthcare facility.
				</h3>
				<h4>
					We use data provided by users to provide insights about community spread and risk of infection.
				</h4>
				<h4>
					Use the Questionnare to self-diagnose yourself and help us generate crucial insights.
				</h4>
				<h4>
					You can also upload you Chest X-Ray and get a likelihood of infection based on our Machine Learning model.
				</h4>
			</div>
			<div className="home-buttons">
				<div className="row justify-content-md-center">
					<div className="col-md-auto">
						<Link to="/questionnare">
							<Button>
								Self Diagnose for COVID-19 Symptoms
							</Button>
						</Link>
					</div>
					<div className="col-md-auto">
						<Link to="/xray">
							<Button>
								X-Ray
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	}
}

export default HomeComponent
