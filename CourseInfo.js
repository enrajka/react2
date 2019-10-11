import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

class CourseInfo extends React.Component {
    constructor(props) {
        super(props);

    }
    
    getListG() {
        let listG = [];
        //console.log(this.props.data.sections);
        if (this.props.data.sections != undefined) {
            let sec = Object.keys(this.props.data.sections);
            let secBody = Object.values(this.props.data.sections);
            for (var i = 0; i < sec.length; i++) {
                listG.push(<Card><Accordion.Toggle as={Card.Header} eventKey={i}>{sec[i]}</Accordion.Toggle><Accordion.Collapse eventKey={i}><Card.Body>{this.getBody(secBody[i])}<Card.Text>{this.getTimes(secBody[i])}</Card.Text>{this.getButton(sec[i])} {this.getTagS(sec[i],secBody[i])}</Card.Body></Accordion.Collapse></Card>);
            }
            return listG;
        } 
        return "";
    }

    getSubTitle () {
        if (this.props.data.sections != undefined) {
            return this.props.data.number + " : " + this.props.data.credits + " credits";
        } 
        return "";
    }

    getBody (data) {
        var s = data.instructor + " : " + data.location;
        return s;
    }

    getButton (element) {
        
        return <Button className="addToCart" onClick={()=>this.getJustSection(element)}>Add To Cart</Button>;
    }

    getHButton (element) {
        return <Button className="addToCart" onClick={()=>this.addToCart(element)}>Add To Cart</Button>;
    }

    getSButton (name,data,element) {
       return <Button className="addToCart" onClick={()=>this.getJustSSection(name,data,element)}>Add To Cart</Button>;
    }

    getJustSSection(name,data,element) {
        if (this.props.data.sections != undefined) {
            var clone = JSON.parse(JSON.stringify(this.props.data));
            var sec = Object.entries(clone.sections);
            var copy = sec;
            //console.log("the copy: ", copy);
             for (var s = 0; s < sec.length; s++) {
                 if (copy[s][0] !== name) {
                     delete copy[s];
                 }
             }
             var count = 0;
             var index = -1;
             for (var x = 0; x < sec.length; x++) {
                 if (copy[x] == null) {
                    count++;
                 } else {
                     index = x;
                 }
             }
             if (count !== sec.length){
                 //now i am in the specific lecture
                clone.sections = copy;
                //console.log("this is clone i look for",clone);
                
                var allSubs = clone.sections[index][1].subsections;
                //console.log("this is subsections i choose", allSubs);

                var subs = Object.entries(allSubs);
                for (var e = 0; e < subs.length; e++) {
                    if(subs[e][0] !==element[0]){
                        delete subs[e];
                    }
                }
            //    console.log("after deleting subs", subs);
             var count2 = 0;
             for (var x = 0; x < allSubs.length; x++) {
                 if (subs[x] == null) {
                    count2++;
                 }
             }
             if (count2 !== allSubs.length){
                clone.sections[index][1].subsections = subs;
                //console.log("NOW DIS SHOWS", clone);
             }

                this.addToCart(clone);
             } else {
                this.addToCart(null);
             }
            }
    }


    getJustSection(element) {
        if (this.props.data.sections != undefined) {
            var clone = JSON.parse(JSON.stringify(this.props.data));
            var secc = Object.entries(clone.sections);
            var copy = secc;
             for (var s = 0; s < secc.length; s++) {
                 if (copy[s][0] !== element) {
                     delete copy[s];
                 }
             }
             var count = 0;
             for (var x = 0; x < secc.length; x++) {
                 if (copy[x] == null) {
                    count++;
                 }
             }
             if (count !== secc.length){
                //console.log(copy);
                clone.sections = copy;
                this.addToCart(clone);
             } else {
                 this.addToCart(null);
             }
            }
    }

    addToCart (data) {
        this.props.setCart(data);
    }

    getTimes(data) {
        let day = Object.keys(data.time);
        let time = Object.values(data.time);
        var s = "";
        for (var i = 0; i < day.length; i++) {
            s += (day[i].charAt(0).toUpperCase() + day[i].slice(1)) + "\t" + time[i] + "\n";
        }
        return s;
    }

    getTagS (name,data) {
        let subs = Object.keys(data.subsections);
        if (subs.length > 0) {
            return <Accordion defaultActiveKey="0">{this.getSubSection(name,data)}</Accordion>;
        }
        return "";
    }


    getSubSection(name,data) {
        if (data != undefined) {
            let listS = [];
            let subs = Object.keys(data.subsections);
            let subBody = Object.values(data.subsections);
            let subsec = Object.entries(data.subsections);

            if (subs.length > 0) {
                for (var i = 0; i < subs.length; i++) {
                    listS.push(<Card><Accordion.Toggle as={Card.Header} eventKey={i}>{subs[i]}</Accordion.Toggle><Accordion.Collapse eventKey={i}><Card.Body>{subBody[i].location}<Card.Text>{this.getTimes(subBody[i])} {this.getSButton(name,data,subsec[i])}</Card.Text></Card.Body></Accordion.Collapse></Card>);
                }
                return listS;
            }
        }
        return "";
    }

   render () {

       return (
           <Card>
                <Card.Title>{this.props.data.name}</Card.Title>
                <Card.Subtitle>{this.getSubTitle()}</Card.Subtitle>
                <Card.Text>{this.props.data.description} {this.getHButton(this.props.data)}</Card.Text>
                <Accordion defaultActiveKey="0">
                    {this.getListG()}
                </Accordion>
           </Card>
            
       )
   }
}

export default CourseInfo;