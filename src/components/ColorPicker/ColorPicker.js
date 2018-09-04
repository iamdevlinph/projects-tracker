import React, { Component, Fragment } from 'react';
import { PhotoshopPicker } from 'react-color';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StringUtil } from 'common-utils-pkg';

const PHOTOSHOP_PICKER_WIDTH = 515;

class ColorPickerComponent extends Component {
  state = {
    pickerX: null,
    pickerY: null,
    selectedColor: null,
    originalColor: null,
  }

  componentWillMount() {
    const { color } = this.props;
    this.setState({
      selectedColor: color,
      originalColor: color,
    });
  }

  getKeyValue = (id) => {
    const lowerCaseId = id.toLowerCase();
    const type = id.split('-')[1];
    switch (true) {
      case (lowerCaseId.includes('issue')):
        return `issues-${type}`;
      case (lowerCaseId.includes('pull')):
        return `pulls-${type}`;
      default:
        return `update-${type}`;
    }
  }

  triggerColorPicker = (e, key, type) => {
    const { showColorPicker, previewColor } = this.props;
    showColorPicker(key);

    switch (type) {
      case 'cancel':
      {
        const { originalColor } = this.state;
        this.setState({
          selectedColor: originalColor,
        });
        previewColor(key, originalColor);
        // this.setColor(e, key, true);
        break;
      }
      case 'accept':
      {
        const { selectedColor } = this.state;
        this.setState({ originalColor: selectedColor });
        break;
      }
      default: {
        const widthAvailable = window.innerWidth - e.clientX;
        const newX = (widthAvailable < PHOTOSHOP_PICKER_WIDTH)
          ? e.clientX - PHOTOSHOP_PICKER_WIDTH / 2
          : e.clientX;
        if (e) {
          this.setState({
            pickerX: newX,
            pickerY: e.clientY + 10,
          });
        }
      }
    }
  }

  colorChange = (color, key) => {
    this.setState({
      selectedColor: color.hex,
    });
    const { previewColor } = this.props;
    previewColor(key, color.hex);
  }

  setColor = (e, key, fromCancel) => {
    // const { selectedColor, originalColor } = this.state;
    // const { previewColor } = this.props;
    console.log(fromCancel);
    this.triggerColorPicker(e, key);
    // if (fromCancel) {
    //   this.triggerColorPicker(e, key);
    //   this.setState({ selectedColor: originalColor });
    //   previewColor(key, originalColor);
    // } else {
    //   this.setState({ originalColor: selectedColor });
    //   previewColor(key, selectedColor);
    // }
  }

  setHeader = (id) => {
    const split = id.split('-');
    const type = StringUtil.toSentenceCase(split[1]);
    return `${split[0]} (${type})`;
  };

  render() {
    const {
      id, activeColorPicker,
    } = this.props;
    const { selectedColor } = this.state;
    const { pickerX, pickerY } = this.state;
    const key = this.getKeyValue(id);
    const colorPickerDisplay = key === activeColorPicker;
    return (
      <Fragment>
        <ColorPreview color={selectedColor} onClick={e => this.triggerColorPicker(e, key)} />
        <ReadInput type="text" value={selectedColor} readOnly />
        {colorPickerDisplay && (
          <ColorPickerArea>
            <ColorPicker left={pickerX} top={pickerY}>
              <PhotoshopPicker
                header={this.setHeader(id)}
                color={selectedColor}
                onChangeComplete={e => this.colorChange(e, key)}
                onAccept={e => this.triggerColorPicker(e, key, 'accept')}
                onCancel={e => this.triggerColorPicker(e, key, 'cancel')}
              />
            </ColorPicker>
          </ColorPickerArea>
        )}
      </Fragment>
    );
  }
}

ColorPickerComponent.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  showColorPicker: PropTypes.func.isRequired,
  activeColorPicker: PropTypes.string.isRequired,
  previewColor: PropTypes.func.isRequired,
};

export default ColorPickerComponent;

const ColorPreview = styled.div`
  display: inline-block;
  background: ${({ color }) => `${color}`};
  height: 12px;
  width: 30px;
  margin-top: 4px;
  cursor: pointer;
  border: 2px black solid;
`;
const ColorPicker = styled.div`
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
`;
const ColorPickerArea = styled.div`
  z-index: 2;
  height: 100%;
  width: 100%;
  position: absolute;
  background: rgba(0,0,0,0.1);
  top: 0;
  left: 0;
`;
const ReadInput = styled.input`
  width: 60px;
  text-transform: uppercase;
  border: none;
  border-bottom: 1px solid black;
`;
