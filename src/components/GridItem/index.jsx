import {styled} from "@mui/material/styles";

const Item = styled("div")(({theme})=> ({
    paddingLeft: theme.spacing(1.5),
    marginTop: theme.spacing(1), 
}));

function GridItem({children}) {
    return (
        <Item>
            {children}
        </Item>
    );
}

export default GridItem