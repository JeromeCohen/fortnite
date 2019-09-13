import React from 'react';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';


export default function MenuItems(props) {
    const patches = props.patchValues;
    const items = Object.values(patches).map(val =>
        <MenuItem key={val} value={val}>{val}</MenuItem>
    );

    return (
        <Select
            value={props.patch}
            onChange={props.onChange}
            inputProps={{
                name: 'patch',
                id: 'patch-auto-width',
            }}
            autoWidth
        >
            {items}
        </Select>
    );
}

