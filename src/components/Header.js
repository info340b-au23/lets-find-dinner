export function Header(props) {
    let titleClassList = "container-fluid m-lg-0";
    if (props.background) {
        titleClassList += " " + props.background + "-title";
    }
    
    return(
        <div className="container-fluid header">
            <div className={titleClassList}>
                <div className="row shadow page-title">
                    <div className="col">
                        <h1>{props.title}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}