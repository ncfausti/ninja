import React from 'react';
import 'recharts';

import {ResponsiveContainer,ComposedChart,AreaChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ReferenceArea} from 'recharts';

export const MultiLineChart = (props) => (
<div className={"stacked-chart"}>
        <ResponsiveContainer width={"95%"} height={500}>
        <ComposedChart data={props.data}
                       margin={{top: 10, right: 30, left: 0, bottom: 0}}>
    	{/*<AreaChart width={600} height={270}*/}
            {/*margin={{top: 10, right: 30, left: 0, bottom: 0}}>*/}


                <XAxis hide={false} dataKey="dates" scaleToFit={true} textAnchor={"end"} angle={-15} scale="point" />
        <YAxis dataKey="percents" type={"number"} domain={['dataMin', 'dataMax']} />
                <ReferenceLine x={"Oct 2017"} stroke="green" label="PROJECTED" />
                <ReferenceArea x1={"Oct 2017"} x2={"Jan 2018"} y1={0} stroke="red" strokeOpacity={0.3} />
        <CartesianGrid strokeDasharray="5 5" height={"300"} />
        <Tooltip/>
                <Line type='monotone' name="Your Brand" dataKey='kiva'  stroke='#ff0000'/>
                <Line type='monotone' name="Comp 1" dataKey='comp1'  stroke='#888'/>
                <Line type='monotone' name="Comp 2" dataKey='comp2'  stroke='#888'/>

        </ComposedChart>
        </ResponsiveContainer>
    </div>
    );

