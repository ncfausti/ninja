import React from 'react';
import 'recharts';

import { PieChart, Pie, Sector, Cell } from 'recharts';

const COLORS = ['#FF0000', '#33ee88', '#00CC77'];

const data = [{name: 'Positive', value: 400},
    {name: 'Neutral', value: 100},
    {name: 'Negative', value: 300},];
const RADIAN = Math.PI / 180;                    

export default class HalfDonutChart extends React.Component{
    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    }
	render () {
	    try{
        console.log("sentiment data " + this.props.data[1].name + this.props.data[1].value);
        }
        catch(e) {}
  	return (
    	<PieChart width={560} height={200} onMouseEnter={this.onPieEnter}>
        <Pie
          data={this.props.data}
          cx={240}
          cy={130}
          startAngle={180}
          endAngle={0}
          innerRadius={90}
          outerRadius={110}
          fill="#8884d8"
          paddingAngle={5}
        >
          {
            this.props.data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    );
  }
}

export { HalfDonutChart };