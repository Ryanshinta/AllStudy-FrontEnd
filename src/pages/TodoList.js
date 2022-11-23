
import TodoListComponents from "../components/TodoList/TodoList";
import Layout from "../components/Dashboard/Layout";
import {Box, List, ListItem, ListItemText} from "@mui/material";

export default function TodoList (){
    return(
        <>
            {/*<Layout>*/}
                <Box>
                    <List>
                        <ListItem>
                            <ListItemText primary={"TodoIt"}/>
                        </ListItem>
                    </List>
                </Box>
            {/*</Layout>*/}

        </>
    )
}
