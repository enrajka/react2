import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Cart from './Cart';
import CourseArea from './CourseArea';
import CourseInfo from './CourseInfo';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      currCourse: {},
      addedItems: [],
      subjects: []
    };
  }

  componentDidMount() {
    fetch('https://mysqlcs639.cs.wisc.edu:5000/classes').then(
      res => res.json()
    ).then(data => this.setState({allCourses: data, filteredCourses: data, subjects: this.getSubjects(data)}));
  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for(const course of Object.values(data)) {
      if(subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCurrCourse(data) { 
    this.setState({currCourse:data});
  }

  setCourses(courses) {
    this.setState({filteredCourses: courses})
  }

  setCart(data) {
    if (data != null) {
      var currCart = this.state.addedItems;
      currCart.push({data});
//      this.state.addedItems.push({data});
      // console.log("length od added Items: ", this.state.addedItems.length);
      // console.log("the data", this.state.addedItems);
     //this.setState({addedItems: this.addedItems});
     this.setState({addedItems: currCart});
    }
  }

  displayCart() {
    let added = [];
    // console.log("curr cart: ", this.state.addedItems);
    // console.log("curr cart length: ", this.state.addedItems.length);
    
    for (let i = 0; i < this.state.addedItems.length; i++) {
      added.push(
        <Card style={{width: '20rem'}}>
        <Card.Body>
            <Card.Title>{this.state.addedItems[i].data.name}</Card.Title>
            <Card.Subtitle>{this.displayBody(i)}</Card.Subtitle>
        </Card.Body>
        </Card>
      );
    }
    console.log(added);
    return added;
  }

  displayBody(index) {
    let count = 0;
    if (index != null) {
      console.log(this.state.addedItems[index].data.sections);
      for (let s = 0; s < this.state.addedItems[index].data.sections.length; s++) {
        if (this.state.addedItems[index].data.sections[s] != null) {
          count++;
        }
      }
      if (count === this.state.addedItems[index].data.sections.length) {
        return "No Lecture Chosen";
      } else if (count === 1) {
        
      }
    }
  }

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        
       <Tabs defaultActiveKey="courseSearch" id="tabs">
          <Tab eventKey="courseSearch" title="Course Search">
            <Sidebar setCourses={(courses) => this.setCourses(courses)} courses={this.state.allCourses} subjects={this.state.subjects}/>
            <div style={{marginLeft: '20vw'}}>
              <CourseArea data={this.state.filteredCourses} setCurrCourse={(data)=> this.setCurrCourse(data)}/>
            </div>
          </Tab>
          <Tab eventKey="currCourse" title="Course Info">
            <CourseInfo data={this.state.currCourse} setCart={this.setCart.bind(this)}/>
          </Tab>
          <Tab eventKey="cart" title="My Cart">
              <Cart display={this.displayCart()}/>
          </Tab>
        </Tabs>
      </>
    )
  }
}

export default App;
