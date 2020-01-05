import React from 'react';
import Navigation from './components/Navigation/Navigation'
import PowerForm from './components/PowerForm/PowerForm'
import Register from './components/Register/Register'
import CurrentPower from './components/CurrentPower/CurrentPower'
import SignIn from './components/SignIn/SignIn';
import Graph from './components/Graph/Graph';
import RemainingEnergy from './components/RemainingEnergy/RemainingEnergy'
import './App.css';


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      input : '',
      sendingData: '',
      route:'signin',
      isSignedIn: false,
      startTime:'',
      endTime:'',
      // endpoint: 'http://localhost:8000/',
      user: {
        name:'',
        email:'',
        id:'',
        isrelayon:'',
        totalpowerused:'',
        powerlimit:'',
        allowedenergy:'',
        currentpower:'',
        joined:'',
      }
    }
  }
  
/*   componentDidUpdate(){
    if((this.state.user.currentPower > this.state.user.powerLimit
      || this.state.user.totalPowerUsed > this.state.user.allowedEnergy)){
        console.log('relay is :', this.state.user.isRelayOn)
        console.log('first block hit')
        if(this.state.user.isRelayOn === true){
          console.log('second block hit')
          fetch('http://192.168.0.16:8000/switchRelay')
          .then(response => response.text())
          .then(response => {
            console.log('Current Power is : ',this.state.user.currentPower, 
            'total Power is : ',this.state.user.totalPowerUsed)
            console.log('allowed energy is :',this.state.user.allowedEnergy);
            console.log(response);
            this.setState(Object.assign(this.state.user, {
              isRelayOn: !this.state.user.isRelayOn,
            }))
          })
        }
      }
  } */

  loadUser = (data) => {
    this.setState({user: {
      name: data.name,
      email: data.email,
      id:data.id,
      isrelayon: data.isrelayon,
      totalpowerused:data.totalpowerused,
      currentpower:data.currentpower,
      powerlimit:data.powerlimit,
      allowedenergy:data.allowedenergy,
      joined:data.joined,
    }})
  }

/*   componentDidMount(){
    fetch(this.state.endpoint)
    .then(response => response.json())
    .then(console.log)
  } */

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({sendingData: this.state.input});
    fetch('http://192.168.1.133:8000/balancedPower',
        {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                balancedPower: this.state.input,
                id:this.state.user.id,
            })
        }).then(response => response.json())
        .then(powerValue => {
          this.setState(Object.assign(this.state.user, {powerlimit: powerValue}))
        })
//        if(this.state.user.powerLimit<this.state.user.currentPower)
        //Turn Off Relay
  }

  onGetPower = () => {
    fetch('http://192.168.0.26:8000/getPower', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id:this.state.user.id,
      })
    })
    .then(response => response.json())
    .then(users => {
      this.setState(Object.assign(this.state.user, 
        {
          currentpower: users.currentpower,
          totalpowerused: this.state.user.totalpowerused+ this.state.user.currentpower,
        })
      )
      this.setState({endTime: new Date()});
      //console.log(Math.round((this.state.endTime-this.state.startTime)/1000), 'seconds');
    })

    fetch('http://192.168.0.26:8000/updatePower',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id:this.state.user.id,
        totalpowerUsed: this.state.user.totalpowerused
      })
    })

    console.log('current power is : ',this.state.user.currentpower, 
    'total power is : ',this.state.user.totalpowerused, 'total energy is :', ((this.state.user.totalpowerused*((this.state.endTime-this.state.startTime)/3600000)).toFixed(2)))
    if((this.state.user.currentpower > this.state.user.powerlimit
      || ((this.state.user.totalpowerused*((this.state.endTime-this.state.startTime)/3600000)).toFixed(2)) > this.state.user.allowedenergy)){
        console.log('relay is :', this.state.user.isrelayon)
        console.log('first block hit')
        if(this.state.user.isrelayon === false){
          console.log('second block hit')
          fetch('http://192.168.0.26:8000/switchRelay', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id:this.state.user.id,
            })
          }
          )
          .then(response => response.text())
          .then(response => {
            console.log('Current Power is : ',this.state.user.currentpower, 
            'Total Power is : ',this.state.user.totalpowerused)
            console.log('allowed energy is :',this.state.user.allowedenergy);
            console.log(response);
            this.setState(Object.assign(this.state.user, {
              isrelayon: !this.state.user.isrelayon,
            }))
          })
        }
        
      }
  }

  energyTime = () => {
    this.setState({startTime: new Date()})
  }

  onRouteChange = (route) => {
    if (route === 'home'){
      this.setState({isSignedIn: true})
    }else {
      this.setState({isSignedIn: false})
    }
    this.setState({route: route});
  }

  render() {
    return(
      <div className="App">
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home' ? 
        <div>
          <PowerForm 
          onInputChange ={this.onInputChange} 
          onButtonSubmit= {this.onButtonSubmit}
          />
          <RemainingEnergy 
          totalpowerused={this.state.user.totalpowerused}
          allowedenergy = {this.state.user.allowedenergy}
          startTime={this.state.startTime}
          endTime={this.state.endTime}
          />
          <CurrentPower
          powerlimit = {this.state.user.powerlimit}
          name={this.state.user.name}
          onGetPower = {this.onGetPower}
          totalpowerused={this.state.user.totalpowerused}
          startTime={this.state.startTime}
          endTime={this.state.endTime}
          /> 
          {/* <Logo/>*/}
          <Graph id = {this.state.user.id} isSignedIn={this.state.isSignedIn}/>
        </div>      
        : (this.state.route === 'signin' ? 
        <SignIn energyTime = {this.energyTime} loadUser= {this.loadUser} onRouteChange = {this.onRouteChange}/>
        :
        <Register energyTime= {this.energyTime} loadUser= {this.loadUser} onRouteChange = {this.onRouteChange}/>
        
        )
        }
    </div>
    );
  }
}

export default App;
