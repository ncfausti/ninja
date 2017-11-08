import React from 'react';
import 'recharts';

import { BarChart, Bar, Tooltip } from 'recharts';

export const TinyBarChart = (props) => (
    <div>
        <BarChart width={140} height={60} data={this.props.data}>
            <Bar type="monotone" dataKey="sales" fill="#8884d8"/>
            <Tooltip labelStyle={{display: 'none'}}/>
        </BarChart>
        <div className="ml-2 small">Bar Chart</div>
    </div>
);
