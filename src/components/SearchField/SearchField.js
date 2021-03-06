import React from 'react'
import Icon from '@material-ui/core/Icon'
import { injectIntl } from 'react-intl'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withTheme, withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import { connect } from 'react-redux'
import { filterActions } from 'material-ui-filter'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    flex: 1,
    borderRadius: 4,
    minHeight: 48,
    display: 'block',
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25)
    },
    '& $input': {
      transition: theme.transitions.create('width'),
      width: 0,
      '&:focus': {
        width: 200
      }
    }
  },
  rootOpen: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    minHeight: 48,
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    flex: 1,
    borderRadius: 4,
    display: 'block',
    background: fade(theme.palette.common.white, 0.25),
    width: 240
  },
  search: {
    width: theme.spacing.unit * 5,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing.unit * 2}px 0px 0px ${theme.spacing.unit * 5}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0
    }
  },
  inputOpen: {
    font: 'inherit',
    padding: `${theme.spacing.unit * 2}px 0px 0px ${theme.spacing.unit * 5}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '100%',
    outline: 0
  }
})

const SearchField = ({ classes, filterName, setSearch, searchValue, alwaysOpen }) => {
  const hasInput = searchValue && searchValue !== ''
  let rootClass = classes.root
  let inputClass = classes.input

  if (hasInput || alwaysOpen) {
    rootClass = classes.rootOpen
    inputClass = classes.inputOpen
  }

  return (
    <div className={classNames(rootClass)}>
      <div className={classes.search}>
        <Icon>search</Icon>
      </div>
      <input
        autoComplete="off"
        id="docsearch-input"
        value={searchValue}
        ref={node => {
          if (node && (searchValue && searchValue !== '')) {
            node.focus()
          }
        }}
        className={classNames(inputClass)}
        onChange={e => {
          setSearch(filterName, e.target.value)
        }}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { filters } = state
  const { filterName } = ownProps

  const searchValue = filters[filterName] ? (filters[filterName].search ? filters[filterName].search.value : '') : ''

  return {
    searchValue
  }
}

export default connect(
  mapStateToProps,
  { ...filterActions }
)(injectIntl(withTheme()(withStyles(styles, { withTheme: true }, withWidth())(SearchField))))
