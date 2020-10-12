/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  CardHeader
} from "reactstrap";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase";

const db = firebase.firestore();

class Lock extends React.Component {

		state = {
			parties : [
				{name: "Mist Party",members:["candidate1Name","candidate2Name"],preference:0},
				{name: "Rain Party",members:["candidate3Name","candidate4Name"],preference:0},
				{name: "Sun Party",members:["candidate5Name","candidate6Name"],preference:0},
				{name: "Humid Party",members:["candidate7Name","candidate8Name","candidate9Name"],preference:0}
      ],
      candidateNames:["candidate1Name","candidate2Name","candidate3Name","candidate4Name","candidate5Name","candidate6Name","candidate7Name","candidate8Name","candidate9Name"],
      preferences:[0,0,0,0,0,0,0,0,0],
      above:true
    }

    
    validate = this.validate.bind(this);
    toggleChange = this.toggleChange.bind(this);
    
    toggleChange() {
      this.setState({
          above: ! this.state.above
      });
    }

    partyChange (partyIndex,e) {
      let parties = this.state.parties;
      let party = parties[partyIndex];
      party.preference =  e.target.value;
      this.state.parties = parties; 
    }

    candidateChange(candidateName,e){
      for(let k = 0;k < this.state.candidateNames.length ; k++){
        if(this.state.candidateNames[k] == candidateName ){
          this.state.preferences[k] = e.target.value;
        }
      }
    }

    createPartySelectItems() {
      let items = [];
      items.push(<option value={0} selected>&nbsp;</option>)         
      for (let i = 1; i <= this.state.parties.length; i++) {             
           items.push(<option key={i} value={i}>{i}</option>);   
      }
      return items;
  }  

  createCandidateSelectItems(i) {
    let items = [];
    items.push(<option value={0} selected>&nbsp;</option>) 
    var candidateNumber = 0;
    this.state.parties.map(party=>
      candidateNumber += party.members.length
    )
    


    for (let i = 1; i <= candidateNumber; i++) {             
         items.push(<option key={i} value={i}>{i}</option>);   
    }
    return items;
   }

   dynamicsort(property) {
    var sort_order = 1;
    return function (a, b){
        // a should come before b in the sorted order
        if(a[property] < b[property]){
                return -1 * sort_order;
        // a should come after b in the sorted order
        }else if(a[property] > b[property]){
                return 1 * sort_order;
        // a and b are the same
        }else{
                return 0 * sort_order;
            }
        }
    }

   validate() {
    let preferTemp = []
    var success = true;
    if(this.state.above){

      for(let i = 0;i < this.state.parties.length ; i++)
        {
          if(preferTemp.includes(this.state.parties[i].preference)){
            alert("Above:You have used a number more than once,please try again");
            success = false;
            break;
        }
        else if(this.state.parties[i].preference == 0){
            alert("Above:You have to input all values for the party,please try again");
            success = false;
            break;
        }
          
        else{
          preferTemp.push(this.state.parties[i].preference);
        }
        }
      
      if( success == true){
        this.state.parties.sort(this.dynamicsort("preference"));
        var counter = 1;
        for(let i = 0;i < this.state.parties.length ; i++)
        {
          for(let j = 0;j < this.state.parties[i].members.length ; j++){
            for(let k = 0;k < this.state.candidateNames.length ; k++){
              if(this.state.candidateNames[k] == this.state.parties[i].members[j] ){
                this.state.preferences[k] = counter;
                counter ++;
              }
            }
          }
        }

        var uid = db.collection("elections").doc("2019").collection("ballots").doc("UCpPMWT7pENY7j0kuTJn5WLLP4N2");
        
        uid.set({preferences:[]});
        let i = 0;
        while (i < this.state.preferences.length){
          for(let h = 0;h < this.state.preferences.length;h++){  
            if(this.state.preferences[h] == i+1 ){
              i++;
              uid.update({
                preferences: firebase.firestore.FieldValue.arrayUnion(this.state.candidateNames[h])
            });
            }
            
            
          }
        }
        
        alert("Above:submit form successfully");
        

    }
    } 
    else{
      let preferTemp = [];
      var success = true;
      for(let i = 0;i < this.state.preferences.length ; i++)
        {
          if(preferTemp.includes(this.state.preferences[i])){
            alert("Below:You have used a number more than once,please try again");
            success = false;
            break;
        }
        else if(this.state.preferences[i] == 0){
            alert("Below:You have to input all values for the candidates,please try again");
            success = false;
            break;
        }
          
        else{
          preferTemp.push(this.state.preferences[i]);
        }
        }
        if( success == true){
          var uid = db.collection("elections").doc("2019").collection("ballots").doc("UCpPMWT7pENY7j0kuTJn5WLLP4N2");
        
        uid.set({preferences:[]});
        let i = 0;
        while (i < this.state.preferences.length){
          for(let h = 0;h < this.state.preferences.length;h++){  
            if(this.state.preferences[h] == i+1 ){
              i++;
              uid.update({
                preferences: firebase.firestore.FieldValue.arrayUnion(this.state.candidateNames[h])
            });
            }
            
            
          }
          }
          alert("Bellow:submit form successfully");
          
        }
    }


   }

   
	
  render() {
    return (
      <>
        <AuthHeader title="Lock screen" lead="Better to be safe than sorry." />
        <Card className="mb-4">
            <CardHeader class="d-flex flex-row">
              <div class="p-2">Voting Ballot</div>
              <div class="d-flex flex-row">
                <div class="p-2">Below</div>
                <label class="custom-toggle p-2">
                  <input defaultChecked type="checkbox" onChange = {this.toggleChange} />
                  <span
                    className="custom-toggle-slider rounded-circle"
                  />
                </label>
                <div class="p-2">Above</div>
              </div>
            </CardHeader>
            <CardBody>
              <Row>
                  {this.state.above ? 
                    this.state.parties.map((party, i) => 
                    <Col>
                      <div class="ballot-position">
                        <div class="ballot-number"> {i+1}
                          <div class="ballot-logo-sen"></div>
                            <select id={party.name} class="above" onChange = {(e) => this.partyChange(i, e)}>
                              {this.createPartySelectItems()}
                            </select>
                          </div>
                        <div class="ballot-party"> {party.name}</div>
                      </div>
                    </Col>
                    )
                   
                    :
                    this.state.parties.map((party, i) => 
                  <Col>
                    <div class="below-ballot-position">
                      <p class="party-title">{party.name}</p>
                      {party.members.map((member,j) =>
                        <div class="ballot-candidate-group">                
                          <div class="ballot-number">                  
                              <label htmlFor="candidate-aa-below">{member}</label>
                              <select id={member} class="below"  onChange = {(e) => this.candidateChange(member,e)}>
                                    {this.createCandidateSelectItems()}
                              </select>
                          </div>
                          <div class="ballot-candidate"> 
                            <span>{party.name}</span>
                          </div>
                        </div>
                      )
                      }
                    </div>
                  </Col>
                )
                  }


              </Row>
              <Button color="primary" type="button" onClick={this.validate} >
                      Submit form
              </Button>
            </CardBody>
          </Card>

      </>
    );
  }
}

export default Lock;
