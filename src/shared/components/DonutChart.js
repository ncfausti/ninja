import React from 'react';
import 'recharts';

import { PieChart, Pie, Sector, Cell } from 'recharts';
const data = [{name: 'Positive', value: 400},
    {name: 'Neutral', value: 100},
    {name: 'Negative', value: 300},];
const COLORS = ['#00CC77', '#FF0000', '#FFBB44'];

const RADIAN = Math.PI / 180;                    

export default class DonutChart extends React.Component{
	render () {
  	return (
    	<PieChart width={600} height={300} onMouseEnter={this.onPieEnter}>
        <Pie
          data={this.props.data}
          cx={240}
          cy={130}
          innerRadius={90}
          outerRadius={110}
          fill="#8884d8"
          paddingAngle={5}
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    );
  }
}

export { DonutChart };


