import FilterLink from '../containers/FilterLink';


const Footer = ()=>{
    <p>
        Show: {""}
        <FilterLink filter = "SHOW_ALL">
            all
        </FilterLink>
        {", "}
        <FilterLink filter = "SHOW_ACTIVE">
            active
        </FilterLink>
        {", "}
        <FilterLink filter = "SHOW_COMPLETED">
            completed
        </FilterLink>
    </p>
}

export default Footer;