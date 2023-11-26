/* eslint-disable react/prop-types */
import React from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { ListItemButton } from "@mui/material";

const ModelsList = ({ models }) => {
  return (
    <List component="nav" aria-label="mailbox folders">
      {models.map((model, index) => (
        <React.Fragment key={model.efAccountId}>
          <ListItemButton>
            <ListItemText
              primary={`${model.firstName} ${model.lastName}`}
              secondary={`Email: ${model.email}, Phone: ${model.phoneNo}, Height: ${model.height}, Shoe Size: ${model.shoeSize}`}
            />
          </ListItemButton>
          {index < models.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default ModelsList;
