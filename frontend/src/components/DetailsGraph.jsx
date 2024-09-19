import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
import '../App.css';

function DetailsGraph() {

    const workouts = useSelector((state) => state.workouts.value);
    const dateRange = useSelector((state) => state.dateRange.value);
    console.log(workouts);
    const [data, setData] = useState([]);

    

    return(
        <div className='graph'>
            <Plot
            // x axis is always going to be a range of dates
            // y axis may change based on user input or automatically based on the type of workout selected
            
                data={[
                {
                    x: dateRange,
                    y: data,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'blue'},
                    name: 'Load'
                },
                ]}
                layout = { {autosize: true} }
                useResizeHandler = { true }
                style= { {width: "100%", height: "100%"} }
            />
        </div>
    );
};

export default DetailsGraph;