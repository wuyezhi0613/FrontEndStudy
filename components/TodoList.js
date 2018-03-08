import Todo from './Todo';
const TodoList =({todos, onTodoClick}) =>{
    <ul>
        {
            todos.map(todo=>{
                <Todo key={todo.id} {...todo} onClick={()=>onTodoClick(id)}></Todo>
            })
        }
    </ul>
}

export default TodoList;