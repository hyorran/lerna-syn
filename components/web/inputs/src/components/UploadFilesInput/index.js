// https://github.com/react-dropzone/react-dropzone
import React, { createRef } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import merge from 'lodash/merge'
import filter from 'lodash/filter'
import { withStyles } from '@material-ui/core/styles'
import Button from '@syntesis/c-buttons/src/components/Button'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIconButton from '@syntesis/c-buttons/src/components/IconButton/DeleteIconButton'
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText'
import applyRulesAndValidate from '../../rules'
import isEmpty from 'lodash/isEmpty'
import HelpIconButton from '@syntesis/c-buttons/src/components/IconButton/HelpIconButton'
// import { InputHelperModal } from '@syntesis/c-modals'
import Avatar from '@material-ui/core/Avatar'

import styles from './styles'


class UploadFilesInput extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this)

    this.state = {
      binary: [],
      filesComponent: [],
      file: []
    }
  }

  onInputChange = () => {
    const {
      name,
      onChange,
      rules
    } = this.props

    const { binary } = this.state

    const {
      isValid,
      errorText
    } = applyRulesAndValidate(rules, binary)

    onChange(name, {
      value: binary,
      isValid,
      errorText,
      showError: true
    })
  }

  onDrop = (acceptedFiles) => {
    const {
      multiple,
      showSize
    } = this.props
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.warn('file reading was aborted')
      reader.onerror = () => console.warn('file reading has failed')
      reader.onload = () => {
        const binaryStr = reader.result
        const newBinaries =
          merge({
            key: file.path,
            value: binaryStr
          }, file)
        this.setState(prevState => ({
          ...prevState,
          binary: multiple ? [...prevState.binary, newBinaries] : [newBinaries]
        }))

        this.onInputChange()
      }

      const singleComponent = (
        <ListItem key={ file.path } title={ file.path }>
          <Avatar
            src={ URL.createObjectURL(file) }
          />
          <ListItemText
            primary={ file.path }
            secondary={ showSize ? `Tamanho: ${ file.size }-bytes` : undefined }
          />
          <ListItemSecondaryAction>
            <DeleteIconButton
              size="mini"
              onClick={ () => {
                // eslint-disable-next-line max-len
                const newFilesComponent = filter(this.state.filesComponent, item => item.key !== file.path)
                const newFiles = filter(this.state.file, item => item.name !== file.name)
                const newBinaries = filter(this.state.binary, item => item.key !== file.name)
                this.setState(prevStateF => ({
                  ...prevStateF,
                  filesComponent: newFilesComponent,
                  file: newFiles,
                  binary: newBinaries
                }), this.onInputChange)
              } }
            />
          </ListItemSecondaryAction>
        </ListItem>
      )


      reader.readAsDataURL(file)
      this.setState(prevState => ({
        ...prevState,
        file: [...prevState.file, file],
        // eslint-disable-next-line max-len
        filesComponent: multiple ? [...prevState.filesComponent, singleComponent] : [singleComponent]
      }))
    })
  }

  renderHelperModal = () => {
    // const {
    //   helperContent,
    //   helperText,
    //   dialogId
    // } = this.props

    // window.openDialog({
    //   component: ({ dialogId: unsafeDialogId, open }) => (
    //     <InputHelperModal
    //       open={ open }
    //       dialogId={ unsafeDialogId }
    //       parentDialog={ dialogId }
    //       helperContent={ helperContent }
    //       helperTitle={ helperText }
    //     />
    //   )
    // })
  }

  render() {
    const {
      filesComponent
    } = this.state

    const {
      classes,
      contentText,
      btnText,
      selectionType,
      showSelectedFiles,
      acceptableTypes,
      helperText,
      titleSelectedFiles,
      helperContent,
      multiple,
      maxSize,
      minSize,
      disabled
    } = this.props

    const dropZoneRef = createRef()

    const openDialog = () => {
      if (dropZoneRef.current) {
        dropZoneRef.current.open()
      }
    }

    return (
      <div className={ classes.container }>
        <Dropzone
          onDrop={ this.onDrop }
          noClick={ selectionType === 'button' }
          accept={ acceptableTypes }
          multiple={ multiple }
          ref={ dropZoneRef }
          maxSize={ maxSize }
          minSize={ minSize }
          disabled={ disabled }
        >
          {({ getRootProps, getInputProps }) => (
            <div>
              <section>
                <div { ...getRootProps({ className: classes.baseStyle }) }>
                  {
                    selectionType !== 'drag' ?
                      <Button
                        type="button"
                        btnProps={ {
                          color: 'primary',
                          padding: '20px'
                        } }
                        onClick={ openDialog }
                      >
                        { btnText }
                      </Button>
                      : null
                  }
                  {
                    showSelectedFiles ?
                      <aside className={ classes.files }>
                        <Typography
                          variant="h6"
                          align="center"
                        >
                          { titleSelectedFiles }
                        </Typography>
                        <div>
                          <List>
                            { filesComponent }
                          </List>
                        </div>
                      </aside>
                      : null
                  }
                  <input { ...getInputProps() } />
                  {
                    selectionType !== 'button' ? contentText : null
                  }
                </div>
              </section>
            </div>
          )}
        </Dropzone>
        {
          !isEmpty(helperText) ?
            <FormHelperText
              className={ classes.helperText }
            >
              {
                helperContent ?
                  <HelpIconButton
                    size="mini"
                    marginHorizontal={ false }
                    onClick={ this.renderHelperModal }
                  />
                  : null
              }
              { helperText }
            </FormHelperText>
            : null
        }
      </div>
    )
  }
}

UploadFilesInput.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  contentText: PropTypes.string,
  btnText: PropTypes.string,
  selectionType: PropTypes.oneOf([
    'button',
    'drag',
    'default'
  ]),
  showSelectedFiles: PropTypes.bool,
  acceptableTypes: PropTypes.string,
  previewFiles: PropTypes.bool,
  value: PropTypes.array,
  helperText: PropTypes.string,
  errorText: PropTypes.string,
  isValid: PropTypes.bool,
  showError: PropTypes.bool,
  onChange: PropTypes.func,
  rules: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])),
  titleSelectedFiles: PropTypes.string,
  helperContent: PropTypes.func,
  dialogId: PropTypes.string,
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  disabled: PropTypes.bool,
  showSize: PropTypes.bool
}

UploadFilesInput.defaultProps = {
  contentText: '',
  btnText: 'Selecionar',
  selectionType: 'default',
  showSelectedFiles: true,
  acceptableTypes: '',
  previewFiles: true,
  helperText: '',
  value: [],
  isValid: true,
  showError: false,
  errorText: '',
  onChange: () => {},
  rules: [],
  titleSelectedFiles: 'Arquivos selecionados',
  helperContent: null,
  dialogId: '',
  multiple: true,
  maxSize: undefined,
  minSize: undefined,
  disabled: false,
  showSize: true
}

export default withStyles(styles)(UploadFilesInput)
