import React from 'react';
import { Line } from 'react-chartjs-2';

class Graph extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : {
                labels: [],
                datasets: [
                    {
                        label: "Current Power Graph",
                        backgroundColor: "rgba(255,0,255,0.75)",
                        data:[],
                        fill: true,
                    }
                ]

            }
        }
    }

    chartReference = {};

    componentDidMount(){
        let i = 1
        if (this.props.isSignedIn){
            this.interval = setInterval(() => {
            /*this.state.data.datasets[0].data.push(5)
            this.state.data.labels.push(i++)
            let lineChart = this.reference.chartInstance
            lineChart.update(); */
            /* this.state.data.datasets[0].data.forEach(
                this.state.data.labels.push(i++)
            ) */
            if (this.props.id && this.reference){
                fetch('http://192.168.0.26:8000/getPower', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                    id:this.props.id,
                    })
                })
                .then(response => response.json())
                .then(user => {
                    this.state.data.datasets[0].data.push(user.currentpower)
                    this.state.data.labels.push(i++)
                    //this.setState(Object.assign(this.state.user, {currentPower: power}))
                })
                let lineChart = this.reference.chartInstance;
                lineChart.update();
                if (i>25){
//                    lineChart.data.labels.splice(0,1);
                }
            }
            else{
                clearInterval(this.interval)    
            }
        }, 3000);
        }
    }

        render(){
            return(
                <div className = 'center'>
                    <div style = {{position : "relative", width: 600, height: 550}}>
                        <h3>Power Chart</h3>
                        <Line
                        options= {{
                            responsive: true,
                            events: ['click']
                        }}
                        data = {this.state.data}
                        ref = {(reference) => this.reference = reference}
                        redraw={true}
                        />
                    </div>
                </div>
            );
    }
}

export default Graph

