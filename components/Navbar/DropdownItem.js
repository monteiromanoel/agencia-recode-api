import "bootstrap/dist/css/bootstrap.css";

const DropdownItem = (props) => {
    return (
        <li>
            <a className="dropdown-item"
                href={props.link} >
                {props.label}
            </a>
        </li>
    )
}

export default DropdownItem