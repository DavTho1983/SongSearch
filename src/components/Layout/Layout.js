import React from "react";

import Auxilliary from "../../hoc/Auxilliary";
import classes from "./Layout.css";

const layout = props => ( <
    Auxilliary >
    <
    div >
    <
    h1 > Toolbar, SideDrawer, Backdrop < /h1> < /
    div > <
    main className = { classes.Content } > { props.children } < /main> < /
    Auxilliary >
);

export default layout;