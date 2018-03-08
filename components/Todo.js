const Todo =({onClick, complete, text}) =>(
    <li onClick={onClick} style={{textDecoration: completed? "line-through": "none"}}>{{text}}</li>
)

export default Todo;