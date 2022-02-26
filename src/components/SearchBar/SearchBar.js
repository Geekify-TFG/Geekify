import {createStyles, fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {useState} from "react";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) =>
    createStyles({
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.black, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.black, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    })
);

function SearchBar() {

    const classes = useStyles();
    const [value, setValue] = useState()
    const history = useHistory()

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const keyPress = (e) => {
        if (e.keyCode === 13) {
            if (e.target.value === "") {
                setValue("")
            }
            history.push({
                pathname: `/search/${value}`,
                state: {value: value}
            })

        }

    }

    return (
        <div style={{marginLeft: '25px'}} className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon/>
            </div>
            <InputBase
                data-testid="SearchBar"
                placeholder="Search..."
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search '}}
                value={value}
                onKeyDown={keyPress} onChange={handleChange}
            />
        </div>
    );
}

export default SearchBar;