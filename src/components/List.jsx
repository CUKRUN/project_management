import { React, useState } from 'react'


function List(props) {
    //create a new array by filtering the original array
    console.log(props.data[0].owner.toLowerCase().includes(props.input));
    const filteredData = props.data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return "";
        }
        //return the item which contains the user input
        else {
            return el.owner.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul>

            {filteredData.map((item) => (
                <li key={item.id}><h2>{item.owner}</h2><p>{item.Key}</p><p>{item.Value}</p></li>
            ))}
        </ul>
    )
}

export default List