import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Course extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{width: '33%', marginTop: '5px', marginBottom: '5px'}}>
        <Card.Body>
          <Card.Title>{this.props.data.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.data.number} - {this.getCredits()}</Card.Subtitle>
          <Button variant="primary" onClick={()=> this.sendInfo()}>button</Button>
        </Card.Body>
      </Card>
    )
  }

  sendInfo(element) {
    this.props.setCurrCourse(this.props.data);
 }

  getCredits() {
    if(this.props.data.credits === 1)
      return '1 credit';
    else
      return this.props.data.credits + ' credits';
  }
}

export default Course;
