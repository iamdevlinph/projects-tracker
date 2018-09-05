import React, { Fragment } from 'react';
import { ChromePicker } from 'react-color';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PHOTOSHOP_PICKER_WIDTH = 235;

const state = {
  pickerX: null,
  pickerY: null,
  selectedColor: null,
  originalColor: null,
};

const ColorPickerComponent = (props) => {
  const getKeyValue = (id) => {
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
  };

  const triggerColorPicker = (e, key, type) => {
    const { showColorPicker, previewColor } = props;

    switch (type) {
      case 'cancel':
      {
        const { originalColor } = state;
        state.selectedColor = originalColor;
        previewColor(key, props.color);
        break;
      }
      case 'accept':
      {
        const { selectedColor } = state;
        state.originalColor = selectedColor;
        if (e.target.classList.contains('hide-picker')) {
          showColorPicker(key);
        }
        break;
      }
      default: {
        showColorPicker(key);
        const widthAvailable = window.innerWidth - e.clientX;
        const newX = (widthAvailable < PHOTOSHOP_PICKER_WIDTH)
          ? e.clientX - PHOTOSHOP_PICKER_WIDTH / 2
          : e.clientX;
        if (e) {
          state.pickerX = newX;
          state.pickerY = e.clientY + 10;
        }
      }
    }
  };

  const colorChange = (color, key) => {
    state.selectedColor = color.hex;
    const { previewColor } = props;
    previewColor(key, color.hex);
  };

  const {
    id, activeColorPicker, color,
  } = props;
  state.selectedColor = color;
  state.originalColor = color;
  const key = getKeyValue(id);
  const colorPickerDisplay = key === activeColorPicker;
  return (
    <Fragment>
      <ColorPreview color={state.selectedColor} onClick={e => triggerColorPicker(e, key)} />
      <ReadInput type="text" value={state.selectedColor} readOnly />
      {colorPickerDisplay && (
        <ColorPickerArea className="hide-picker" onClick={e => triggerColorPicker(e, key, 'accept')}>
          <ColorPicker left={state.pickerX} top={state.pickerY}>
            <ChromePicker
              color={state.selectedColor}
              onChange={e => colorChange(e, key)}
              disableAlpha
            />
          </ColorPicker>
        </ColorPickerArea>
      )}
    </Fragment>
  );
};

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
