import React from 'react';
import 'recharts';

import { PieChart, Pie, Sector, Cell } from 'recharts';
const data = [    {name: 'Negative', value: 200},
    {name: 'Neutral', value: 100},
    {name: 'Positive', value: 400},

];
const COLORS = ['#FF0000', '#FFBB44', '#00CC77'];


const RADIAN = Math.PI / 180;                    

export default class HalfDonutChart extends React.Component{
	render () {
  	return (
    	<PieChart width={600} height={300} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data} 
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
            data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    );
  }
}

export { HalfDonutChart };