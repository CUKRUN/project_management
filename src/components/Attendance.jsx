import React,{useState}  from "react";
import List from './List.jsx'
import '../Cukrun.css';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function handleShow(id,list) {
    const selectValue = list.filter((item) => item.id === id);
    alert(JSON.stringify(selectValue[0].Value));
    return (selectValue.Value);    
}    

function handleRemove(id,list,setList,localStoragekey) {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    localStorage.setItem(localStoragekey,JSON.stringify(newList))   
}

const Attendance = () => {


    let initialList= JSON.parse(localStorage.getItem('ToDoList'));
    let initialDonelist= JSON.parse(localStorage.getItem('DoneList'));

    const [list, setList] = useState(initialList);    
    const [donelist, setDonelist] = useState(initialDonelist);    

    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const [value, setValue] = useState("");
    const [query, setQuery] = useState("");

    function handleDone(id,list) {
        const newList = list.filter((item) => item.id !== id);
        const selectValue = list.filter((item) => item.id === id);
        //localStorage.removeItem(selectValue[0].Key);
        setList(newList);
        localStorage.setItem("ToDoList",JSON.stringify(newList))
        const onelist =  {"id":id,"owner":selectValue[0].owner,"Key":selectValue[0].Key,"Value":selectValue[0].Value};
        const newDonelist = donelist.concat(onelist);
        setDonelist(newDonelist)
        localStorage.setItem("DoneList",JSON.stringify(newDonelist))    
    }



    function handleAdd() {
        const onelist =  {"id":name,"owner":owner,"Key":name,"Value":value};
        const newList = list.concat(onelist);
        setList(newList);
        setName('');
        setValue('');
        localStorage.setItem("ToDoList",JSON.stringify(newList))
      }

    function handleSearch(event) {
        event.preventDefault();
        alert(JSON.parse(list));
        if (query === ""){alert("hello")}
        else{
        const newList= JSON.parse(list).filter((item) => item.owner.toLowerCase().includes(query.toLowerCase()));
        setList(newList)}
        ;
    } ;

    const listItems = list.map((item) =>
        <tr>
            <td ><span> {item.owner}</span></td>
            <td > <span>{item.Key}</span></td>
            <td ><button className="cukrun_button3"  onClick={() => handleShow(item.id,list)}>Description</button> </td>
            <td ><button className="cukrun_button3" onClick={() => handleDone(item.id,list)}>Complete</button> </td>
            <td ><button className="cukrun_button3" onClick={() => handleRemove(item.id,list,setList,"ToDoList")}>Delete</button></td>
        </tr>

    );

    const DonelistItems = donelist.map((item) =>
    <tr>
        <td > {item.owner}</td>
        <td > {item.Key}</td>
        <td ><button  onClick={() =>handleShow(item.id,donelist)}>Description</button> </td>
        <td ><button  onClick={() => handleRemove(item.id,donelist,setDonelist,"DoneList")}>Delete</button></td>
    </tr>);

    return (
        
        <div className="cukrun_container">
            <div className="cukrun_bar">
                <button className="cukrun_button2">Attendance</button>
                <button className="cukrun_button2">To do list</button>
            </div>
           <div className="cukrun_div_row">
                <div className="cukrun_div1_col">
                <h1> APP</h1>
                <h2>You have completed {JSON.parse(localStorage.getItem("DoneList")).length} tasks! And {JSON.parse(localStorage.getItem("ToDoList")).length} tasks remaining! </h2>

  
                    <label>Name</label>
                    <textarea className="cukrun_form" rows="2" cols="20" value={owner} onChange={(e) => setOwner(e.target.value)}/>
                    <label>Task Name</label>
                    <textarea className="cukrun_form"  rows="2" cols="20" value={name} onChange={(e) => setName(e.target.value)}/>
                    <label>Description</label>
                    <textarea className="cukrun_form"  rows="10" cols="20" value={value} onChange={(e) => setValue(e.target.value)}/>
                    <button className="cukrun_button" onClick={handleAdd}>Add</button>
                </div>
                <div className="cukrun_div1_col" >

                    <table className="cukrun_table" cellSpacing="10" >
                        <th>Owner</th>  
                        <th>Task</th>  
                        <th>Description</th>  
                        <th>Completed</th>
                        <th>Remove</th>
                        {listItems}
                    </table>
                    </div>                 
                <div className="cukrun_div1_col">
                    <h1>Search the owner name</h1>
                    <textarea rows="2" placeholder="Enter Owner query" onChange={event => setQuery(event.target.value)} />
                    <List data={list} input={query} />

                </div>
            </div>

      
        Primary

        </div>


    );
};

export default Attendance;