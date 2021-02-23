import React from 'react'

const List = ({items, taskCompleted, removeItem }) => {
  return (
    <div className="list">
      {items.map((item) => {
        const { id, title, isCompleted } = item;
        return <article key={id} className="list-item">
            <div className="btn-cont">
            {isCompleted ? <button type="button" className="completed-btn" 
              onClick={()=> taskCompleted(id)}>
              </button> 
              : <button type="button" className="uncompleted-btn" 
              onClick={()=> taskCompleted(id)}></button> }
          </div>
          {isCompleted ? <p className="title-completed">{title}</p> : <p className="title">{title}</p>}
          <div className="delete">
            <button type="button" class="delete-btn" 
                onClick={()=> removeItem(id)}>
                  <img src={require('../../../images/icon-cross.svg')}/>
                </button>
          </div>    
        </article>
      })}
    </div>
  )
  

}

export default List
