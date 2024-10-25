import Container from "react-bootstrap/Container";

export function Header(props) {
    let titleClassList = "header ";
    let rowClassList = "shadow "
    if (props.background) {
        titleClassList = props.background + "-title";
        rowClassList += "page-title";
    } else {
        rowClassList += "no-background-img ps-3 ps-lg-4";
    }
    
    return(
        <Container fluid className={titleClassList + " mb-4 px-0"}>
            <header className={rowClassList}>
                <h1>{props.title}</h1>
            </header>
        </Container>
    )
}