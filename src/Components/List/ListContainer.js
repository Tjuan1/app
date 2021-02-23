import React, { useState, useEffect } from 'react'
import List from './List/List'
import Data from '../../Data/Data'


function ListContainer() {
  const [name, setName] = useState('');
  const [list, setList] = useState(Data);
  const [showList, setShowList] = useState([list]);
  const [active, setActive] = useState('all')
  const [isActive, setIsActive] = useState(list.filter((item) => item.isCompleted === false).length);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      //display alert. Using showAlert const to save some coding
      alert("please, enter a valid item")
    } else {
      //add item to list
      const newItem = {id: new Date().getTime().toString(), title:name, isCompleted: false }
      setList([...list, newItem]);
      setName('');
    }
  }

  useEffect(() => {
    setShowList(list)
    setIsActive(list.filter((item) => item.isCompleted === false).length)  
  }, [list]);

  const clearList = () => {
    setList([]);
  };

  const taskCompleted = (id) => {
    setList(list.map((item) => {
      if(item.id === id) {
        return {...item, isCompleted: !item.isCompleted}
      }
      return item
    }))
    setShowList(list)
   
  };

  const removeItem = (id) => {
    setList(list.filter((item)=> item.id !== id))
    setShowList(list)
  };

  const showAll = () => {
    setShowList(list)
    setActive('all')
  };

  const showActive = () => {
    setShowList(list.filter((item) => item.isCompleted === false))
    setActive('active')
  };

  const showCompleted = () => {
    setShowList(list.filter((item) => item.isCompleted !== false))
    setActive('completed')
  };

  const removeCompleted = () => {
    setList(list.filter((item)=> item.isCompleted !== true))
    setShowList(list)
  };
 
  return (
  <section className="section-center">
      <form className="list-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input type="text" className="input" placeholder="eg. Do my homework"
          value={name}
          onChange={(e) => setName(e.target.value)}/>
        </div>
      </form>
      {list.length > 0 && (
        <div className="list-container">
          <List items={showList} taskCompleted={taskCompleted} removeItem={removeItem}/>
          <div className="button-container">
            <p className="items-left">{isActive} items left</p>
            <button className={`select-btn active-${active === 'all' ? active : null}`} onClick={showAll}>All</button>
            <button className={`select-btn active-${active === 'active' ? active : null}`} onClick={showActive}>Active</button>
            <button className={`select-btn active-${active === 'completed' ? active : null}`} onClick={showCompleted}>Completed</button>      
            <button className="clear-completed-btn" onClick={removeCompleted}>clear completed</button>          
          </div>
          <div className="mobile-button-container">
            <button className={`select-btn-mobile active-${active === 'all' ? active : null}`} onClick={showAll}>All</button>
            <button className={`select-btn-mobile active-${active === 'active' ? active : null}`} onClick={showActive}>Active</button>
            <button className={`select-btn-mobile active-${active === 'completed' ? active : null}`} onClick={showCompleted}>Completed</button>
          </div>      
        </div>
    )} 
      
  </section>
  )
}

export default ListContainer
