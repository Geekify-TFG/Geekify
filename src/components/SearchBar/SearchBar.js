import {createStyles, fade, makeStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {AppColors} from "../../resources/AppColors";

const useStyles = makeStyles((theme) =>
    createStyles({
        search: {
            position: 'relative',
            borderRadius: 30,
            backgroundColor: fade(AppColors.BACKGROUND_DRAWER, 0.15),
            '&:hover': {
                backgroundColor: fade(AppColors.BACKGROUND_DRAWER, 0.25),
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
            backgroundColor: AppColors.BACKGROUND_DRAWER,
            paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '15em',
                height: '2em',
                '&:focus': {
                    width: '20em',
                },
            },
            borderRadius: 30,
        },
        inputBig: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            backgroundColor: AppColors.BACKGROUND_SEARCH,
            paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
            color: AppColors.GRAY,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '50em',
                height: '2.5em',
                '&:focus': {
                    width: '50em',
                },
            },
            borderRadius: 30,
        },
    })
);

function SearchBar({size, searched, setNewTitle}) {

    const classes = useStyles();
    const [value, setValue] = useState(searched)
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
    const myComponentClass = size ? classes.inputBig : classes.inputInput;

    return (
        <div style={{marginLeft: '25px'}}>

            <InputBase
                data-testid="SearchBar"
                placeholder="Search videogames"
                classes={{
                    root: classes.inputRoot,
                    input: myComponentClass,
                }}
                style={{color: AppColors.WHITE}}
                inputProps={{'aria-label': 'Search videogames '}}
                value={value}
                onKeyDown={keyPress} onChange={handleChange}
            />
        </div>
    );
}

export default SearchBar;